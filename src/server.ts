import express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import { product } from './app/models/product';
import productsjson from './assets/products.json';

const app = express();
app.use(bodyParser.json());
app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true // forces an uninitialized session to be stored
}));

/* api */
app.get("/api/products", (req, res) => {
    if(req.session.products == undefined) {
        req.session.products = <product[]>[];
    }

    res.json(productsjson);
});

app.get("/api/products/:id", (req, res) => {


    if(req.session.products == undefined) {
        req.session.products = <product[]>[];
    }

    res.json(productsjson);
});

/* libs & assets */
app.use("/assets", express.static(path.join(__dirname, "/src/app/assets")));
app.use("/spectre", express.static(path.join(__dirname, "..", "/node_modules/spectre.css/dist")));

app.listen(3000, () => console.log("listening"));