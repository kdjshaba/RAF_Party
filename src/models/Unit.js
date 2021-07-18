import random from '../utils/random.js';

export default class Unit {
    constructor(x, y, size, color) {
        this.top = x;
        this.left = y;
        this.size = size;
        this.color = color;
        this.position = 'absolute';
        this.borderRadius = `${random(25,50)}%`;
        this.length = random(1000, 1500);
        this.delay = random(50, 100);
    }
    createElement(int) {
        let newElement = document.createElement('p');
        newElement.classList.add('node');
        newElement.style.position = 'absolute';
        newElement.style.top = `${this.top}px`;
        newElement.style.left = `${this.left}px`;
        newElement.style.height = `${this.size}px`;
        newElement.style.width = `${this.size}px`;
        newElement.style.backgroundColor = this.color;
        newElement.style.borderRadius = this.borderRadius;
        newElement.id = `node-${int}`;
        newElement.onmouseenter = this.explode.bind(this);
        this.element = newElement;
        return newElement;
    }
    show() {
        if (this.element.classList.contains('hide')) {
            this.element.classList.remove('hide')
        }
        this.element.classList.add('show');
    }
    hide() {
        if (this.element.classList.contains('show')) {
            this.element.classList.remove('show')
        }
        this.element.classList.add('hide');
    }
    obliterate() {
        let el = document.getElementById(this.element.id);
        document.remove(el);
    }
    explode() {
        console.log('hovered');
        let container = document.getElementById(this.element.id);
        let _BLOCK_SCALE = 4;
        let _WIDTH = parseInt(container.style.width);
        let _HEIGHT = parseInt(container.style.height);
        console.log(`_HEIGHT, _WIDTH, _B_S`, _HEIGHT, _WIDTH, _BLOCK_SCALE);
        let blockWidth = _WIDTH / _BLOCK_SCALE;
        let blockHeight = _HEIGHT / _BLOCK_SCALE;
        console.log(`blockWidth, blockHeight`, blockWidth, blockHeight);
    }
}