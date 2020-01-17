import * as express from 'express';
import * as products from './views/assets/products.json';
import * as cookieParser from 'cookie-parser';

var router = express.Router();

router.use(cookieParser());

router.get('/checkout', (req, res) => {
    res.render(__dirname + '/views/checkout.ejs', { products: products, total: req.session.cookie.cart.getTotal()});
});
router.get('/cart', (req, res) => {
    res.render(__dirname + '/views/cart.ejs', { products: products, total: req.session.cookie.cart.getTotal(), cart: req.session.cookie.cart.getCart().products});
});
router.get('/thanks', (req, res) => {
    res.render(__dirname + '/views/thanks.ejs', { products: products, total: req.session.cookie.cart.getTotal(), cart: req.session.cookie.cart.getCart().products});
});
router.get('/', (req, res) => {
    console.log(req.session.cookie.cart.getTotal());
    res.render(__dirname + '/views/home.ejs', { products: products, total: req.session.cookie.cart.getTotal()});
});
router.get('/home', (req, res) => {
    res.render(__dirname + '/views/home.ejs', { products: products, total: req.session.cookie.cart.getTotal()});
});
router.get('/product/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    res.render(__dirname + '/views/add.ejs', {product: product, total: req.session.cookie.cart.getTotal()});
});

router.post('/product/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    req.session.cookie.cart.addToCart(product);
    res.redirect('/home');
});

router.get('/products/getProduct/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    req.session.product = product;

    res.json(req.session.product);
});

router.get('/product/increment/:id', (req,res) => {
    const product = loadProduct(req.params.id);

    req.session.cookie.cart.incrementProductAmount(product);

    res.redirect('/views/cart');
})

router.get('/product/decrement/:id', (req,res) => {
    const product = loadProduct(req.params.id);

    req.session.cookie.cart.decrementProductAmount(product);

    res.redirect('/views/checkout');
});

router.get('/products/getJson', (req, res) => {
    res.json(products);
});

router.get('/views/checkout', (req, res) =>{
    res.render(__dirname + '/views/checkout.ejs', {products: req.session.cookie.cart.getCart().products,  total: req.session.cookie.cart.getTotal()});
});

router.get('/views/cart', (req, res) =>{
    res.render(__dirname + '/views/cart.ejs', {products: req.session.cookie.cart.getCart().products,  total: req.session.cookie.cart.getTotal()});
});
router.get('/views/thanks', (req, res) =>{
    res.render(__dirname + '/views/thanks.ejs', {products: req.session.cookie.cart.getCart().products,  total: req.session.cookie.cart.getTotal()});
});

function loadProduct(id: string){
    return products.find(p => p.id.toString() === id);
}

module.exports = router;