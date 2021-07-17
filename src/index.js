import Unit from './models/Unit.js';
import Field from './models/Field.js';
import random from './utils/random.js';
import colors from './utils/colors.js';


let _HEIGHT = window.innerHeight;
let _WIDTH = window.innerWidth;
let _MAX_SIZE = 25;
let _MAX_UNITS = 100;


let visibleArea = new Field(_HEIGHT, _WIDTH, _MAX_SIZE);
document.body.append(visibleArea.domField);
visibleArea.generateUnits();














// function generateUnits(height, width, maxSize, num) {
//     let array = []
//     for (let i = 0; i < num; i++) {
//         let x = random(100, height);
//         let y = random(100, width);
//         let size = random(0, maxSize);
//         // console.log(`x, y, size`, x, y, size);
//         let newUnit = new Unit(x, y, size, 'white');
//         console.log(`newUnit`, newUnit)
//         let child = document.createElement('div');
//         child.style.backgroundColor = newUnit.color;
//         child.style.position = newUnit.position;
//         child.style.top = `${newUnit.top}px`;
//         child.style.left = `${newUnit.left}px`;
//         child.style.height = `${newUnit.size}px`;
//         child.style.width = `${newUnit.size}px`;
//         child.style.borderRadius = newUnit.borderRadius;
//     }
//     return array;

// }