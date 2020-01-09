import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import { Hero } from "./types";

const app = express();
app.use(bodyParser.json());
app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true // forces an uninitialized session to be stored
}));

/* frontend */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});
app.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/add.html"));
});

/* api */
app.get("/api/heroes", (req, res) => {
    if(req.session.heroes == undefined) {
        req.session.heroes = <Hero[]>[];
    }

    res.json(req.session.heroes);
});
app.post("/api/heroes", (req, res) => {
    req.session.heroes = <Hero[]>[
        ...req.session.heroes,
        <Hero>req.body
    ];

    res.sendStatus(200);
})

/* libs & assets */
app.use("/assets", express.static(path.join(__dirname, "/views/assets")));
app.use("/spectre", express.static(path.join(__dirname, "..", "/node_modules/spectre.css/dist")));

app.listen(8080, () => console.log("listening"));