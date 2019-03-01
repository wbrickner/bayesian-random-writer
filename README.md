# Bayesian Random Writer

**This is a work in progress.  While the code works, the text in this document may be outdated with respect to the current state of the codebase.**

This project examines source text, splits that text into a sequence of tokens (generally words, but can be letters).

Then, a tree is built which describes how likely a token is to occur given that it occurs after another token, and so on, an arbitrary number of tokens deep.

Then, the tree is used to generate novel text given a seed token.  If no seed token is provided, one is generated using a statistical profile of token usage in the source text.

In the future, the writing style may be improved using more sophisticated statistical methods, i.e. Bayesian inference.  This is not yet implemented, and currently only uses the statistics taken direclty from the source material.

# Installation

```shell
$ git clone https://github.com/wbrickner/BayesianRandomWriter
```

A recent version of Node.js is required (tested with `v11.6.0`).

# Usage

```shell
$ ./index.js -v                  display version
             -w [--windowsize]   consecutive words to consider when building statistical profile
             -s [--seedword]     first word in the generated text
             -l --length         length of text to generate
             -m --memory         quantity of memory to allocate in MB
             
             <SourceFile.txt>    text file to analyze
```

## Example

Let's generate 100 words, mimicking the writing style of Donald Trump's tweets, while giving the process 8GB of memory:

```shell
$ ./index.js -w 12 -l 100 -m 8192 ./sources/25k-trump-tweets.txt
```

This provides the (interesting) output:

```
great--everybody misses him. Best wishes. .@NBC just announced that all 1 hour Roanoke,
Virginia on Saturday evening at 6pm! #MAGA https://t.co/uKG55Pznwu 
Will be on Rick is a fantastic governor. Even with lower profit projections, American firms
will attack @MittRomney's career at Bain Capital but won't return donations from no surprise.
I’ve been campaigning on it for years, and six months and fast economic retaliation against
China if our farmers, ranchers and/or industrial borders and up to the United States, with the
intention of entering the border and they're killing us on jobs and trade. FIGHT! We on
Celebrity All Star @ApprenticeNBC.
```

# Performance Considerations
The inefficiencies of this program can become serious. Optimizations may be made in the future, it depends how much time I have. 

Storing the statistical profile (an enormous tree) consumes a lot of memory.  Use the `-m [MB]` flag to allocate more memory to the underlying node process.  If not enough is available, decrease the window size (`-w [WindowSize]`).

# License

Copyright 2019 Will Brickner.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
