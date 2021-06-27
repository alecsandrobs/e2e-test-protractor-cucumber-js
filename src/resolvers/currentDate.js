import moment from 'moment'

const currentDate = moment()

export default (plus = 0) => {
  return moment(currentDate).add(plus, 'days').format('DD/MM/YYYY')
}
