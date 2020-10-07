const turf = require('@turf/turf')

module.exports = {
  id: 'hospitalisations-departements-2020-05-30',
  store: 'memory', // Default job store
  tasks: [{
    id: 'population-departements.json',
    type: 'store', // Read task
    options: {
      store: 'fs'
    }
  }, {
    id: 'spf-donnees-hospitalieres-2020-05-30.json',
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
        apply: {
          dataPath: 'result.data',
          function: (item) => {
            turf.featureEach(item, (feature) => {
              const properties = feature.properties
              properties.taux = (100000 * properties.hospitalisations) / properties.population
            })
          }
        },
        writeJson: { store: 'fs' },
        clearOutputs: {}, // Cleanup
        removeStores: ['memory', 'fs']
      }
    }
  }
}

