const moment = require('moment')
const cli = require('commander')

cli.option('-d, --date <date>', 'The date of the data to be generated', moment()).parse(process.argv)
const date = moment(cli.date)
if (!date.isValid()) {
  console.error('Invalid date, exiting')
  process.exit(1)
} else {
  console.log(`Processing data for ${date}`)
}

module.exports = {
  id: `hospitalisations-departements-${date.format('YYYY-MM-DD')}`,
  store: 'memory', // Default job store
  tasks: [{
    id: 'population-departements.json',
    type: 'store', // Read task
    options: {
      store: 'fs'
    }
  }, {
    id: `spf-donnees-hospitalieres-${date.format('YYYY-MM-DD')}.json`,
    type: 'store', // Read task
    options: {
      store: 'fs'
    }
  }],
  hooks: {
    tasks: {
      after: {
        readJson: { features: true }
      }
    },
    jobs: {
      before: {
        createStores: [{ // Input store
          id: 'memory'
        }, { // Output store
          id: 'fs',
          options: { path: __dirname }
        }]
      },
      after: {
        mergeJson: {
          deep: true, // Add hospitalisations to departement features
          by: (item) => item.code || item.properties.code,
          transform: { pick: ['hospitalisations'] }
        },
        convertToGeoJson: {},
        writeJson: { store: 'fs' },
        clearOutputs: {}, // Cleanup
        removeStores: ['memory', 'fs']
      }
    }
  }
}

