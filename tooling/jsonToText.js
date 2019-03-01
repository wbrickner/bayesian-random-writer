const fs = require("fs")

let tweets = JSON.parse(fs.readFileSync("./trump.json"))
let text = ""

for (var j = 0, jlen = tweets.length; j < jlen; ++j) {
    text += tweets[j].text + "\n"
}

fs.writeFileSync("./trump.txt", text, "utf8")