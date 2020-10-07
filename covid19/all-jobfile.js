module.exports = {
  id: 'job',
  options: { workersLimit: 1 },
  tasks: [{
    id: 'task',
    type: 'noop'
  }],
  hooks: {
    tasks: {
      after: {
        spf: {
          hook: 'runCommand',
          stdout: true, stderr: true,
          command: 'krawler spf-donnees-hospitalieres-jobfile.js --port 3031'
        },
        departements: {
          hook: 'runCommand',
          stdout: true, stderr: true,
          command: 'krawler taux-departements-jobfile.js --port 3031'
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

