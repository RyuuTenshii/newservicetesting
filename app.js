const http = require('http');
const redis = require('redis');

// Membuat koneksi ke database Redis
// Docker Compose otomatis membuatkan DNS lokal, jadi kita bisa panggil nama servicenya: 'redis-db'
const client = redis.createClient({
    url: 'redis://redis-db:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function startServer() {
    await client.connect();

    const server = http.createServer(async (req, res) => {
        if (req.url === '/favicon.ico') {
            res.writeHead(204);
            res.end();
            return;
        }

        // Naikkan hit counter sebanyak 1 setiap kali halaman diakses
        const visits = await client.incr('visits');
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Halo! Halaman ini sudah dikunjungi sebanyak ${visits} kali.\n`);
    });

    server.listen(3000, () => {
        console.log('Server Compose siap di port 3000');
    });
}

startServer();