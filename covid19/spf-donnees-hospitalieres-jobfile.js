module.exports = {
  id: 'spf-donnees-hospitalieres',
  store: 'memory', // Default job store
  tasks: [{
    id: 'spf-donnees-hospitalieres-2020-05-30',
    type: 'http', // Download task
    options: {
      url: `https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7`
    }
  }],
  hooks: {
    tasks: {
      after: {
        readCSV: {
          headers: true,
          delimiter: ';' // Default delimiter is ,
        },
        transformJson: {
          filter: { jour: '2020-05-30', sexe: '0' }, // Select total not men/women data
          mapping: {
            dep: 'code',
            hosp: 'hospitalisations'
          },
          unitMapping: {
            hospitalisations: { asNumber: true, empty: 0 } // Convert from string
          },
          pick: ['code', 'hospitalisations']
        },
        writeJson: {
          store: 'fs'
        }
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
      after: { // Cleanup
        clearOutputs: {},
        removeStores: ['memory', 'fs']
      }
    }
  }
}

