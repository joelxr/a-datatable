# a-datatable

A datable is a Vue.js component that loads a given CSV file and displays it on a table.

## Deploying

It's already deployed and avaliable at https://joelxr.github.io/a-datatable/

To deploy it locally, you are just a few npm commands away, follow instructions.

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test:unit
npm run teste:e2e
```

### Lints and fixes files
```
npm run lint
```

## About the solution
It's a Vue.js project created by Vue CLI 3 with a component called [Datatable.vue](src/components/Datatable.vue).

In fact, is a simple datatable that loads a CSV file and show all his data, for that I'm using D3.js library.

Basically, you have to import this component and use it, but there are two required properties, which are:
  - `columnProps`: The properties of each column in order to be shown. The first column should be the unique identifier for each row, an ID. It's an array of an object with the following attributes:
    - `name`,
    - `type`,
    - `sorting`: optional, can be "ascending" or "descending",
    - `editable`: optinial, true/false
    - Example:
      ```js
        columnProps: [
          { name: 'ID', type: 'text' },
          { name: 'Description', type: 'text', editable: true },
          { name: 'Date', type: 'date', sorting: ascending },
          { name: 'Total', type: 'amount' }
        ]
      ```  
  - `csvFile`: The CSV file name to be loaded, for example "data.csv".

## Example

Here goes an example (similar to the actual [App.vue](src/App.vue) in this project).

The following code will read a public CSV called payments-data.csv and show the values to the columns: Name, Description, Date and Amount.

```html
<template>
  <main id="app">
    <datatable
      csv-file="payments-data"
      :column-props="columnProps">
    </datatable>
  </main>
</template>

<script>
import Datatable from './components/Datatable'

export default {
  name: 'app',
  components: { Datatable },
  data () {
    return {
      columnProps: [
        { name: 'ID', type: 'text' },
        { name: 'Name', type: 'text' },
        { name: 'Description', type: 'text', editable: true },
        { name: 'Date', type: 'date', sorting: 'descending' },
        { name: 'Amount', type: 'amount' },
      ]
    }
  }
}
</script>
```

## About the development

### Time spent on this
I've spent about 15 hours to develop this componet, according to [this](https://wakatime.com/@7725b5b1-bd20-4130-b095-39086ed2e3f3/projects/wfcycoxewd?start=2018-12-06&end=2018-12-12) WakaTime report.

### Next steps
For future working, I would like to improve this component in the following aspects:
  - Break the main component Datatable.vue in others components according to the column type, a Mixin will work too,
  - More tests (unit and e2e),
  - Improve even more the UI/UX,
  - Responsive design
  - Make it acessible, keyboard support,
  - More data types for columns.
  - More options to editable columns, at this moment only text can be edited.