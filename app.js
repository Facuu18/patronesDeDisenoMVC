const connectLivereload = require('connect-livereload');
const livereload =require('livereload');
const liveReloadServer = livereload.createServer();

const express = require('express');
const app = express();
const port = 3030;
const path = require('path');

/* Rutas */

const mainRouter = require('./routers/main');

/* views engine setup */
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/',mainRouter)


app.use(express.static(path.join(__dirname,'public')));
liveReloadServer.watch(path.join(__dirname,'public'));
app.use(connectLivereload())

liveReloadServer.server.once('connection',() => {
    setTimeout(() => {
        liveReloadServer.refresh('/')
    }, 50);
})

app.listen(port,()=> console.log(`Servidor levantado en http://localhost:${port}`))