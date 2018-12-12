<!--
  Datatable component:

  A simple datatable that loads a CSV file and show all his data. 

  Properties: 
  - columnProps:
      The properties of each column in order to be shown. 
      The first column should be the unique identifier
      for each row, an ID. It's an array of an object 
      with the following attributes:
        - name,
        - type,
        - sorting (optional, can be ascending or descending),
        - editable (optinial, true/false)
      For example: 
        columnProps: [
          { name: 'ID', type: 'text' },
          { name: 'Description', type: 'text', editable: true },
          { name: 'Date', type: 'date', sorting: ascending },
          { name: 'Total', type: 'amount' }
        ]
  - csvFile: 
      The CSV file name to be loaded, for example "data.csv". 
      This project uses Vue CLI 3 and relies on it. So, this file
      should be placed in the public directory.
      To load this CSV file, I'm using D3.js library.
-->
<template>
  <div
    id="datatable"
    class="datatable">
    <table>
      <thead>
        <tr>
          <th
            v-for="n in columnsCount - 1"
            :key="n">
            <div
              :id="`${columnProps[n].name}Column`"
              class="column-name"
              :class="sorting[n]"
              @click="toggleSorting(n)">
              {{ columnProps[n].name }}
            </div>
            <div class="column-search">
              <input
                type="text"
                v-if="columnProps[n].type === 'text'"
                :id="columnProps[n].name"
                placeholder="Search"
                @input="filterText(n, $event.target.value)">
              <input
                type="number"
                placeholder="0"
                v-if="columnProps[n].type === 'amount'"
                :id="`${columnProps[n].name}Min`"
                v-model="amountFilter.min"
                @input="filterAmount(n)">
              <input
                type="number"
                placeholder="1000000"
                v-if="columnProps[n].type === 'amount'"
                :id="`${columnProps[n].name}Max`"
                v-model="amountFilter.max"
                @input="filterAmount(n)">
              <input
                type="date"
                v-if="columnProps[n].type === 'date'"
                :id="`${columnProps[n].name}Min`"
                v-model="dateFilter.min"
                @change="filterDate(n)">
              <input
                type="date"
                v-if="columnProps[n].type === 'date'"
                :id="`${columnProps[n].name}Max`"
                v-model="dateFilter.max"
                @change="filterDate(n)">      
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in filteredData"
          :key="row[columnProps[0].name]">
          <td
            v-for="n in columnsCount - 1"
            :key="n">
            <div
              class="cell"
              :class="columnProps[n].type">
              <span v-if="columnProps[n].editable && editing[n][index]">
                <textarea
                  :id="`${columnProps[n].name}-${index}-Edit`"
                  :value="row[columnProps[n].name]"
                  @input="newValuesBuffer = $event.target.value"
                  :class="columnProps[n].type">
                </textarea>
                <button
                  :id="`${columnProps[n].name}-${index}-SaveButton`"
                  class="save-button"
                  @click="save(index, n); $set(editing[n], index, false)">
                </button>
                <button
                  :id="`${columnProps[n].name}-${index}-CancelButton`"
                  class="cancel-button"
                  @click="$set(editing[n], index, false)">
                </button>
              </span>
              <span
                :id="`${columnProps[n].name}-${index}-Cell`"
                v-else-if="columnProps[n].editable">
                {{ parseValue(row, n) }}
                <button
                  :id="`${columnProps[n].name}-${index}-EditButton`"
                  class="edit-button"
                  @click="$set(editing[n], index, true)">
                </button>
              </span>
              <span
                v-else
                :id="`${columnProps[n].name}-${index}-Cell`">
                {{ parseValue(row, n) }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'Datatable',
  props: {
    csvFile: {
      type: String,
      required: true
    },
    columnProps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      /** Array to store acquired CSV data */
      tableData: [],
      /** Array to store user's current view when filters are applied. */
      filteredData: [],
      /** Sorting data for each column */
      sorting: [],
      /** Editing data for each cell */
      editing: [],
      /** A buffer to store editable fields value */
      newValuesBuffer: '',
      /** Initial filter to amount fields */
      amountFilter: { min: 0, max: 1000 },
      /** Initial filter to date fields */
      dateFilter: { min: '2000-01-01', max: '2022-12-31' }
    }
  },
  computed: {
    /** Counts how many columns are declared on columnProps */
    columnsCount () {
      return this.columnProps.length
    }
  },
  created () {
    this.loadCsvFile()
    this.setupSorting()
    this.setupEditing()
    this.filteredData = this.tableData
  },
  methods: {
    /**
     * Loads CSV file according by his name held by csvFile property.
     * This property can't be empty, it's required for this component.
     */
    loadCsvFile () {
      d3.csv(`${process.env.BASE_URL}${this.csvFile}.csv`, data => {
        this.tableData.push(data)
      })
    },
    /**
     * Parses a value according to the type of the column.
     * Date and amount types are converted to locale string.
     */
    parseValue (row, n) {
      const rawValue = row[this.columnProps[n].name]
      const type = this.columnProps[n].type

      if (type === 'date') {
        return new Date(rawValue).toLocaleDateString()
      } else if (type === 'amount') {
        return new Number(rawValue).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
      }

      return rawValue
    },
    /**
     * Initialize datatable's sorting values, when there is a sorting
     * attribute in columnProps uses it, but when it hasn't uses
     * ascending sort by default.
     */
    setupSorting () {
      this.columnProps.forEach((c, index) => {
        if (c.sorting) {
          this.$set(this.sorting, index, c.sorting)
          this.sort(index)
        } else {
          this.$set(this.sorting, index, 'ascending')
        }
      })
    },
    /**
     * Initializes an array of editing data, is just a
     * multidimesional array [columns x rows] that holds a
     * boolean for each editable cell.
     * Starts empty and goes true or false only in the fields
     * edited by the user.
     */
    setupEditing () {
      this.editing = new Array(this.columnsCount).fill(null).map(item => {
        item = new Array(this.tableData.length).fill(null)
        return item
      }) 
    },
    /**
     * Toggles sorting order of the nth column.
     * "ascending" to "descending" or "descending" -> "ascending".
     */
    toggleSorting (n) {
      if (this.sorting[n] === 'ascending') {
        this.$set(this.sorting, n, 'descending')
      } else if (this.sorting[n] === 'descending') {
        this.$set(this.sorting, n, 'ascending')
      } else {
        this.$set(this.sorting, n, 'descending')
      }

      this.sort(n)
    },
    /**
     * Sorts the nth column based on the informations that
     * columnProps and sorting array holds.
     */
    sort (n) {
      const property = this.columnProps[n].name
      const type = this.columnProps[n].type
      const ascending = this.sorting[n] === 'ascending'

      if (type === 'text' || type === 'date') {
       this.filteredData.sort((data1, data2) => {
         if (data1[property] < data2[property]) {
           return ascending ? -1 : 1
         } else if (data1[property] > data2[property]) {
           return ascending ? 1 : -1
         } else {
           return 0
         }
       })
      } else if (type === 'amount') {
       this.filteredData.sort((data1, data2) => {
         return ascending ? data1[property] - data2[property] : data2[property] - data1[property]
       })
      }    /**
     * Filter method to field with type equals to "amount".
     */

    },
    /**
     * Filter method to field with type equals to "text".
     */
    filterText (n, text) {
      const property = this.columnProps[n].name
      const type = this.columnProps[n].type
      const regexp = new RegExp(text, 'i');

      if (type === 'text') {
        this.filteredData = this.tableData.filter(data => regexp.test(data[property]))
      }
    },
    /**
     * Filter method to field with type equals to "amount".
     */
    filterAmount (n) {
      const property = this.columnProps[n].name
      const type = this.columnProps[n].type

      if (type === 'amount') {
        this.filteredData = this.tableData.filter(data => {
          const value = new Number(data[property])
          return value >= this.amountFilter.min && value <= this.amountFilter.max
        })
      }
    },
    /**
     * Filter method to field with type equals to "date".
     */
    filterDate (n) {
      const property = this.columnProps[n].name
      const type = this.columnProps[n].type

      if (type === 'date' && this.dateFilter.min !== '' && this.dateFilter.max !== '') {
        const minDate = new Date(this.dateFilter.min)
        const maxDate = new Date(this.dateFilter.max)
          this.filteredData = this.tableData.filter(data => {
            const value = new Date(data[property])
            return value >= minDate && value <= maxDate
          })
      }
    },
    /**
     * Saves the editables fields.
     * After that, the newValuesBuffer is cleaned,
     * filteredData is updated, filters are restarted.
     * WARNING: This method does not save it to the CSV file,
     * only to the loaded array "tableData".
     */
    save (index, column) {
      let row = this.tableData[index]
      row[this.columnProps[column].name] = this.newValuesBuffer
      this.newValuesBuffer = ''
      this.filteredData = this.tableData
      this.amountFilter.min = 0
      this.amountFilter.max = 1000
      this.dateFilter.min = '2000-01-01'
      this.dateFilter.max = '2022-12-31'
    }
  }
};
</script>

