var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    mustache = require('./lib/mustache'),
    keyprocessor = require('./lib/keyprocessor'),
    sysinfo = require('./lib/sysinfo'),
    moment = require('moment'),
    randomWords = require('random-words'),
    port = process.env.PORT || 8080;

setInterval(function() {
    for (var i = 0; i < 1; i++) {
        var phrase = randomWords({ min: 3, max: 10 }).join(' ');
        // phrase = phrase.charAt(0).toUpperCase() + phrase.slice(1);
        // console.log(phrase);
        console.log('Quoth the Raven: ' + phrase);
        console.error('Quoth the Raven: ' + phrase);
    }
}, 100);

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);
    console.log("uri: " + uri + "\nfilename: " + filename);

    fs.exists(filename, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (uri == "/") {
            var t = path.join(filename, '/index.html');
            var v = {
                env: [],
                sys: sysinfo.sysInfo()
            };
            for (var item in process.env) {
                v['env'].push({
                    'key': item,
                    'value': keyprocessor.procKey(item, process.env[item])
                });
            }

            fs.readFile(t, 'utf8', function(err, data) {
                var html = mustache.to_html(data, v);
                response.writeHead(200);
                response.write(html, "binary");
                response.end()
                return;
            });
            return; //need to return here otherwise the code below will execute. 
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
            return;
        });
    });
}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://0.0.0.0:" + port + "/\nCTRL + C to shutdown");
