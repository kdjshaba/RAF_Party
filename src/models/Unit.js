import random from '../utils/random.js';

export default class Unit {
    constructor(x, y, size, color, borderRadius) {
        this.top = x;
        this.left = y;
        this.size = size;
        this.color = color;
        this.position = 'absolute';
        this.borderRadius = borderRadius || '50%';
        this.delay = random(50, 250);
    }
    createElement() {
        let newElement = document.createElement('div');
        newElement.style.position = 'absolute';
        newElement.style.top = `${this.top}px`;
        newElement.style.left = `${this.left}px`;
        newElement.style.height = `${this.size}px`;
        newElement.style.width = `${this.size}px`;
        newElement.style.backgroundColor = this.color;
        newElement.style.borderRadius = this.borderRadius;
        return newElement;
    }
}