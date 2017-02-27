var webpack = require('webpack');
var path = require('path');

var config = {
    entry: ['./src/index.js','./src/sass/theme.scss','./src/lib/markerclusterer.js'],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: 'node_modules',
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },{
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                exclude: 'node_modules',
                loaders: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        query:{
                            sourceMap: false,
                            module:true
                        }
                    },{
                        loader:'sass-loader',
                        query:{
                            sourceMap: false
                        }
                    }
                    
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "app.js"
    },
    devServer: {
        historyApiFallback: true,
        inline: true
    }
};

module.exports = config;