// vue.config.js
module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        swSrc: 'src/service-worker.js'
    },
  },
}
