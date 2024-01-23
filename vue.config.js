// lib
const TerserPlugin = require('terser-webpack-plugin');
const {
  resolve, getComponentEntries,
} = require('./utils');

const DEV = (process.env.NODE_ENV === 'development');

module.exports = DEV
  ? {
    devServer: {
      open: true,
    },
  }
  : {
    outputDir: resolve('lib'),
    css: {
    // 此项是自定义项，设置为true表示，生成独立的文件
    // lib 模式 开启 css 打入js
    // extract: false,
    // localIdentName 必须手动设定 requireModuleExtension: true
      requireModuleExtension: true,
      loaderOptions: {
        css: {
        // css modules命名
          modules: {
            localIdentName: '[hash:base64:5]',
          },
        },
      },
      extract: {
        filename: '[name]/style.css',
      },
    },
    configureWebpack: {
      mode: 'production',
      //  入口文件
      entry: getComponentEntries('src/components'),
      //  输出配置
      output: {
      //  文件名称
        filename: '[name]/index.js',
        //  构建依赖类型
        libraryTarget: 'umd',
        //  依赖输出
        libraryExport: 'default',
        //  依赖名称
        library: 'ysujc',
      },
      externals: {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
        },
      },
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(
          {
            parallel: 3,      // 启用cpu多进程并发运行并设置并发运行次数(当前cpu内核-1),我擦这个好明显.
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          },
        )],
      },
    },
    // //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    chainWebpack: config => {
      config.optimization.delete('splitChunks');
      config.plugins.delete('copy');
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      config.plugins.delete('html');
      config.plugins.delete('hmr');
      config.entryPoints.delete('app');
    },
  };
