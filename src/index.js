import Unit from './models/Unit.js';
import Field from './models/Field.js';
import random from './utils/random.js';
import colors from './utils/colors.js';


let _HEIGHT = window.innerHeight;
let _WIDTH = window.innerWidth;
let _MAX_SIZE = 25;
let _MAX_UNITS = 100;
let visibleArea = new Field(_HEIGHT, _WIDTH, _MAX_SIZE, _MAX_UNITS);
document.body.append(visibleArea.domField);
visibleArea.generateUnits();
visibleArea.run();