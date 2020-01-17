import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as Mustache from "mustache";
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
    sendTemplate("master.html", "home.html", {})
        .then(rendered => res.send(rendered));
});
app.get("/add", (req, res) => {
    sendTemplate("master.html", "add.html", {})
        .then(rendered => res.send(rendered));
});
const sendTemplate = (masterPage: string, contentPage: string, obj: any) => {
    return new Promise((resolve) => {
        fs.readFile(path.join(__dirname, "views", masterPage), "utf8", (err, master) => {
            fs.readFile(path.join(__dirname, "views", contentPage), "utf8", (err, content) => {
                resolve(Mustache.render(master, {}, { pageConent: content }));
            });
        });
    });    
}

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