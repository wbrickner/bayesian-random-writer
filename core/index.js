const fs = require("fs")

function ensureNodeAndIncrement(word, node) {
    if (node[word] === undefined) {
        node[word] = {
            occurances: 1,
            children: { }
        }
    } else {
        node[word].occurances++
    }

    return node[word]
}

function buildProfile(wordSequence, windowSize) {
    let profile = { children: { } }
    ,   node = profile

    for (var j = 0, jlen = wordSequence.length; j < jlen; ++j) {
        node = profile

        innerLoop:
        for (var k = 0; k < windowSize; ++k) {
            let idx = j + k
            if (idx >= jlen) { break innerLoop }
            
            node = ensureNodeAndIncrement(wordSequence[idx], node.children)
        }
    }

    return profile
}

function infer(profile) {
    // TODO: "flip tree on it's head at every sub-tree"
    // i.e. using bayesian inference to expand our understanding of the language further
}

function randomWordWithDistribution(node) {
    // build an array of buckets based on the occurances,
    // then make a random number from 0 to (sum),
    // then loop through and see what bucket it is in

    let buckets = [ 0 ]
    ,   labels = [ ]
    ,   last = 0

    for (var key in node.children) {
        buckets.push(
            last += node.children[key].occurances
        )
        labels.push(key)
    }

    let r = last * Math.random()
    for (var j = 0, jlen = buckets.length; j < jlen; ++j) {
        // if it's inside this bucket, or if we're at the last bucket and haven't satisfied the condition,
        // then this is the bucket it is in.  Return the corresponding label.
        if (r >= buckets[j] && (j + 1 >= jlen || r < buckets[j + 1])) {
            return labels[j]
        }
    }
}

function findMostLikelyFromChildren(node) {
    let highestOccuranceValue = 0
    ,   highestOccuranceKey = ""

    for (var key in node.children) {
        if (node.children[key].occurances > highestOccuranceValue) {
            highestOccuranceValue = node.children[key].occurances
            highestOccuranceKey = key
        }
    }

    return highestOccuranceKey
}

function randomChild(node) {
    let keys = Object.keys(node.children)
    ,   randomKey = keys[Math.round(Math.random() * (keys.length - 1))]

    return randomKey
}

function generateText(profile, _startWord, length) {
    let startWord = _startWord

    if (!profile.children[startWord]) {
        console.log("Start word was either not provided, or not found in the statistical map.  Generating new start word from statistical map...")
        startWord = randomWordWithDistribution(profile)
    }

    let text = startWord
    ,   word = startWord
    ,   node = profile
    
    for (var j = 0; j < length; ++j) {
        // advance deeper into the tree
        node = node.children[word]
        // if we didn't get any suggestions (reached the deepest part of the tree along this path), then return to the top of the tree
        if (!Object.keys(node.children).length) {
            node = profile.children
        }

        word = randomWordWithDistribution(node)
        text += word
    }

    return text
}

module.exports = function BRW(absoluteInputPath, windowSize, length, seedWord) {
    console.info("Reading source material...")
    const sequence = fs.readFileSync(absoluteInputPath, "utf8")
                       .replace(/\s+/g, " ")
                       .split("")

    console.info("Building statistical profile...")
    let profile = buildProfile(sequence, windowSize || 5)

    // console.log(profile)

    console.info(`Generating ${length || 1000} words of text${seedWord ? ` with seed word "${seedWord}"` : ""}...`)
    let text = generateText(profile, seedWord, length || 1000)

    console.log("Generated Text:\n\t", text)
}