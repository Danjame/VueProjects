// node 自带
const path = require('path'); // 路径解析
// 通过npm 安装
const express = require('express');
const serveStatic = require('serve-static')
const glob = require('glob')

// 配置项
const app = express()
const port = 3000

app.set("views", path.resolve(__dirname, "../client/dist"));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html')

app.use(serveStatic(path.join(__dirname, "../client/dist")))


function creatRouter(dirname){
    const p = path.resolve(__dirname, dirname);
    const files = glob.sync(`${p}/**/*.js`);
    files.map((file) => {
        let re = file.split(dirname);
        re = re[1].replace(/index(\.js)?$/, '');
        if(dirname === 'api'){
            re = `/api${re}`;
        }
        app.use(re, require(file));
    })
}

creatRouter('controller');
creatRouter('api');


app.listen(port, () => console.log(`start ${port} is ok!`))