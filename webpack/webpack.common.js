const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
    entry: {
        index: path.join(srcDir, 'index.tsx'),
        //   options: path.join(srcDir, 'options.tsx'),
        //   background: path.join(srcDir, 'background.ts'),
        content: path.join(srcDir, 'content.tsx'),
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks(chunk) {
                return chunk.name !== 'background';
            },
        },
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'scss', 'css'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: '.', to: '../', context: 'public' }],
            options: {},
        }),
        ...getHtmlPlugins(['index']),
    ],
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
        new HTMLPlugin({
            title: 'React extension',
            filename: `${chunk}.html`,
            chunks: [chunk],
        })
    );
}