import Unit from './Unit.js';
import random from '../utils/random.js';
import colors from '../utils/colors.js';

export default class Field {
    constructor(height, width, unitSize, maxUnits) {
        this.units = [];
        this.events = [];
        this.loop = true;
        this.maxUnits = maxUnits || 100;
        this.unitSize = unitSize;
        this.domField = null;
        this.height = height;
        this.width = width;
        this.eLoopId = 0;
        this.visibleNodes = [];
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
            let _COLOR = colors[random(0, colors.length)];
            let unit = new Unit(_X, _Y, _SIZE, _COLOR, 4);
            let _NODE = unit.createElement(i);
            this.units.push(unit);
            this.domField.append(_NODE);
        }
    }
    wipeScreen() {
        while (this.events.length > 0) {
            let event = this.events.shift();
            event.event.hide();
            this.kill();
        }
    }
    run() {
        if (!this.previousAnimation) this.previousAnimation = Date.now();
        let thisFrame = Date.now();
        let _DIFF = thisFrame - this.previousAnimation;
        if (this.units.length === 0) {
            if (this.loop === true) {
                this.units = this.events;
                return;
            }
            this.wipeScreen();
            return;
        }
        this.eLoopId = window.requestAnimationFrame(this.run.bind(this));
        let queue = [...this.units];
        let event = queue.shift();
        let delay = event.delay;
        if (_DIFF < delay) return;
        else {
            let eventObject = {
                id: this.eLoopId,
                event: event,
                start: thisFrame,
                stop: thisFrame + event.length,
                delay: event.delay,
                length: event.length
            }
            this.events.push(eventObject);
            event.show();
        }
        let calledEvents = [];
        if (this.events.length > 0) {
            calledEvents = [...this.events];
            let calledEvent = calledEvents.shift()
            if (thisFrame >= calledEvent.stop) {
                calledEvent.event.hide();
            } else {
                calledEvents.unshift(calledEvent)
            }
        }
        this.units = queue;
        this.events = calledEvents;
        this.previousAnimation = thisFrame;
    }
    kill() {
        if (this.eLoopId !== null) {
            window.cancelAnimationFrame.bind(this);
            this.eLoopId = null;
        }
        return this;
    }
}