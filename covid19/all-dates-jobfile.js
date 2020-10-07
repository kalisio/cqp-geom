const moment = require('moment')

const start = moment('2020-05-28')
const end = moment('2020-05-30')
let tasks = []
let date = start
while (date.isSameOrBefore(end)) {
  tasks.push({
    id: `${date.format('YYYY-MM-DD')}`,
    type: 'noop',
    date: date.clone()
  })
  date.add(1, 'day')
}

module.exports = {
  id: 'job',
  options: { workersLimit: 1 },
  tasks,
  hooks: {
    tasks: {
      after: {
        spf: {
          hook: 'runCommand',
          stdout: true, stderr: true,
          command: `krawler spf-donnees-hospitalieres-date-jobfile.js --port 3031 --date <%= date.format('YYYY-MM-DD') %>`
        },
        departements: {
          hook: 'runCommand',
          stdout: true, stderr: true,
          command: `krawler taux-departements-date-jobfile.js --port 3031 --date <%= date.format('YYYY-MM-DD') %>`
        }
      }
    },
    jobs: {
      before: {
      },
      after: {
      }
    }
  }
}

