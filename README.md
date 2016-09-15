[![Coverage Status](https://coveralls.io/repos/github/Mac-lp3/ricketjs/badge.svg?branch=master)](https://coveralls.io/github/Mac-lp3/ricketjs?branch=master)


# ricketjs

Simple javascript framework for running executable files.

## Usage

When adding an executable to the chain, you can either specify a script descriptor:

~~~~
ricket.add({
    path: 'path\\to\\script.sh',
    args: ['these', 'are', 'optional'],
    before: function(args){ /* optional */ return args.push('additionalArg');},
    after: function(output){ /* optional */ console.log(output);}
}).run();
~~~~

Or just the absolute path:

~~~~
ricket.add('path\\to\\script.sh').run();
~~~~

The `add()` method is also chainable to simplify running multiple executables:

~~~~
ricket.add({
    path: 'shell\\script.sh',
    args: [true]
})
.add('path\\to\\next\\executable.sh').run();
~~~~

Ricketjs supports middleware functions with the `function(outputFromLast, next)` signature, where `next` is the next script or middle ware function in the chain.

~~~~
// outputFromLast will be null if this is the first on the chain
const validateFirst = function(outputFromLast, next) {
    
    // Edit / remove arguments before passing them on
    if (outputFromLast && outputFromLast.length > 0) {
        outputFromLast.push('worked!');
    }
    
    // pass arguments (or don't) into next
    next(outputFromLast);
};

ricket.add({
    path: 'path\\to\\executable.exe',
    args: ['gogogo']
})
.add(validateFirst)
.add('path\\to\\next\\executable.bat').run();
~~~~

## Configuration

~~~~
// options() also returns self
ricket.options({
    // options
});
~~~~

Ricketjs currently supports the following options:

* beforeEach (`function(arguments)`) - An easy way to insert a function into each existing script/middleware's before list. Note that before and after functions are inserted CLOSEST to the actual task to run, meaning `beforeEach()` will insert the function at the end of the before list 0.

* afterEach (`function(arguments)`) - An easy way to insert a function into each existing script/middleware's after list. Note that before and after functions are inserted CLOSEST to the actual task to run, meaning `afterEach()` will insert the function at position 0.

* errorHandler (`function(errorString)`) - The default error handler will simply throw all exceptions encountered or will throw custom messages depending on the nature of the error. If you would like errors to be logged in a specific way, you can specify a function to do so.

