import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: {
        'task-app-mysql': './src/task-manager/task-app-mysql.ts', // Your TypeScript entry
        main: './src/introduction/app.js', // Your existing JavaScript entry
    },
    mode: 'development',
    output: {
        filename: '[name].js', // Use [name] to output different files
        path: resolve(process.cwd(), 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'], // Add TypeScript extension
        fallback: {
            path: 'path-browserify',
            os: 'os-browserify/browser',
            crypto: 'crypto-browserify',
            util: 'util/',
            string_decoder: 'string_decoder/',
            vm: 'vm-browserify',
            buffer: 'buffer/',
            stream: 'stream-browserify',
            timers: 'timers-browserify',

            process: 'process/browser',
            zlib: 'browserify-zlib',
            net: false, // 'net' is not required for client-side
            tls: false, // 'tls' is not required for client-side
            url: 'url/',
            assert: 'assert/',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    // 'style-loader', // Injects styles into DOM
                    'css-loader', // Turns CSS into CommonJS
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css', // Output path for CSS files
        }),
        new HtmlWebpackPlugin({
            template: './src/task-manager/task.html', // Path to your HTML file
            filename: 'task-app.html', // Output filename
            chunks: ['task-app-mysql'], // Include only the 'task-app-mysql' bundle in this HTML
        }),
    ],
};
