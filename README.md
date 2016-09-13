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

Or just the relative path:

~~~~
ricket.add('path\\to\\script.sh').run();
~~~~

The `add()` method is also chainable to simplify running multiple executables:

~~~~
ricket.add({
    path: 'path\\to\\executable.exe',
    args: ['okok'], // optional
    before: function(args){ /* optional */ return args.push('additionalArg');},
    after: function(output){ /* optional */ console.log(output);}
})
.add('path\\to\\next\\executable.bat').run();
~~~~

Ricketjs supports middleware functions with the `function(outputFromLast, next)` signature, where `next` is the next script or middle ware function in the chain.

~~~~
// outputFromLast will be null if this is the first on the chain
const validateFirst = function(outputFromLast, next) {
    
    if (outputFromLast && outputFromLast.length > 0) {
        outputFromLast.push('worked!');
    }
    
    // Edit / remove arguments before passing them on
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

