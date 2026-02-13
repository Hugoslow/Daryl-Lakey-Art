const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    const ext = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ico': 'image/x-icon'
    };
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
            return;
        }
        res.writeHead(200, {'Content-Type': contentTypes[ext] || 'text/plain'});
        res.end(data);
    });
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));
