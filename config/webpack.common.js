'use strict'

const autoprefixer = require('autoprefixer')
const paths = require('./paths')

module.exports = {
  esLint: [
    {
      options: {
        useEslintrc: true
      },
      loader: 'eslint-loader'
    }
  ],
  fileLoader: {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.css$/,
      /\.json$/,
      /\.bmp$/,
      /\.gif$/,
      /\.jpe?g$/,
      /\.png$/
    ],
    loader: 'file-loader',
    options: {
      name: 'static/[name].[hash:8].[ext]'
    }
  },
  urlLoader: {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'static/img/[name].[hash:8].[ext]'
    }
  },
  cssLoader: {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  postcssLoader: {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
      plugins: () => [
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9' // React doesn't support IE8 anyway
          ]
        })
      ]
    }
  },
  htmlWebpackConfig: {
    inject: true,
    template: paths.appHtml,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  },
  uglifyJSconfig: {
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    },
    sourceMap: true
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
