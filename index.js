#!/usr/bin/env node

const program = require("commander")
,     path = require("path")
,     BRW = require("./core")

program
  .version("1.0.0")
  .usage("[options] <sourcefile>")
  .option("-s, --seedchar [value]", "The seed character (first character in the generated text)")
  .option("-w, --windowsize [value]", "The window size (how many characters deep will be considered).  Warning: this consumes exponentially more memory.  Start with '-w 20' and see what your machine can handle.", parseInt)
  .option("-l, --length [value]", "The generated text length in characters", parseInt)
  .parse(process.argv)


if (!program.args[0]) { console.error("Error: no source file provided") }
else {
    BRW(path.join(process.cwd(), program.args[0]), program.windowsize, program.length, program.seedword)
}