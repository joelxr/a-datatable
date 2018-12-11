<!--
  Datatable component:

  A simple datatable that loads a CSV file and show all his data. 

  Properties: 
  - columnProps:
      The properties of each column in order to be shown. 
      The first column should be the unique identifier
      for each row, an ID. It's an array of an object 
      with the following attributes: name, type and
      sorting (optional, can be ascending or descending).
      For example: 
        columnProps: [
          { name: 'ID', type: 'text' },
          { name: 'Description', type: 'text' },
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
          v-for="row in filteredData"
          :key="row[columnProps[0].name]">
          <td
            v-for="n in columnsCount - 1"
            :key="n">
            <div
              class="cell"
              :class="columnProps[n].type">
              {{ parseValue(row, n) }}
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
      tableData: [],
      filteredData: [],
      sorting: [],
      amountFilter: {
        min: 0,
        max: 1000000
      },
      dateFilter: {
        min: new Date("1950-01-01T03:24:00"),
        max: new Date("2022-12-31T03:24:00")
      }
    }
  },
  computed: {
    columnsCount () {
      return this.columnProps.length
    }
  },
  created () {
    this.loadCsvFile()
    this.setupSorting()
    this.filteredData = this.tableData
  },
  methods: {
    loadCsvFile () {
      d3.csv(`/${this.csvFile}.csv`, data => {
        this.tableData.push(data)
      })
    },
    /**
     * Parses a value according to the type of the column.
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
    setupSorting () {
      this.columnProps.forEach(c => {
        this.sorting.push(c.sorting ? c.sorting : 'descending')
      })
    },
    /**
     * Toggles sorting order of nth column. 
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
     * columnProps and sorting holds.
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
      }
    },
    filterText (n, text) {
      const property = this.columnProps[n].name
      const type = this.columnProps[n].type
      const regexp = new RegExp(text, 'i');

      if (type === 'text') {
        this.filteredData = this.tableData.filter(data => regexp.test(data[property]))
      }

      console.log(n, text, this.filteredData) // eslint-disable-line
    },
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
    filterDate (n) {
      const property = this.columnProps[n].name
      const type = this.columnProps[n].type

      if (type === 'date') {
        this.filteredData = this.tableData.filter(data => {
          const value = new Date(data[property])
          console.log(n, value, this.filteredData) // eslint-disable-line
          return value >= this.dateFilter.min && value <= this.dateFilter.max
        })
      }

      console.log(n, this.filteredData) // eslint-disable-line
    }
  }
};
</script>

<style scoped>
  .datatable {
    font-size: 1em;
  }

  .datatable tbody tr:hover {
    background-color: #f2f6fc;
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

  .datatable th input[type=number] {
    width: 60px;
  }
</style>