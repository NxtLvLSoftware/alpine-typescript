import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import WarningsToErrorsPlugin from 'warnings-to-errors-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');
const outPath = path.resolve(rootPath, 'dist');

const Mode = isProduction ? 'production' : 'development';
const productionPlugins = [
	new WarningsToErrorsPlugin()
];
const developmentPlugins = [
	//
];

/** @type {Partial<import('webpack').Configuration>} */
let Config = {
	entry: './src/index.ts',
	mode: Mode,
	output: {
		path: outPath,
		filename: 'index.js',
		clean: true,
		strictModuleErrorHandling: true,
		strictModuleExceptionHandling: true
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
				test: /\.(tsx|ts)$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false
				}
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
		fallback: {
			'@nxtlvlsoftware/alpine-typescript': path.resolve(
				rootPath,
				JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'))).dependencies['@nxtlvlsoftware/alpine-typescript'].substring(5)
			)
		}
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

if (isProduction) {
	Config.devtool = 'hidden-source-map';
	Config.plugins.push(...productionPlugins);
} else {
	Config.devtool = 'inline-source-map';
	Config.plugins.push(...developmentPlugins);
}

export default Config;
