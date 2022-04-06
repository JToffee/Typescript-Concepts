const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/app.ts",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		// publicPath: "dist",
	},
	devtool: "none", //extract source maps and link correctly to the generated bundles
	module: {
		rules: [
			{
				test: /\.ts$/, //use rule on .ts files
				use: "ts-loader", // handle .ts files using ts-loader,
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".ts"], //look ts and js files
	},
	plugins: [new CleanPlugin.CleanWebpackPlugin()], // Clear dist folder before writing anything to it
};

//webpack  --config webpack.config.prod.js
