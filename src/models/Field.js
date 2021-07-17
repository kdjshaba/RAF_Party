import Unit from './Unit.js';
import random from '../utils/random.js';
import colors from '../utils/colors.js';

export default class Field {
    constructor(height, width, unitSize) {
        this.units = [];
        this.maxUnits = 100;
        this.unitSize = unitSize;
        this.domField = null;
        this.height = height;
        this.width = width;
        this.previousAnimation = null;
        this.eLoopId = null;
        this.init();
    }
    init() {
        let _DOM = document.createElement('div');
        _DOM.setAttribute('id', 'domField');
        _DOM.style.height = '100vh';
        _DOM.style.width = '100vw';
        _DOM.style.position = 'relative';
        this.domField = _DOM;
        return this;
    }
    generateUnits() {
        for (let i = 0; i < this.maxUnits; i++) {
            let _X = random(0, this.width);
            let _Y = random(0, this.height);
            let _SIZE = random(5, this.unitSize);
            console.log(`width: `, _X, _Y)
            let _COLOR = colors[random(0, colors.length)];
            let unit = new Unit(_X, _Y, _SIZE, _COLOR);
            this.units.push(unit);
            this.domField.append(unit.createElement());
        }
    }
}