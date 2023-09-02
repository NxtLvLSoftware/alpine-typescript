const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');
const outPath = path.resolve(rootPath, 'dist');

module.exports = {
	entry: './src/index.ts',
	mode: isProduction ? 'production' : 'development',
	output: {
		path: outPath,
		filename: 'index.js',
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(srcPath, 'index.html')
		}),
		new MiniCssExtractPlugin({
			filename: 'index.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(srcPath, 'favicons'),
					to: path.resolve(outPath, 'favicons')
				}
			]
		})
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				include: srcPath,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	devServer: {
		static: outPath,
		hot: true,
		compress: true,
		historyApiFallback: true
	}
};
