const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const loggedIn = (res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<h1>Logged In</h1>');
}
const server = http.createServer((rex,res) => {
    console.log(rex.headers);
    if(rex.headers.authorization){
        const authString = Buffer.from(rex.headers.authorization.split(' ')[1],'base64').toString('utf-8');
        console.log('authString ', authString);
        const [ userName, password ] = authString.split(':');
        if(userName === 'Nishant' && password === '@honolulu'){
            loggedIn(res);
            return;
        }
    }
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm:"abc"');
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})