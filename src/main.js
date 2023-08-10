import express from 'express';
import {ProductManager} from './productManager.js';

const app = express();

const PORT = 4000;

const manager = new ProductManager('./src/productos.json');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hola esta es la página de inicio');
});

app.get('/productos/:id', async (req, res) => {
	const product = await manager.getProductById(parseInt(req.params.id));
	product ? res.send(product) : res.send('Producto no encontrado');
});

app.get('/productos', async (req, res) => {
	const { limit } = req.query;
	const products = await manager.getProducts();
	limit ? res.send(products.slice(0, limit)) : res.send(products);
});

//Ruta 404 es la ultima que se define

app.get('*', (req, res) => {
	res.send('Error 404');
});

app.listen(PORT, () => {
	console.log(`Server on PORT: ${PORT}
http://localhost:${PORT}`);
});