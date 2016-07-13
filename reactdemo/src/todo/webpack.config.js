var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: './index',
	output: {
		path: path.join(__dirname, '../../dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			resolve: { extensions: ['.js'] },
			loaders: [ 'babel' ],
			exclude: /node_modules/,
		}]
	}
};