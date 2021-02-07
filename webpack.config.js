const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML生成插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // CSS提取插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //自动清理
const JavaScriptObfuscator = require("webpack-obfuscator"); //加密代码
const TerserPlugin = require("terser-webpack-plugin"); //压缩代码

const path = require("path"); // 处理文件路径的标准库
const webpack = require("webpack");

const OpenJavaScriptObfuscator = false;

//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = (env, options) => {
  return {
    stats: {
      // 关闭Entrypoint mini-css-extract-plugin = *提示
      entrypoints: false,
      children: false,
    },
    devtool: false, //使用source-map-dev-tool-plugin
    //注意这里是exports不是export
    // entry: ['webpack/hot/dev-server', __dirname + '/src/main.js'],
    entry: [__dirname + "/src/app.jsx"],
    output: {
      //输出目录
      path: path.resolve(__dirname, "build"), //打包后的js文件存放的地方
      filename: (pathData) => {
        return pathData.chunk.name === "main" //打包后的js文件名
          ? "assets/js/app.[contenthash:4].js"
          : "assets/js/[name].[contenthash:4].js";
      },
      //filename: "assets/js/app.[contenthash:4].bundle.js",
      chunkFilename: "assets/js/[name].[contenthash:4].chunk.js", //非入口(non-entry) chunk 文件的名称。
      publicPath: "/", //资源的基础路径，设置什么值就会在原来的路径前面加上这个值
      // publicPath: "https://cdn.example.com/assets/",
    },
    performance: {
      hints: "warning", // 枚举
      maxAssetSize: 30000000, // 整数类型（以字节为单位）
      maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
      assetFilter: function (assetFilename) {
        // 提供资源文件名的断言函数
        return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
      },
    },
    // 提取公共代码
    optimization: {
      /*        runtimeChunk: {
            name: 'manifest'
        },*/
      minimize: (function () {
        if (options.mode === "development") {
          return false;
        } else {
          return true;
        }
      })(),

      minimizer: [
        (function () {
          if (options.mode === "development") {
            return function () {
              console.log("不做压缩操作...");
            };
          } else {
            return new TerserPlugin({
              extractComments: {
                condition: true,
                filename: (fileData) => {
                  // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
                  return `${fileData.filename}.LICENSE.txt${fileData.query}`;
                },
                banner: (commentsFile) => {
                  return ``;
                  //return `My custom banner about license information ${commentsFile}`;
                },
              },
            });
          }
        })(),
      ], // [new UglifyJsPlugin({...})]
      splitChunks: {
        chunks: "async",
        minSize: 20000,
        minRemainingSize: 0,
        maxSize: options.mode === "development" ? 3000000 : 300000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/, // 抽离第三方插件
            priority: 10, // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
            reuseExistingChunk: true, // 指定是node_modules下的第三方包
            chunks: "initial", // 拆分模块的范围
            name: "vendor", // 打包后的文件名，任意命名
          },
          defaultVendors: {
            name: "app", // 打包后的文件名，任意命名
            chunks: "initial", // 抽离自己写的公共代码，common这个名字可以随意起
            minChunks: 1,
            priority: -20,
            minSize: 30000, // 只要超出0字节就生成一个新包
            reuseExistingChunk: true,
          },
        },
      },
    },
    //webpack-dev-server配置
    devServer: {
      contentBase: "./build", //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
      historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
      inline: true, //设置为true，当源文件改变时会自动刷新页面
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      host: "127.0.0.1",
      port: 8081, //设置默认监听端口，如果省略，默认为"8080"
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    plugins: [
      options.mode === "development"
        ? new webpack.SourceMapDevToolPlugin({
            filename: "assets/js/[name].[contenthash:4].js.map",
            exclude: ["assets/js/app.[contenthash:4].js"],
          })
        : function () {
            console.log("不生成map文件");
          },
      (function () {
        if (
          options.mode !== "development" &&
          OpenJavaScriptObfuscator === true
        ) {
          return new JavaScriptObfuscator(
            {
              compact: true, //压缩代码
              // controlFlowFlattening: true, //是否启用控制流扁平化(降低1.5倍的运行速度)
              // controlFlowFlatteningThreshold: 0.111, //应用概率;在较大的代码库中，建议降低此值，因为大量的控制流转换可能会增加代码的大小并降低代码的速度。
              // deadCodeInjection: true, //随机的死代码块(增加了混淆代码的大小)
              // deadCodeInjectionThreshold: 0.4, //死代码块的影响概率
              // debugProtection: false, //此选项几乎不可能使用开发者工具的控制台选项卡
              // debugProtectionInterval: false, //如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
              // disableConsoleOutput: true, //通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
              // identifierNamesGenerator: "hexadecimal", //标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
              // log: false,
              renameGlobals: true, //是否启用全局变量和函数名称的混淆
              rotateStringArray: true, //通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
              // selfDefending: true, //混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
              // stringArray: true, //删除字符串文字并将它们放在一个特殊的数组中
              // stringArrayThreshold: 0.75,
              // transformObjectKeys: true,
              // unicodeEscapeSequence: false, //允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
            },
            []
          );
        } else {
          return function (params) {
            console.log("不做加密操作...");
          };
        }
      })(),

      new HtmlWebpackPlugin({
        // title: "My App",
        filename: "index.html",
        template: __dirname + "/src/index.html",
        inject: true, //设置为true插入的元素放入body元素的底部
        hash: false, //开启hash  ?[hash]
        minify:
          options.mode === "development"
            ? false
            : {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true, //折叠空白区域 也就是压缩代码
                removeAttributeQuotes: true, //去除属性引用
              },
      }),
      new CleanWebpackPlugin(), // 自动清理
      new webpack.HotModuleReplacementPlugin(), //热模块替换插件
      //css加载
      new MiniCssExtractPlugin({
        //css加载
        // 类似 webpackOptions.output里面的配置 可以忽略
        filename: "assets/css/[name]-[contenthash:4].css",
        chunkFilename: "assets/css/[id]-[contenthash:4].css",
      }),
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
        // css编码与提取
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            "postcss-loader",
          ],
        },
        // 图片内联与编码
        {
          // 小于1KB的图片使用base64内联
          test: /\.(png|jpg|webp)$/,
          use: [
            {
              loader: "url-loader", // or url-loader
              options: {
                limit: 20480,
                name: "assets/images/[name]-[contenthash:4].[ext]",
                esModule: false,
              },
            },
          ],
        },
        {
          // 字体文件
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          use: [
            {
              loader: "file-loader", // or url-loader
              options: {
                name: "assets/fonts/[name]-[contenthash:4].[ext]",
              },
            },
          ],
        },
      ],
    },
  };
};
