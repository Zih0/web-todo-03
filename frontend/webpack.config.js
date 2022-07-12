import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

export default {
  entry: './frontend/app.ts',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [/node_modules/],
        use: [
          'sass-to-string',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
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
  // .js , .ts 확장자없이 import 가능
  resolve: {
    extensions: ['.js', '.ts'],
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
