# eCentral Scripts

eC Scripts provides a fast and painless integration of modern development tools.

## Quick Overview

You need no configuration to get started with full ES6+ and SCSS support right away.

It's possible though, to extend the configuration with other presets (e.g. React)
or adjust it to match your specific project needs.

## Getting started

**Step 1:** For now you need to place a `package.json` file inside your project folder,
that contains at least the following entries:
 
```
{
  "scripts": {
    "init": "cross-env NODE_ENV=development ec-scripts --init",
    "start": "cross-env NODE_ENV=development ec-scripts --start",
    "build": "cross-env NODE_ENV=production ec-scripts --build",
    "build-watch": "cross-env NODE_ENV=production ec-scripts --build --watch",
    "test": "cross-env NODE_ENV=test ec-scripts --test",
    "config": "cross-env NODE_ENV=development ec-scripts --show-config"
  },
  "devDependencies": {
    "ec-scripts": "git+https://git@gitlab.ecentral.de/f.laukel/ec-scripts.git"
  }
}
```

**Step 2:** Run `npm i && npm run init`.

**Step 3:** Create `src/index.js` and start writing some code!

**Step 4:** Run `npm run start` to start the development server.

You can now open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

You don't need to set up any other tools like Webpack, Babel or Jest.<br>
That's exactly what eC Scripts does for you.

Just follow these simple steps and you're good to go!

## Run commands

### `npm run init`

As of now, this writes an `.eslintrc.json` file to your project folder,
in order for your IDE to use it easily.<br>
So at the moment, this is only necessary when changing any Eslint related configuration
in `ecconf.js`.

This also happens automatically on every other command.

### `npm run start`

