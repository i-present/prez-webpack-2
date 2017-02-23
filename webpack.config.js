let path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let rules = [
    {
        test: /\.css$/,
		loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
        })
    },
    {
        test: /\.html$/,
		loader: 'html-loader?minimize=false'
    },
	{
		test: /\.(jpe?g|png|gif|webp)$/,
		loader: 'file-loader?name=./img/[name].[hash:8].[ext]'
	},
	{
		test: /\.(ttf|eot|woff|woff2)$/,
		loader: 'file-loader?name=./font/[hash:8].[ext]'
	},
	//special loaders
	{
		test: /.*(reveal.js\\plugin).*$/,
		loader: 'file-loader?name=./plugin/[name].[ext]'
	},
	{
		test: /.*(reveal.js\\plugin).*js$/,
		loader: 'uglify-loader'
	}
]

let plugins = [
	new ExtractTextPlugin('build.[contenthash:8].css'),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'src', 'view', 'index.html')
	})
];

module.exports = {
    entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.[chunkhash:8].js',
        chunkFilename: 'build.[chunkhash:8].js'
    },
    module: {
        rules: rules
    },
    plugins: plugins,
    devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		inline: true,
		compress: true,
		host: '0.0.0.0'
	}
}
