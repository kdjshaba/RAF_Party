import random from '../utils/random.js';

export default class Unit {
    constructor(x, y, size, color, borderRadius) {
        this.top = x;
        this.left = y;
        this.size = size;
        this.color = color;
        this.position = 'absolute';
        this.borderRadius = borderRadius || '50%';
        this.length = (random(100, 500))
        this.delay = random(50, 100);
    }
    createElement() {
        let newElement = document.createElement('div');
        newElement.classList.add('node');
        newElement.style.position = 'absolute';
        newElement.style.top = `${this.top}px`;
        newElement.style.left = `${this.left}px`;
        newElement.style.height = `${this.size}px`;
        newElement.style.width = `${this.size}px`;
        newElement.style.backgroundColor = this.color;
        newElement.style.borderRadius = this.borderRadius;
        this.element = newElement;
        return newElement;
    }
    show() {
        console.log('show');
        if (this.element.classList.contains('hide')) {
            this.element.classList.remove('hide')
        }
        this.element.classList.add('show');
    }
    hide() {
        console.log('hide');
        if (this.element.classList.contains('show')) {
            this.element.classList.remove('show')
        }
        this.element.classList.add('hide');
    }
}