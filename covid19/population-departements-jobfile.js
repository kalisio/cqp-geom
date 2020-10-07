module.exports = {
  id: 'population-departements',
  store: 'memory', // Default job store
  tasks: [{
    id: 'departements.json',
    type: 'http', // Download task
    options: {
      url: `https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson`
    }
  }, {
    id: 'population.csv',
    type: 'store', // Read task
    options: { store: 'fs' }
  }],
  hooks: {
    tasks: {
      after: {
        readJson: {
          match: { id: 'departements.json' },
          features: true
        },
        readCSV: {
          match: { id: 'population.csv' },
          headers: true, delimiter: ';' // Default delimiter is ,
        }
      }
    },
    jobs: {
      before: {
        createStores: [
          { id: 'memory' }, // Input store
          { id: 'fs', options: { path: __dirname } } // Output store
        ]
      },
      after: {
        mergeJson: {
          deep: true, // Add hospitalisations to departement features
          by: (item) => item.Code || item.properties.code,
          transform: { mapping: { Ensemble: 'population' }, unitMapping: { population: { asNumber: true } }, pick: ['population'] }
        },
        convertToGeoJson: {},
        writeJson: { store: 'fs' },
        clearOutputs: {}, // Cleanup
        removeStores: ['memory', 'fs']
      }
    }
  }
}

