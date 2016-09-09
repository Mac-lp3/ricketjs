# ricketjs
Simple plug-and-play javascript framework for running executable files.

## Usage

~~~~
ricket.add({
    path: 'path\\to\\executable.exe',
    args: ['okok'], // optional
    before: function(args){ /* optional */ return args.push('additionalArg');},
    after: function(output){ /* optional */ console.log(output);}
}).run();
~~~~

The `add()` method is chainable and also accepts just a string path

~~~~
ricket.add({
    path: 'path\\to\\executable.exe',
    args: ['okok'], // optional
    before: function(args){ /* optional */ return args.push('additionalArg');},
    after: function(output){ /* optional */ console.log(output);}
})
.add('path\\to\\next\\executable.bat').run();
~~~~

Ricketjs also supports middleware functions. Just make sure they follow the `function(output, next)` signature.

~~~~
const validateFirst = function(outputFromLast, next) {
    
    if (outputFromLast && outputFromLast.length > 0) {
        outputFromLast.push('worked!');
    }
    
    next(outputFromLast);
};

ricket.add({
    path: 'path\\to\\executable.exe',
    args: ['okok']
})
.add(validateFirst)
.add('path\\to\\next\\executable.bat').run();
~~~~
