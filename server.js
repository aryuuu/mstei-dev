var http = require('http');
var fs = require('fs');
var port = 3000;

function onRequest(request, response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data){
        if (error){
            response.writeHead(400);
            response.write('Not Found!');
        } else {
            console.log("listening on port "+port);
            
            response.write(data);
        }
        response.end();
    });
}

console.log("visit http://localhost:"+port+" in your browser.");
http.createServer(onRequest).listen(port);