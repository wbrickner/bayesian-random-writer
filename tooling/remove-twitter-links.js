const fs = require("fs")

let text = fs.readFileSync("../sources/25k-trump-tweets.txt", "utf8")

let twitterLinkRegExp = new RegExp(/(http|https):\/\/(t.co)\/[a-zA-Z0-9]+/, "g")

text = text.replace(twitterLinkRegExp, "")

fs.writeFileSync("../sources/25k-trump-tweets-no-links.txt", text, "utf8")