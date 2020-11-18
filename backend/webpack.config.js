const path = require('path'); //core js to manipulate files
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => ({
    //mode: "production", // "production" | "development" | "none"
    //This option controls if and how source maps are generated.
    devtool: argv.mode === 'development' ? 'cheap-module-source-map' : false,
    name: 'server data processing',
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    entry: "./server.js",
    output: {
        // options related to how webpack emits results

        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        path: path.resolve(__dirname, 'dist'), // string
        // the filename template for entry chunks
        filename: 'bundle.js', // string
        publicPath: ''
    },
    // configuration regarding modules
    module: {
        // rules for modules (configure loaders, parser options, etc.)
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
        ]
    },
})
