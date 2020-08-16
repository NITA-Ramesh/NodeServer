
const express = require('express'),http = require('http');
const dishRouter = require('./routes/dishRouter.js');
const leaderRouter=require('./routes/leaderRouter');
const promoRouter=require('./routes/promoRouter');
const hostname = 'localhost';
const port = 3000;
const morgan = require('morgan');
const app = express();

app.use('/dishes', dishRouter);
app.use('/leaders',leaderRouter);
app.use('/promotions',promoRouter);
app.use(morgan('dev'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
