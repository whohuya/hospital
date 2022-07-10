const getPages = require('./public/lib/utils/getPages')
// const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')
// const webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {

    // 保存的时候是否验证验证代码规范性
    lintOnSave: false,
    // 部署应用包时的基本URL
    // 默认值为'/'，可设置''或'./'，所有资源会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可设置为/my-app/这样的子路径
    // history.pushState路由和多页面配置时相对路径无效，请使用后面方式指定生产特定绝对路径process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
    // baseUrl: '/',
    // 放置生成的静态资源 (js、css、img、fonts) 的目录
    // assetsDir: 'static',
    // 在多页面模式下构建应用
    pages: getPages(),
    integrity: true,
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'))
        config.resolve.symlinks(true) // 热更新
    },
    // webpack 配置
    configureWebpack: {
        // 此部分组件已经在html中统一添加
        //优化webpack 打包
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
            'echarts':'echarts',
            'moment':'moment',
        },
        resolve: {
            // 路径别名
            alias: {
                '@components': '@/components',
                '@assets': '@/assets',
                '@utils': '@/utils',
                views: '@/views',
                '@config':'@/config'
            }
        }
    },
    // 所有 webpack-dev-server 的选项
    devServer: {
        // port: 80,
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: false
        },
        host: '0.0.0.0',
        open: true,
        // API 请求代理
        proxy: {
            'auth-server': {
                target: 'http://172.19.4.83:9100/',
                ws:false,
                pathRewrite: {
                            '^/api': ''

                }
            },
            '/':{
                target: 'http://172.19.4.83:9100/',
                // changeOrigin:true, 如果接口跨域需要这个参数配置
            },
        }
    }
}

