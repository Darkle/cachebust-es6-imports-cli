# cachebust-es6-imports-cli

Install: `npm i cachebust-es6-imports-cli -D`

cachebust-es6-imports-cli is a command line app that allows you to cachebust es6 imports. 

For example, cachebust-es6-imports-cli will take the following js file:

```js
import { Thing } from "./index.js";

console.log('hi from index.js');

```

and convert it to:

```js
import { Thing } from "./index_HILQ1xmt0EvHZnXdypa0.js";

console.log('hi from index.js');

```

The cache bust string is set either via the environment variable `CACHE_BUST_STRING`, or via the `--cachebuststring` cli flag. 

Here is an example of how you would use this via npm scripts:

```
"build": "CACHE_BUST_STRING=$(random string) NODE_ENV=production run-s build:**",
"build:cachebust-js-files": "laren \"./dist/js/**/*.js\" \"f => f.replace('.js', '_' + process.env.CACHE_BUST_STRING + '.js')\"",
"build:cachebust-js-file-imports": "cachebust-es6-imports-cli --glob \"./dist/js/**/*.js\"",
```

So in the example above, we use [laren](https://github.com/devmetal/laren) to rename the .js files in the dist folder using the CACHE_BUST_STRING, then we use cachebust-es6-imports-cli to rename the imports so they match up to the changed file names. (This of course assumes that you are moving your source files to another folder as you would not want to change the source files).

Note: the cache bust string does not represent a hash of the javascript file. It is just a random string.

You can also ignore certain imports using the `--ignore` cli flag. It takes a string that is put into a javascript [Regexp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp). E.g. `--ignore 'foo*'` or `--ignore 'merp\.js$'`

```


Usage: cachebust-es6-imports-cli [options]

Options:
  -g, --glob <glob>                        File glob
  -c, --cachebuststring <cachebuststring>  Cache bust string
  -i, --ignore <ignore>                    Ignore specific imports using a RegExp string (optional)
  -h, --help                               display help for command


```

#### Other links

* [random-generator-cli](https://github.com/AmrSaber/random-cli) - generate random text
* [Laren](https://github.com/devmetal/laren) - rename files on the command line
* [html-script-src-replace](https://gitlab.com/Darkle1/html-script-src-replace) - rename an html script src attribute value using the `CACHE_BUST_STRING`
* [transform-imports](https://www.npmjs.com/package/transform-imports)
* [babel-plugin-transform-rename-import](https://github.com/laat/babel-plugin-transform-rename-import)
* [graspjs](https://www.graspjs.com/)