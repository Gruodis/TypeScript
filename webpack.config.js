import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
    entry: './src/introduction/app.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: resolve(process.cwd(), 'dist'),
    },
    module: {
        rules: [
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
    ],
};
