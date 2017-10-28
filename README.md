[![npm][npm]][npm-url]

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
</div>
<h1>NEJ Loader</h1>
<p>NEJ 模块化方式代码的 webpack 加载器<p>

<h2 align="">简介</h2>

* 让 `webpack` 能够识别 `NEJ` 模块化加载方式的 `javascript` 代码，使用 `nej/define.js` 改造而来；
* 不建议用它来加载 NEJ 自身类库，请直接使用现有 NPM 模块: [nej-commonjs](https://www.npmjs.com/package/nej-commonjs)；
* 支持 SourceMap，配置 `webpack.config.js` 中的 `devtool` 即可。

<h2 align="">安装</h2>

```bash
npm install nej-loader
```

<h2 align=""><a href="https://webpack.js.org/concepts/loaders">使用</a></h2>

```javascript
const {join} = require('path');
const jsRoot = join(__dirname, 'src/main/webapp/src/javascript');
const nejRoot = join(__dirname, 'src/main/webapp/src/javascript/lib');
module.exports = {
  module: {
    rules: [
        { 
            test: /\.js$/, 
            exclude: /nej|lib|node_modules/,
            use: [{
                loader: 'nej-loader'
                options: {
                    alias: [
                        {
                            key: 'lib',
                            value: nejRoot,
                        }, {
                            key: 'pro',
                            value: jsRoot,
                        }
                    ], 
                    replaceArgs: {
                        'pro/lib/regularjs/dist/regular': 'Regular',
                    },
                    outputAlias: [
                        {
                            key: 'nej-commonjs',
                            value: nejRoot,
                        }
                    ],
                    isPatch: false
                }
            }],
        }
    ]
  }
};
```

<h2 align="">配置项</h2>


字段名 | 作用
------------|-------
`alias` | 替换目标代码 `define(['{lib}base/klass'])` 中的 `lib` 变量为对应值
`replaceArgs` | 替换目标代码 `define(['pro/lib/regularjs/dist/regular'], funcion (R) {})` 为对应值Regular
`outputAlias` | 替换目标代码 `require(${nejRoot}/a.js)` 的 `nejRoot` 为 `nej-commonjs`
`isPatch` | 是否启用 `NEJ` 的平台兼容功能


<h2 align="">主要贡献者</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/10825163?v=4&s=150">
        </br>
        <a href="https://github.com/Imhype">君羽</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/nej-loader.svg
[npm-url]: https://npmjs.com/package/nej-loader
