// vue.config.js
module.exports = {
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
            exclude: [
                /\.map$/, 
                /manifest\.json$/ 
            ],
        },
        themeColor: '#1da025'
    },
}
