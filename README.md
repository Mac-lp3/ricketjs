# ricketjs
Simple plug-and-play javascript framework for running executable files

## Usage
~~~~
ricket.add({
    path: 'path\\to\\executable.exe',
    args: ['okok'], // optional
    before: function(args){ /* optional */ return args.push('additionalArg');},
    after: function(output){ /* optional */ console.log(output);}
}).run();
~~~~
