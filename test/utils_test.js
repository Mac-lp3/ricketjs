'use strict';

const assert = require('assert');
const utils = require('../js/utils');

describe('utils', function() {
    
    describe('#getBaseFileName()', function() {

        it('Should return file name, without path', function() {
        	
        	let e = undefined;
            let fullPath = 'path\\to\\executable.exe';
            let targetName = 'executable.exe';

            let returned = '';
        	
        	try {

               returned = utils.getBaseFileName(fullPath, true);

            } catch (ex) {

            	e = ex;
                console.log(e);
            	
            }

            assert(e == undefined);
            assert(returned === targetName);

            targetName = 'executable';
            returned = '';

            try {

               returned = utils.getBaseFileName(fullPath);

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);
            assert(returned === targetName);
            
        });
    });
});