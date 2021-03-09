// cdn预加载的模块
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    'js-cookie': 'Cookies',
    'vuex': "Vuex"
}
// cdn预加载的模块的地址
const cdn = {
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
        'https://cdn.bootcdn.net/ajax/libs/js-cookie/2.2.1/js.cookie.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js'
    ]
}
module.exports = {
    publicPath: '/front/',
    outputDir: 'dist', // 打包目录
    devServer: {
        host: "127.0.0.1", // 开发模式时的ip
        port: 8090, // 开发模式时的端口
        proxy: {
            '/pdf': {
                target: process.env.VUE_APP_API_HOST,
                ws: false, //如果要代理websockets
                secure: false, // 使用的是http协议则sd设置为false，https协议则设置为true
                changeOrigin: true, //将选项changeOrigin设置true为基于名称的虚拟托管站点
            }
        }
    },
    chainWebpack: config => {
        // npm run prod (发布模式)
        config.when(process.env.NODE_ENV === 'production', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main-prod.js')
            // 通过externals加载外部CDN资源----1
            config.set('externals', externals)
            // 发布模式的isProd为true
            config.plugin('html').tap(args => {
                args[0].cdn = cdn
                return args
            })
        })
        // npm run dev (开发模式)
        config.when(process.env.NODE_ENV === 'development', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main.js')
        })
        // npm run test (测试模式)
        config.when(process.env.NODE_ENV === 'test', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main.js')
        })
    }
};
