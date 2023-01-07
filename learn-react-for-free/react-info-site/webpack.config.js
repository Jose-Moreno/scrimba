/* 
    Webpack is a module bundler. 
    Takes a group of files and bundles them as a smaller group of files
    All js files are bundled as bundle.js for a production app
*/

const path = require("path"); //Using built-in path module to resolve paths
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    /* 
        We want to let webpack know everything in this file will be exported
        Where is the entry point of our app? where does it begin?
    */

    entry: "./index.js", // tells webpack wihch file is used to create a dependency graph
    output: { //pass in an {object}
        // We want the bundle to be placed in a 'dist' folder
        path: path.join(__dirname, "/dist"),
        // This is our webpack bundle name
        filename: "bundle.js"
    },
    // we want to make the bundle.js be loaded into an html file. We use html-webpack-plugin. Register it as a plugin
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html" //Inject the bundle files into the html file
        }) // instantiate the object
    ],

    //Let's inform webpack about the loader(s) we will use (babel)
    module: {//determines how various modules will be treated
        rules: [//How the modules are created, array of objs. Each obj is a rule
            {
                //Well ask to use babel to transpile all files that end in *.js using regEx
                test: /\.(js|jsx)$/i, // $ means it has to end in .js or .jsx
                exclude: /node_modules/, // Do not transpile modules in these locations
                use: {
                    loader: "babel-loader",
                    options: {
                        // We want to use the babel loader to transpile js files
                        // by using babel presets -env and -react
                        presets:["@babel/preset-env","@babel/preset-react"]
                    }
                } // Specify what and how we want to do it with this property
            },
            {
                test: /\.(css)$/i, // $ means it has to end in .css / i means that is case sensitive
                use: ["style-loader", "css-loader"]
                // The loaders need to be loaded in order 'style-loader' comes first and followed by 'css-loader'
                // If this convention is not followed, webpack is likely to throw errors.
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource' // if asset only is used, it will automatically choose btwn exporting URI or a separate file
                // This is a built-in loader type that emits a separate file to the output directory
                // and exports the URL. Their paths will be injected into the bundles.
                // You can customize outputPath and publicPath for them.
            }
        ]

    }

}