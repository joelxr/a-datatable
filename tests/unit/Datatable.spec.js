import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Datatable from '@/components/Datatable'

describe('Datatable.vue', () => {
  const csvFile = 'payment-data.testing'

  const columnProps = [
    { name: 'ID', type: 'text' },
    { name: 'Name', type: 'text' },
    { name: 'Description', type: 'text', editable: true },
    { name: 'Date', type: 'date', sorting: 'descending' },
    { name: 'Amount', type: 'amount' },
  ]

  const data = [
    { ID: 1, Name: 'Luigi', Description: 'Luigis payment', Date: '2018-12-12', Amount: 100 },
    { ID: 2, Name: 'Albert', Description: 'Albert paid the rent', Date: '2018-12-01', Amount: 3100.5 }
  ]

  const wrapper = mount (
    Datatable,
    {
      propsData: { csvFile, columnProps },
      methods: {
        loadCsvFile () {
          return data
        }
      }
    }
  )

  it ('expect to display the columns in order, starting by the 1st', () => {
    const columns = wrapper.findAll('.column-name')
    expect(columns.at(0).text()).equal('Name')
    expect(columns.at(1).text()).equal('Description')
    expect(columns.at(2).text()).equal('Date')
    expect(columns.at(3).text()).equal('Amount')
  })

  it ('expect to have exact search boxes to the given types for each column', () => {
    const columns = wrapper.findAll('.column-search')
    expect(columns.at(0).find('input[type=text]').exists()).equal(true)
    expect(columns.at(1).find('input[type=text]').exists()).equal(true)
    expect(columns.at(2).find('input[type=date]#DateMin').exists()).equal(true)
    expect(columns.at(2).find('input[type=date]#DateMax').exists()).equal(true)
    expect(columns.at(3).find('input[type=number]#AmountMin').exists()).equal(true)
    expect(columns.at(3).find('input[type=number]#AmountMax').exists()).equal(true)
  })

  it ('expecting the given sorting type or default value for each column', () => {
    const columns = wrapper.findAll('.column-name')
    expect(columns.at(0).classes()).contains('ascending')
    expect(columns.at(1).classes()).contains('ascending')
    expect(columns.at(2).classes()).contains('descending')
    expect(columns.at(3).classes()).contains('ascending')
  })

  it ('expect to have given data from CSV', () => {
  })

  it ('expect to have edit option in editable columns', () => {

  })
})