<style scoped>
  .datatable {
    font-size: 1em;
  }

  .datatable tbody tr:hover {
    background-color: #ebeef5;
    transition: background-color .25s ease
  }

  .datatable th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
  }

  .datatable th:hover {
    color: #409eff;
  }

  .datatable td,
  .datatable th {
    padding: 12px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }

  .datatable td,
  .datatable th.is-leaf {
    border-bottom: 1px solid #ebeef5;
  }

  .datatable thead {
    color: #909399;
    font-weight: 500;
  }

  .datatable .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .date,
  .amount {
    text-align: right;
  } 

  .descending:after,
  .ascending:after {
    content: ' ';
    position: relative;
    left: 2px;
    border: 8px solid transparent;
  }

  .descending:after {
    top: 15px;
    border-top-color: silver;
  }

  .ascending:after {
    bottom: 20px;
    border-bottom-color: silver;
  }

  .column-search {
    padding: 2px;
    margin: 2px;
  }

  .datatable th input {
    height: 30px;
    cursor: text;
    width: 10rem;
    color: #4e6e8e;
    display: inline-block;
    border: 1px solid #cfd4db;
    border-radius: 2rem;
    font-size: .9rem;
    line-height: 2rem;
    outline: none;
    padding: 0 .5rem 0 .5rem;
  }

  .datatable th input[type=number] {
    width: 4rem;
  }


  .datatable th input[type=date] {
    width: 8rem;
  }

  .datatable th input[type=text] {
    padding: 0 .5rem 0 2rem;
    transition: all .2s ease;
    background: #fff url(/search.svg) .6rem .5rem no-repeat;
    background-size: auto auto;
    background-size: 1rem;
  }

  .datatable textarea {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }

  .datatable textarea:focus {
    outline: none;
    border-color: #409eff;
  }

  .datatable button {
    display: inline-block;
    position: relative;
    top: -3px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
        border-top-color: rgb(220, 223, 230);
        border-right-color: rgb(220, 223, 230);
        border-bottom-color: rgb(220, 223, 230);
        border-left-color: rgb(220, 223, 230);
    border-color: #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 10px 14px;
    border-radius: 4px;
  }

  .datatable button:focus,
  .datatable button:hover {
    color:#409eff;
    border-color:#c6e2ff;
    background-color:#ecf5ff
  }

  .datatable button.edit-button {
    background: #fff url(../assets/icons/edit-outline.svg) 4px no-repeat;
  }

  .datatable button.save-button {
    background: #fff url(../assets/icons/checkmark-outline.svg) 4px no-repeat;
  }

  .datatable button.cancel-button {
    background: #fff url(../assets/icons/close-outline.svg) 4px no-repeat;
  }

  .datatable button.edit-button:hover {
    color:#409eff;
    border-color:#c6e2ff;
    background:#ecf5ff url(../assets/icons/edit-outline.svg) 4px no-repeat;
  }

  .datatable button.save-button:hover {
    color:#409eff;
    border-color:#67c23a;
    background:#67c23a url(../assets/icons/checkmark-outline.svg) 4px no-repeat;
  }

  .datatable button.cancel-button:hover {
    color:#409eff;
    border-color:#fbc4c4;
    background:#f56c6c url(../assets/icons/close-outline.svg) 4px no-repeat;
  }
</style>