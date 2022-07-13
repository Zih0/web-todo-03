import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

export default {
  entry: './frontend/app.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        exclude: [/node_modules/],
        use: ['to-string-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },
  // .js 확장자없이 import 가능
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: './frontend/public/index.html',
    }),
  ],
};
