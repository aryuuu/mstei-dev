//Modul yang dibutuhkan
var fs = require("fs");
var http = require("http");
var url = require("url");

http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200);

    if(pathname == "/") {//html
        html = fs.readFileSync("index.html", "utf8");
        response.write(html);
    } else if (pathname == "/api.js") {//javascript
        script = fs.readFileSync("api.js", "utf8");
        response.write(script);
    } else if (pathname == "/style.css"){//css
        style = fs.readFileSync("style.css", "utf8");
        response.writeHeader(200, {'Content-Type': 'text/css'});
        response.write(style)
    }


    response.end();
}).listen(8888);//mendengarkan event dari port 888

console.log("Listening to server on 8888...");