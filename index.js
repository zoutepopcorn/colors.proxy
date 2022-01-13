import express from 'express';
const app = express();
const ERROR = '\x1b[31m%s\x1b[0m'; //red
const WARN = '\x1b[33m%s\x1b[0m'; //yellow
const INFO = '\x1b[36m%s\x1b[0m'; //cyan
const SUCCESS = '\x1b[32m%s\x1b[0m'; //green

const BASE = "https://registry.npmjs.org";

app.set('port', 9090);

const PATCH = new Map([
    ["colors.js",  {"from": "latest", "to": "1.4.1"}],
    ["faker.js",  {"from": "latest", "to": "5.5.3"}],
]);

console.log(PATCH.get("colors.js"));

const checkPatch = (name, version) => {
    console.log("checking====" + name + "===version==="+version + "===");
    const ITEM = PATCH.get(name)
    if(ITEM) {
        console.log(SUCCESS, "PATCH ", name, "@", version);
        if(ITEM.from === "latest") {
            return `${BASE}/${name}/-/${name}-${ITEM.to}.tgz`;
        }
    } else {
        console.log(WARN, "NO PATCH", name, "@", version);
        return false;
    }
}

app.get('*', (request, response) => {
    const P = request.path;
    console.log(ERROR, P);
    // example version "/methods/-/methods-1.0.1.tgz", example latest "/dashdash"
    const PARTS = P.split("/");
    const NAME = PARTS[1];
    let VERSION = "latest";

    if(PARTS.length > 3) {
        // input: methods-1.0.1.tgz
        VERSION = PARTS[3].split("-")[1].replace(".tgz", "");
    }
    console.log(VERSION);

    const PATCH = checkPatch(NAME, VERSION)
    let outUrl
    if(PATCH) {
        outUrl = PATCH;
    } else {
        outUrl = BASE + P;
    }

    response.redirect(301, outUrl);
});

app.listen(app.get('port'), () => {
    console.log(SUCCESS, "colors.proxy is running on port :" + app.get('port'))
    console.log(INFO, "sorry I'm not using colors.js for now");
})