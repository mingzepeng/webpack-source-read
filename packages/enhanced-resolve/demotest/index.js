var resolve = require("../lib/node");
// 解析相对目录下index.js文件
const context = {}
resolve(context,__dirname, 'C:\\projects\\webpack-4.43.0\\package.json', (err, p, result) => {
    // p = /Users/enhanced-resolve/index.js
    console.log(err, p === context)
})