const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

// Files in the project folder that visitors should never be able to download
const PRIVATE_FILES = new Set(['server.js', 'package.json', 'package-lock.json']);

function sendIndex(res) {
    res.writeHead(200, {'Content-Type': contentTypes['.html']});
    fs.createReadStream(path.join(ROOT, 'index.html')).pipe(res);
}

function sendNotFound(res) {
    res.writeHead(404, {'Content-Type': contentTypes['.txt']});
    res.end('Not found');
}

http.createServer((req, res) => {
    let urlPath;
    try {
        // Drops any ?query string and turns %20 etc. back into real characters
        urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
        return sendNotFound(res);
    }

    if (urlPath === '/') return sendIndex(res);

    const filePath = path.join(ROOT, urlPath);
    const relative = path.relative(ROOT, filePath);
    const isOutsideSite = relative.startsWith('..') || path.isAbsolute(relative);
    const isHidden = relative.split(path.sep).some(part => part.startsWith('.'));
    if (isOutsideSite || isHidden || PRIVATE_FILES.has(relative.toLowerCase())) {
        return sendNotFound(res);
    }

    const ext = path.extname(filePath).toLowerCase();
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Unknown page addresses get the home page; missing images/scripts get a real 404
            return ext ? sendNotFound(res) : sendIndex(res);
        }
        res.writeHead(200, {'Content-Type': contentTypes[ext] || 'application/octet-stream'});
        res.end(data);
    });
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));
