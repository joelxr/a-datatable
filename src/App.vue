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
        { name: 'Description', type: 'text' },
        { name: 'Date', type: 'date' },
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
  margin: 2em 8em;
}

.title {
  font-size: 2.4em;
  text-align: center;
}
</style>