Runs your code in development mode using Webpack dev server.<br>
Open [http://localhost:3000/](http://localhost:3000/) to see it in the browser.

### `npm run build`

Builds your files for production to the `build` folder (default).<br>
The build is minified, optimized and ready to be deployed.

### `npm run build-watch`

Same as `npm run build` but watches for changes and performs new builds accordingly.

### `npm test`

Let's Jest run all your tests.

It will look for them in `*.test.js`, `*.spec.js` files or `__test__/*` folders.

### `npm run config`

Prints the used configuration settings in your console.

## How to extend and customize

One important goal with eC Scripts was not only to give you a single, pre-configured toolset.
It was important for us that it can be extended and customized.

That's where `ecconf.js` comes in play.

### Using presets

Let's say just writing pure ES6 code isn't enough for you.
You need a solution for your view components and you want to use React, Vue or this other library.

Fortunately there is a React preset available for eC Scripts!
It hooks in and configures Babel, Eslint, Jest, Webpack, HMR... well, all this stuff, for you.

Sounds complicated?<br>
Let's see how we implement it in our project:

**Step 1:** In your project root create a file `ecconf.js` with the following content:
```js
module.exports = {
    presets: ['react'],
};
```

**Step 1:** Install preset dependency:<br>
`npm i --save-dev ec-scripts-react@git+https://git@gitlab.ecentral.de/f.laukel/ec-scripts-react.git`

**Step 3:** To update your local `.eslintrc` config file so that your IDE immediately knows about React and JSX:<br>
`npm run init`

Well... that's it!<br>
You can now start creating React components by using JSX syntax and
also write unit tests for them using Jest with Enzyme.

### Change configuration settings

So if one more dependency and one line of code in your `ecconf.js` file achieves so much stuff...
How hard can it be to change the configuration on your own, right?

#### Options

Changing options in `ecconf.js` is a simple way to adjust the configuration according to your environment.

Below you find a list of all available options with their default values, defined by eC Scripts.

```js
// ecconf.js

module.exports = {
    // ...
    
    options: {
        // Define directory for your project files.
        srcDir: 'src',
        
        // Define the directory for your static files.
        assetsDir: 'assets', // Relative to srcDir
        
        // Define the directory for your basic .scss files.
        // This tells SASS compiler where to look for imports in the first place.
        // (like main.scss or _variables.scss)
        stylesDir: 'styles', // Relative to srcDir
        
        // Define your output directory.
        buildDir: 'build',
        
        // Define files for main bundle.
        entryFiles: [
            // 'styles/main.scss',
            'index.js',
        ],
        
        // Set path to html template.
        // (Should be absolute or relative to your project root)
        htmlTemplate: require.resolve('./resources/index.ejs'), // null for no html template
        
        // Define page title.
        title: 'App | powered by ec-scripts',
        
        // Hostname for webpack dev server.
        host: '0.0.0.0',
        
        // Port for webpack dev server.
        port: 3000,
        
        // List of supported browsers for babel-preset-env and autoprefixer.
        browserList: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9',
        ],
        
        // The file size in bytes under which the url-loader kicks in
        // and base64-inlines your required files.
        inlineFileSize: -1, // Use -1 to disable, 0 for no limit at all
        
        // BELOW SHOULD NOT BE CHANGED IN MOST CASES!
        
        // Environment boolean flags.
        // Defines if we are in development mode (true) or production (false).
        devMode: process.env.NODE_ENV === 'development',
        
        // Defines if we are in test mode (true) or not (false).
        testMode: process.env.NODE_ENV === 'test',
    },
};
```

*NOTE:* Presets may introduce more options when necessary.

#### The idea of Options, Addons and Runners

As you may have expected, using options isn't the only thing you can do with `ecconf.js`.<br>
There's also "addons" and "runners".
These names are used to define two groups of tools within eC Scripts.

Addons are all the tools that runners need to understand to run our code.
Therefore addons in `ecconf.js` contain the configurations for Babel and Eslint. Maybe more in the future.

As mentioned before, runners actually run our code in the end and do things with it, utilizing addons.
As you may have guessed by now, these runners are Webpack and Jest.
Webpack bundles our code. Jest runs our tests. They do not have much in common,
**except** sharing the same options and addons!

So, let me try to explain how our extendable configuration concept works:
- First eC Scripts gathers all `ecconf.js` files by looking inside your project root
and resolving any presets that you added.
- It then merges all configurations into one, step by step, like so `root -> [preset] -> project`:
  - It starts with it's own **options**, merges them with preset's options (if available) and then with your project's options.<br>
  - It continues with this strategy by merging **addons** in the same order.
  - Finally it merges all **runners**, also in this order.
- The resulting configuration object is the one that is used inside all the tools.
  
Note that every options, addons or runners definition in `ecconf.js`
can receive the current state of the merged configuration, when declared as function.

Here's a practival overview of different approaches on how to update a configuration:

```js
// ecconf.js in your project

module.exports = {
    // options, addons and runners always receive the whole config object.
    addons: (currentConfig) => ({
        // With a function you have power to override a setting completely.
        // Remember to spread the previous content if you don't want to override!
        ...currentConfig.addons,
        
        eslint: {
            // When extending arrays you should use functions.
            presets: (presets) => ([
                ...presets,
                'moar-rules',
            ]),
            // Note: When working with arrays like this you can also use .map() and .filter()!
            
            // Object declarations on the other hand get merged with the previous content.
            rules: {
                'some-rule': 'warn',
            },
            
            // Therefore *if* you really want to override/reset a setting
            // use a function declaration and don't spread.
            // Use with caution, though!
        },
    }),
};
```

#### Advanced usage

Bad things first: If you want to add full support for an advanced library like React yourself,
you need to know all the steps necessary. Like adding presets to Babel, configure React Hot Loader, Jest, and so on.<br>
That's a lot to ask for a package that describes itself as "painless".

The good thing is, though, that it's possible to update the all the configuration settings in one place and
change only the parts you need for what you want to achieve.

Of course this sounds very theoretical and we will not go in detail here by
explaining all the possibilities you have inside an `ecconf.js` file.

For advanced usage it's a good start to look at the [React preset source](https://gitlab.ecentral.de/f.laukel/ec-scripts-react/blob/master/ecconf.js) itself.

## Acknowledgements

We are grateful to the authors of existing related projects for their ideas and inspiration:

[Create React App](https://github.com/facebookincubator/create-react-app)<br>
[kcd-scripts](https://github.com/kentcdodds/kcd-scripts)<br>

## License

MIT
