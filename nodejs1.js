const http = require('http');
const os = require('os');
const fs = require('fs');

console.log(`Sistema: ${os.platform()} ${os.release()}`);
console.log(`Node.js versión: ${process.version}`);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('¡Bienvenido al servidor Node.js!');
  } else if (req.url === '/config') {
  } else if (req.url === '/system-info') {
    const systemInfo = `Sistema: ${os.platform()} ${os.release()}\nNode.js versión: ${process.version}`;
    res.end(systemInfo);
  } else {
    res.end('Ruta no encontrada');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Servidor Node.js en ejecución en http://127.0.0.1:3000/');
});

const config = {
  interval: 5000, 
  showCPU: true,
  showMemory: true,
  showUptime: true,
};

fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
  if (err) {
    console.error('Error al guardar la configuración en "config.json"');
  } else {
    console.log('Configuración guardada en "config.json"');
  }
});

function showInfo() {
  if (config.showCPU) {
    console.log(`Uso de CPU: ${process.cpuUsage().user}%`);
  }
  if (config.showMemory) {
    const memoryUsage = process.memoryUsage();
    console.log(`Uso de memoria: RSS ${memoryUsage.rss} bytes, Heap total ${memoryUsage.heapTotal} bytes, Heap usado ${memoryUsage.heapUsed} bytes`);
  }
  if (config.showUptime) {
    const uptime = os.uptime();
    console.log(`Tiempo del sistema activo: ${uptime} segundos`);
    console.log(`Tiempo de ejecución de Node.js: ${process.uptime()} segundos`);
  }
}
setInterval(showInfo, config.interval);
