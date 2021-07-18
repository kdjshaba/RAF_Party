import Unit from './models/Unit.js';
import Field from './models/Field.js';
import random from './utils/random.js';
import colors from './utils/colors.js';


let state = {
    eLoopId: 0
}
let el = document.createElement('div');
let content = document.createElement('div');
el.classList.add('test');
el.id = 'test';
el.style.height = '200px';
el.style.width = '200px';
el.style.position = 'relative';
content.classList.add('content');
content.id = 'content';
content.style.height = '200px';
content.style.width = '200px';
content.style.background = 'chartreuse';
content.style.position = 'absolute';
content.style.top = '50%';
content.style.left = '50%';
content.style.transform = 'translate(-50%, -50%)';
el.append(content);
document.body.append(el);

let gBox = document.getElementById('test');
let _BLOCK_SCALE = 4;
let _WIDTH = parseInt(gBox.style.width);
let _HEIGHT = parseInt(gBox.style.height);
let blockWidth = _WIDTH /_BLOCK_SCALE;
let blockHeight = _HEIGHT /_BLOCK_SCALE;
let box = document.getElementById('content');
let coords = [];
let lastFrame = null;
for (let i = 0; i < _BLOCK_SCALE; i++) {
    for (let j = 0; j < _BLOCK_SCALE; j++) {
        let top = i * blockWidth;
        let right = (j + 1) * blockHeight;
        let bottom = (i + 1) * blockWidth;
        let left = j * blockHeight;
        console.log(`top, right, bottom, left`, top, right, bottom, left);
        let new_coord = [top, right, bottom, left];
        coords.push(new_coord);
    }        
}

function run() {
    let delay = 200;
    if (lastFrame === null) lastFrame = Date.now();
    let thisFrame = Date.now();
    let _DIFF = thisFrame - lastFrame;
    if (coords.length === 0) {
        if (state.eLoopId !== null) {
            window.cancelAnimationFrame(state.eLoopId);
            state.eLoopId = null;
        }
        return;
    }
    state.eLoopId = window.requestAnimationFrame(run.bind(this));
    let clone = [...coords];
    let event = coords.shift();
    if (_DIFF < delay) {
        coords.unshift(event)
        return;
    } else  {
        console.log(event);
        box.style.clip = `rect(${event[0]}px,${event[1]}px,${event[2]}px,${event[3]}px)`;
    }
    // coords = [...clone];
    lastFrame = thisFrame;
}
run();















// let _HEIGHT = window.innerHeight;
// let _WIDTH = window.innerWidth;
// let _MAX_SIZE = 50;
// let _MAX_UNITS = 1000;
// let visibleArea = new Field(_HEIGHT, _WIDTH, _MAX_SIZE, _MAX_UNITS);
// document.body.append(visibleArea.domField);
// visibleArea.generateUnits();
// visibleArea.run();
