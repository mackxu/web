var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	context: APP_PATH,
	entry: {
		pageA: './index',
		pageB: './pageB'
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel', include: APP_PATH, query: { presets: ['es2015'] } },
			{ test: /\.css$/, loaders: ['style', 'css'], include: APP_PATH },
			{ test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap'], include: APP_PATH },
			{ test: /\.(png|jpg)$/, loader: 'url?limit=2000' },		// 当图片小于这个限制，会自动启用base64编码图片
		],
		perLoaders: [
			{ test: /\.jsx?$/, loader: 'jshint-loader', include: APP_PATH }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'hello world app'
		}),
		new HtmlWebpackPlugin({
			title: 'hello world app2',
			filename: 'pageB.html',
			inject: 'head'
		}),
		new webpack.ProvidePlugin({ $: 'jquery' }),
		new webpack.optimize.CommonsChunkPlugin('jquery.js', ['pageA', 'pageB'])
	],
	devtool: 'source-map',
	jshint: {				// 配置jshint的选项，支持es6的校验
		esnext: true
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	}
};