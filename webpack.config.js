const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        // Правило для JavaScript файлов
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // ПРАВИЛО ДЛЯ CSS ФАЙЛОВ
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // ПРАВИЛО ДЛЯ ИЗОБРАЖЕНИЙ (PNG, JPG, GIF)
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]', // Сохраняет изображения в папку dist/img
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 8080,
    open: true,
    hot: true,
  },
}