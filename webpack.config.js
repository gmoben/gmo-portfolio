var path = require('path');

var webpack = require('webpack');

module.exports = {
	debug: true,
	devtool: 'source-map',
	entry: {
		main: path.join(__dirname, 'client')
	},
	module: {
		loaders: [{
			test: /\.woff(2)?(\?-.*)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&minetype=application/font-woff"
		}, {
			test: /\.(ttf|eot|svg|png)(\?-.*)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file-loader"
		}, {
			test: /\.js$/,
			loader: 'babel?blacklist[]=react',

			exclude: /node_modules/
		}, {
			test: /\.jsx$/,
			loaders: ['imports?React=react', 'babel']
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}]
	},
	output: {
		filename: '[name].js',
		publicPath: '/js/'
	},
	resolve: {
		modulesDirectories: ['..', 'node_modules', path.join(__dirname,
			'node_modules')],
		alias: {
			'famous-flex': path.join(__dirname, 'node_modules/famous-flex/src'),
			'react-famous-flex': path.join('/Users/omgben/Dropbox/Code/node/', '/react-famous-flex/src'),
			'components': path.join(__dirname, 'client/components'),
			'client': path.join(__dirname, 'client')
		},
		extensions: [
			'',
			'.js',
			'.jsx'
		]
	},
	resolveLoader: {
		// root: path.join(__dirname, '..'),
		modulesDirectories: ['..', 'node_modules', path.join(__dirname,
			'node_modules')]
	}
};
