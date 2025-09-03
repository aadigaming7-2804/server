const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from server!');
    } else if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const jsonData = { "name": "YourName", "role": "Intern", "stack": "Full-Stack" };
        res.end(JSON.stringify(jsonData));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});