'use strict'

const app = require('./src/app/app');

app.listen(process.env.PORT, () => {
    console.log(`Estoy escuchando en el puerto: ${process.env.PORT} 🚀`);
})