<template>
  <main id="app">
    <h1 class="title">Payments</h1>
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
  components: {
    Datatable
  },
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

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0.8rem 2rem;
}

.datatable {
  margin: 0 auto;
  width: 60rem;
}

.title {
  font-size: 2.4em;
  text-align: center;
}
</style>
