// Punto de entrada para la arquitectura hexagonal
const app = require('./infrastructure/config/app');

const port = app.get('port');
app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
