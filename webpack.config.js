const path = require("path"); // 处理文件路径的标准库
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //自动清理
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML生成插件
const webpack = require("webpack");
//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {
  //注意这里是exports不是export
  // entry: ['webpack/hot/dev-server', __dirname + '/src/main.js'],
  entry: [__dirname + "/src/app.jsx"],
  output: {
    //输出目录
    path: path.resolve(__dirname, "build"), //打包后的js文件存放的地方
    filename: "bundle.js", //打包后的js文件名
  },
  //webpack-dev-server配置
  devServer: {
    contentBase: "./build", //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true, //设置为true，当源文件改变时会自动刷新页面
    host: "127.0.0.1",
    port: 8080, //设置默认监听端口，如果省略，默认为"8080"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My App",
      filename: "index.html",
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(), // 自动清理
    new webpack.HotModuleReplacementPlugin(), //热模块替换插件
    // 自动加载类库
    //webpack配置ProvidePlugin后，在使用时将不再需要import和require进行引入，直接使用即可。
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
  ],
  module: {
    rules: [
      {
        // Jsx,es6语法转换
        test: /\.js[x]?$/, //以js或者jsx结尾的文件
        exclude: /node_modules/, //排除node_modules文件夹下的所有文件
        use: ["babel-loader"],
      },
      {
        test: /\.ts?$/,
        use: "ts-loader", //排除node_modules文件夹下的所有文件
        exclude: /node_modules/,
      },
    ],
  },
};
