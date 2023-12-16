const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working

const app = express();
const PORT = 3000; // Wählen Sie den gewünschten Port

app.use(bodyParser.json());


const dataFilePath = 'entries.json';

app.get('/entries',authenticationMiddleware, function (req, res) {
    console.log("hi")
    fs.readFile(dataFilePath, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});

// GET /:slug
app.get('/:slug', (req, res) => {
    console.log("hO");
    const { slug } = req.params;
    fs.readFile(dataFilePath, "utf8", function (err, data) {
        ob = JSON.parse(data)
        console.log(ob)
        if (ob[slug]) {
            res.redirect(ob[slug]);
        }
        else {
            res.writeHead(404, {})
            res.end("not found");
        }
    });

});




// DELETE /entry/:slug
app.delete('/entry/:slug', (req, res) => {
    const { slug } = req.params;
    console.log("hiiiii")
    fs.readFile(dataFilePath, "utf8", function (err, data) {
        console.log(slug)
        let dataAsObject = JSON.parse(data);
        if (dataAsObject[slug]){
        delete dataAsObject[slug]}
        fs.writeFile(dataFilePath, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

// POST /entry
app.post('/entry', (req, res) => {
    const  url = req.body.url
    const slug = req.body.slug
    // Wenn keine Slug mitgegeben wird, generiere eine zufällige
    const generatedSlug = slug || generateRandomSlug();

    fs.readFile(dataFilePath, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        console.log(url)
        console.log(generatedSlug)
        dataAsObject[generatedSlug] = url;
g
        fs.writeFile(dataFilePath, JSON.stringify(dataAsObject), () => {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(JSON.stringify(dataAsObject));
    });
    });
    });

    // Beispiel-Authentifizierungsmiddleware
    function authenticationMiddleware(req, res, next) {
        const tokenr = req.headers.authorization; // Corrected typo in "authorization"
        const token = process.env.BEARER_TOKEN;
        console.log("in authenticate");
        console.log(token);
        console.log(tokenr);
    
        if (("Bearer "+token) === tokenr) { // Use strict equality (===) for comparison
    
            next();
        } else {
            res.writeHead(401, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify({ error: "Forbidden" })); // Send a JSON response with an error message
        }
    } 


    // Funktion zum Generieren einer zufälligen Slug
    function generateRandomSlug() {
        return Math.random().toString(36).substring(2, 8);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
