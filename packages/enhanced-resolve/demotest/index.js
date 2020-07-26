var resolve = require("../lib/node");
// 解析相对目录下index.js文件
const context = {}
resolve(context,__dirname, 'ajv', (err, p, result) => {
    // p = /Users/enhanced-resolve/index.js
    console.log(p)
    console.log(result)
})