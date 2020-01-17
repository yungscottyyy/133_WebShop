import * as express from 'express';
import * as path from 'path';
import * as router from './router';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';
import {Cart} from './Cart';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true, // forces an uninitialized session to be stored
    cookie:{ secure: true, cart: new Cart()}
}));


app.use('/', router);

/* libs & assets */
app.use("/assets", express.static(path.join(__dirname, "/views/assets")));
app.use("/spectre", express.static(path.join(__dirname, "..", "/node_modules/spectre.css/dist")));

app.listen(8080, () => console.log("listening"));