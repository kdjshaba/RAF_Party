import random from '../utils/random.js';

export default class Unit {
    constructor(x, y, size, color, scale) {
        this.top = x;
        this.left = y;
        this.size = size;
        this.color = color;
        this.position = 'absolute';
        this.borderRadius = `${random(25,50)}%`;
        this.length = random(1000, 1500);
        this.delay = random(50, 100);
        this.coords = [];
        this.scale = scale;
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
        newElement.onmouseenter = this.parseField.bind(this);
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
    explode(parent) {
        let els = parent.children;
        let buffer = this.size / 10;
        for (let i = 0; i < els.length; i++) {
            let randX = random(buffer, (this.size - buffer));
            let randY = random(buffer, (this.size - buffer));
            console.log(`rand`, randX, randY);
            console.log(`els[i]`, els[i].style.position);
            els[i].style.top = `${randX}%`;
            els[i].style.left = `${randY}%`;
            els[i].style.bottom = `${randX}%`;
            els[i].style.right = `${randY}%`;
        }
        parent.style.background = 'transparent';
        parent.style.border = 'none';
        parent.style.boxShadow = 'none';
        for (let i = 0; i < els.length; i++) {
            setTimeout(() => {
                els[i].style.opacity = 0;
            }, parseInt(i * 25))
        }
        // IMPLODE
        // for (let i = 0; i < 16; i++) {
        //     els[i].style.top = `0px`;
        //     els[i].style.left = `0px`;
        //     els[i].style.right = `0px`;
        //     els[i].style.bottom = `0px`;
        //     els[i].style.transform = 'translate(0)'
        // }
        // parent.style.backgroundColor = lastState.style.backgroundColor;
        // parent.style.border = lastState.style.border;
        // parent.style.boxShadow = lastState.style.boxShadow;
    }
    parseField() {
        let container = document.getElementById(this.element.id);
        let _WIDTH = parseInt(container.style.width);
        let _HEIGHT = parseInt(container.style.height);
        let blockWidth = _WIDTH / this.scale;
        let blockHeight = _HEIGHT / this.scale;
        let index = 0;
        for (let i = 0; i < this.scale; i++) {
            for (let j = 0; j < this.scale; j++) {
                let toClone = document.getElementById(this.element.id);
                let top = i * _WIDTH / this.scale;
                let right = (j + 1) * _HEIGHT / this.scale;
                let bottom = (i + 1) * _WIDTH / this.scale;
                let left = j * _HEIGHT / this.scale;
                let new_coord = [top, right, bottom, left];
                this.coords.push(new_coord);
                let block = toClone.cloneNode(true);
                block.style.border = '0';
                block.style.boxShadow = '0';
                block.style.transition = 'all .25s ease-in-out';
                block.style.position = 'absolute';
                block.setAttribute( 'id', `dyn-${index}`);
                block.classList.add('dyn-node');
                block.style.margin = '0';
                block.style.backgroundColor = container.style.backgroundColor;
                block.style.clip = `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`;
                container.appendChild(block);
                index++;
            }
        }
        this.explode(container);
    }
    clearField() {
        let els = [];
        for (let i = 0; i < Math.pow(this.scale, 2); i++) {
            let el = document.getElementById(`dyn-${i}`);
            els.push(el);
        }
        for (let i = 0; i < Math.pow(this.scale, 2); i++) {
            els[i].style.top = `50%`;
            els[i].style.left = `50%`;
            els[i].style.right = `50%`;
            els[i].style.bottom = `50%`;
        }
    }
}