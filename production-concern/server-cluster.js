const cluster = require('cluster')

function startWorker() {
  const worker = cluster.fork()
  console.log(`CLUSTER: Worker ${worker.id} started`)
}

if (cluster.isMaster) {
  require('os').cpus().forEach(function() {
    startWorker()
  })

  cluster.on('disconnect', function(worker) {
    console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`)
  })

  cluster.on('exit', function(worker, code, signal) {
    console.log(`CLUSTER: Worker ${worker.id} died with exit code ${code} (${signal})`)
  })
} else {
  require('./server')
}
