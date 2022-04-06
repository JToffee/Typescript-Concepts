// npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader
//
const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/app.ts",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "dist",
	},
	// devServer: {
	// 	historyApiFallback: true,
	// 	// contentBase: path.resolve(__dirname, "dist"),
	// 	// publicPath: "dist",
	// },
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
};
