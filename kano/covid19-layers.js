module.exports = [
  {
    name: 'Layers.U5_S21',
    description: 'Layers.U5_S21_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          U5_S21: 'U5 - S21',
          U5_S21_DESCRIPTION: 'Hospitalisations par département'
        }
      },
      en: {
        Layers: {
          U5_S21: 'U5 - S21',
          U5_S21_DESCRIPTION: 'Hospitalizations by department'
        }
      }
    },
    tags: [ 'business' ],
    icon: 'fas fa-atlas',
    attribution: 'Santé Publique Fance / IGN / INSEE',
    type: 'OverlayLayer',
    featureId: 'code',
    leaflet: {
      type: 'geoJson',
      realtime: true,
      sourceTemplate: `http://127.0.0.1:4000/hospitalisations-departements-<%= time.format('YYYY-MM-DD') %>.json`,
      stroke: '#fee8c8',
      'stroke-width': 2,
      'stroke-opacity': 0.5,
      'fill-opacity': 0.5,
      'fill-color': '<%= chroma.scale(\'OrRd\').domain([0,50])(properties.taux).hex() %>',
      template: ['fill-color'],
      tooltip: {
        template: '<b><%= properties.nom %>: <%= properties.hospitalisations %> hospitalisations</b>',
        options: {
          opacity: 0.8,
          direction: 'top'
        }
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      sourceTemplate: `http://127.0.0.1:4000/hospitalisations-departements-<%= time.format('YYYY-MM-DD') %>.json`,
      entityStyle: {
        polygon: {
          outline: false,
          extrudedHeight: '<%= 1000 * properties.taux %>',
        },
        template: ['polygon.extrudedHeight']
      },
      tooltip: {
        template: '<%= properties.nom %>: <%= properties.hospitalisations %> hospitalisations'
      }
    }
  },
  {
    name: 'Layers.U5_S21_HEATMAP',
    description: 'Layers.U5_S21_HEATMAP_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          U5_S21_HEATMAP: 'U5 - S21',
          U5_S21_HEATMAP_DESCRIPTION: 'Hospitalisations par département'
        }
      },
      en: {
        Layers: {
          U5_S21_HEATMAP: 'U5 - S21',
          U5_S21_HEATMAP_DESCRIPTION: 'Hospitalizations by department'
        }
      }
    }/*,
    tags: [ 'business' ],
    icon: 'fas fa-atlas',
    attribution: 'Santé Publique Fance / IGN / INSEE',
    type: 'OverlayLayer',
    featureId: 'code',
    leaflet: {
      type: 'heatmap',
      urlTemplate: `http://127.0.0.1:4000/hospitalisations-departements-<%= time.format('YYYY-MM-DD') %>.json`,
      valueTemplate : `<%= properties.taux %>`,
      // The unit is in pixel, meaning
      // 1 pixel radius (2 pixel diameter) at zoom level 0
      // ...
      // 64 pixel radius (128 pixel diameter) at zoom level 6
      // ...
      // We'd like an event to cover a range expressed as Km
      // According to https://groups.google.com/forum/#!topic/google-maps-js-api-v3/hDRO4oHVSeM
      // this means 1 pixel at level 7 so at level 0 we get 1 / 2^7
      radius: 100 * 0.0078,
      minOpacity: 0,
      maxOpacity: 0.5,
      // scales the radius based on map zoom
      scaleRadius: true,
      // uses the data maximum within the current map boundaries
      // (there will always be a red spot with useLocalExtremas true)
      useLocalExtrema: false,
      min: 0,
      max: 100,
      // The higher the blur factor is, the smoother the gradients will be
      blur: 0.8
    }*/
  }
]


