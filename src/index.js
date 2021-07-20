import Unit from './models/Unit.js';
import Field from './models/Field.js';
import random from './utils/random.js';
import colors from './utils/colors.js';

// let h = 200;
// let w = 200;

// // DOM INITIALIZATION
// // container element -> el
// let el = document.createElement('div');
// el.classList.add('test');
// el.id = 'test';
// el.style.height = `${h}px`;
// el.style.width = `${w}px`;
// el.style.position = 'relative';

// // content element -> content
// let content = document.createElement('div');
// content.classList.add('content');
// content.id = 'content';
// content.style.transition = 'all .5s ease-in-out';
// content.style.height = `${h}px`;
// content.style.width = `${w}px`;
// content.style.background = 'chartreuse';
// content.style.position = 'relative';
// content.style.top = '50%';
// content.style.left = '50%';
// // content.style.bottom = '50%';
// // content.style.right = '50%';
// content.style.transform = 'translate(-50%, -50%)';
// // build dom
// el.append(content);
// document.body.append(el);

// // ANIMATION
// // get container element
//     // this will be the whole dot
// let gBox = document.getElementById('test');
// // set scale and size variables
//     // this is a breakdown of the individual clips of each dot
// let _BLOCK_SCALE = 4;
// let _WIDTH = parseInt(gBox.style.width);
// let _HEIGHT = parseInt(gBox.style.height);
// console.log(`_HEIGHT, _WIDTH, _B_S`, _HEIGHT, _WIDTH, _BLOCK_SCALE);
// let blockWidth = _WIDTH / _BLOCK_SCALE;
// let blockHeight = _HEIGHT / _BLOCK_SCALE;
// console.log(`blockWidth, blockHeight`, blockWidth, blockHeight);
// // data store for animation queue
//     // function
// let coords = [];
// let index = 1;
// for (let i = 0; i < _BLOCK_SCALE; i++) {
//     for (let j = 0; j < _BLOCK_SCALE; j++) {
//         let toClone = document.getElementById('content');
//         let top = i * _WIDTH / _BLOCK_SCALE;
//         let right = (j + 1) * _HEIGHT / _BLOCK_SCALE;
//         let bottom = (i + 1) * _WIDTH / _BLOCK_SCALE;
//         let left = j * _HEIGHT / _BLOCK_SCALE;
//         let new_coord = [top, right, bottom, left];
//         coords.push(new_coord);
//         let block = toClone.cloneNode(true);
//         block.style.transition = 'all .25s ease-in-out';
//         block.style.position = 'absolute';
//         block.setAttribute( 'id', `dyn-${index}`);
//         block.classList.add('dyn-node');
//         block.style.margin = '0';
//         if (index % 2 === 0) {
//             block.style.background = 'goldenrod';
//         } else {
//             block.style.background = 'white';
//         }
//         block.style.clip = `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`;
//         content.appendChild(block);
//         index++;
//     }
// }
// content.onmouseenter = function addPad() {
    // let els = [];
    // let buffer = 10;
    // for (let i = 1; i <= Math.pow(_BLOCK_SCALE, 2); i++) {
    //     let el = document.getElementById(`dyn-${i}`);
    //     els.push(el);
    // }
    // for (let i = 0; i < Math.pow(_BLOCK_SCALE, 2); i++) {
    //     let rand = random(buffer, (_HEIGHT - buffer));
    //         console.log('loop test' + rand);
    //         els[i].style.top = `${rand}px`;
    //         els[i].style.left = `${rand}px`;
    //         els[i].style.bottom = `${rand}px`;
    //         els[i].style.right = `${rand}px`;
    //     }
    // }
// content.onmouseleave = function addPad() {
//     let els = [];
//     for (let i = 1; i <= Math.pow(_BLOCK_SCALE, 2); i++) {
//         let el = document.getElementById(`dyn-${i}`);
//         els.push(el);
//     }
//     for (let i = 0; i < Math.pow(_BLOCK_SCALE, 2); i++) {
//         els[i].style.top = `50%`;
//         els[i].style.left = `50%`;
//         els[i].style.right = `50%`;
//         els[i].style.bottom = `50%`;
//     }
// }
let state = {
    eLoopId: 0,
}
let lastFrame = null;
let coords = [];
let _HEIGHT = window.innerHeight;
let _WIDTH = window.innerWidth;
let _MAX_SIZE = 100;
let _MAX_UNITS = 10;
let visibleArea = new Field(_HEIGHT, _WIDTH, _MAX_SIZE, _MAX_UNITS);
document.body.append(visibleArea.domField);
visibleArea.generateUnits();
visibleArea.run();

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













