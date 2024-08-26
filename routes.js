const fs = require('fs');
const requestHandler = (req, res)=>{
    const url = req.url;
    const method = req.method;

    if(url === '/'){

        // Read the latest message from the file
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
                data = ''; // If there's an error reading the file, just display nothing
            }


        res.write('<html>');
        res.write('<head><title> Enter Message</title></head>');
        res.write(`<body><p>${data}</p>`);
        res.write(
            '<body><form action = "/message" method = "POST"><input type = "text" name = "message"><button type = "submit">send</button></form></body>'
            );
            //res.write('</html>');
            res.write('</body></html>');
            return res.end();
    });
}
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,err => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from My Node.js Server!</h1></body>');
    res.write('</html>');
}


//different ways to export core modules
//module.exports = requestHandler;

// module.exports={
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded text';

// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';