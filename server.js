const config = require("./config");
const express = require("express");
const https = require("https");
const {json} = require("body-parser");
const {readFileSync} = require("fs");
const request = require("request-promise-native");

let app = express();
let server = https.createServer({
	key: readFileSync(config.key),
	cert: readFileSync(config.cert)
}, app);

app.use(json());
app.use(express.static("public"));

function process(change) {
	if (change.field === "feed") {
		switch (change.value.item) {
			case "status":
			case "post":
				console.log("Post:", change.value);
				break;
			case "comment":
				console.log("Comment:", change.value);
				break;
		}
	}
}

// Webhook
app.get("/", (req, res) => {
	if (req.query["hub.mode"] === "subscribe") {
		console.log("VERIFY", req.query);

		if (req.query["hub.verify_token"] === config.verifyToken) {
			return res.end(req.query["hub.challenge"]);
		}
	}
	res.sendStatus(400);
});

app.post("/", (req, res) => {
	res.end();
	req.body.entry.forEach(e => e.changes.forEach(process));
});

// Este recurso es empleado por /auth.html, para crear
// la suscripción de la app en la página seleccionada
app.post("/install", async (req, res) => {
	try {
		let r = await request.post({
			uri: `https://graph.facebook.com/v4.0/${req.body.id}/subscribed_apps`,
			body: {
				access_token: req.body.access_token,
				subscribed_fields: "conversations,feed"
			},
			json: true
		});

		res.json(r);
	} catch (ex) {
		res.status(400).json(ex);
	}
});

server.listen(config.port);

console.log("Server started");
