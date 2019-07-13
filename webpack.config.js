var web = require('webpack');
var path = require('path');
var miniCss = require('mini-css-extract-plugin');
var copyFilePlugIn = require('copy-webpack-plugin');

function devlopmentMode() {
  var isDev = true;
  var mode = (isDev) ? 'development' : 'production';
  return function () {
    console.debug('selected mode', mode);
    return mode;
  };
};

module.exports = {
  mode: devlopmentMode()(),
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'src'),
  watch: false,
  target: 'node',
  node: {
    fs: 'empty',
    net: true
  },
  entry: {
    main: [path.resolve(__dirname, 'src/app/app.main.ts')],
    angulardep: path.resolve(__dirname, 'src/app/angular-deps.ts'),
    server: path.resolve(__dirname, 'src/server/server.ts'),
    design: [
      path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
      path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.js'),
      path.resolve(__dirname, 'node_modules/popper.js/dist/umd/popper.js')]

  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: { configFile: path.resolve(__dirname, 'tsconfig.json') }
        }]
      }, {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          miniCss.loader,
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2|otf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new miniCss({
      filename: 'style.css'
    }),
    new copyFilePlugIn([
      {
        from: path.resolve(__dirname, 'src/**/*.html'),
      }
    ])
  ]

};
