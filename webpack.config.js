module.exports = {
  mode: 'development',
  entry: './script.ts',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'script.js',
    path: __dirname,
  },
  node: {
    fs: false,
  }
};
