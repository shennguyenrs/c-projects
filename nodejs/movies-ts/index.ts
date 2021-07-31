import http from 'http';

import app from './src/app';

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
  console.log('Server is listening in port', PORT);
});
