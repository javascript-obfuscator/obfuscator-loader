# obfuscator-loader for webpack

This is a module loader for webpack wich obfuscate module source code using [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).  

## Installation
```npm install --save-dev obfuscator-loader```

## What's new in 1.1.1
`stringArray` option is now available. Thank you [Timofey Kachalov](https://github.com/zakplus/obfuscator-loader/issues/1).


## Why not a plugin?
Obfuscating code can results in quite large files. It's a good idea to obfuscate only your code leaving third party libraries unobfuscated.
This is simple to achieve using a plugin if you plan to split your code and third party code in different bundles. Take a look at [this plugin](https://github.com/javascript-obfuscator/webpack-obfuscator).  


Sometimes you need to output a single js bundle but you still need to obfuscate the source code of some particular module. In these cases a loader can do the trick.  
For example I happened to had to bundle a big third party library (not a module of any sort, I had to use [script-loader](https://github.com/webpack-contrib/script-loader)) in one of my project and I was requested to obfuscate my code. 

## Usage
Define a rule in your webpack config and use the obfuscator-loader as the last of your loaders for your modules. You can add the **enforce: 'post'** flag to ensure the loader will be called after normal loaders:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname, "justMySources") ],
        enforce: 'post',
        use: { loader: 'obfuscator-loader', options: {/* options here */} }
      },
    ]
  }
};
```

## Options
This loader accepts the same options object of [javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator#options)

## License
```
MIT License

Copyright (c) 2018 Valerio Bianchi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```