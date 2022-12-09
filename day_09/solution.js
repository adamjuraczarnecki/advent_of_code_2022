"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
// head and tail must always touching
// If head moved 2 fields straight tail must also move one step it head direction
// ......
// ......
// ......
// ......
// H.....
// R 4 moves are made one by one.
// U 4 this means 4 steps u one after one
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2
// 6456 to low
const Direction = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, -1],
    D: [0, 1]
};
class Rope {
    x;
    y;
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    oneStep(direction) {
        this.x += direction[0];
        this.y += direction[1];
    }
    follow(head) {
        const distance = Math.max(Math.abs(this.x - head.x), Math.abs(this.y - head.y));
        if (distance > 1) {
            const directionX = head.x - this.x;
            const directionY = head.y - this.y;
            this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
            this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        }
    }
    snap() {
        return `${this.x}-${this.y}`;
    }
}
function solution1(input) {
    const tailsBeen = new Set();
    const head = new Rope();
    const tail = new Rope();
    tailsBeen.add(tail.snap());
    input.forEach(x => {
        const direction = Direction[x.split(' ')[0]];
        const moves = parseInt(x.split(' ')[1]);
        for (let i = 0; i < moves; i++) {
            head.oneStep(direction);
            tail.follow(head);
            tailsBeen.add(tail.snap());
        }
    });
    return tailsBeen.size;
}
function solution2(input) {
    const ropes = new Array(10).fill(0).map(x => new Rope());
    const tailsBeen = new Set();
    tailsBeen.add('0-0');
    input.forEach(x => {
        const direction = Direction[x.split(' ')[0]];
        const moves = parseInt(x.split(' ')[1]);
        for (let i = 0; i < moves; i++) {
            ropes[0].oneStep(direction); // head
            for (let rope_i = 1; rope_i < ropes.length; rope_i++) {
                ropes[rope_i].follow(ropes[rope_i - 1]);
            }
            tailsBeen.add(ropes.at(-1).snap());
        }
    });
    return tailsBeen.size;
}
// boilerprint
function job(input) {
    const lines = input.trim().split(singleLineSplit);
    const span1 = document.querySelector('#answer1');
    const answer1 = solution1(lines);
    span1.innerText = typeof answer1 == 'number' ? answer1.toString() : answer1;
    const span2 = document.querySelector('#answer2');
    const answer2 = solution2(lines);
    span2.innerText = typeof answer2 == 'number' ? answer2.toString() : answer2;
}
document.querySelector('button').addEventListener('click', function () {
    if (document.body.contains(document.querySelector('select'))) {
        job(document.querySelector('textarea').value);
    }
    else {
        job(document.querySelector('textarea').value);
    }
});
const fileUrl = 'input.txt';
fetch(fileUrl)
    .then(r => r.text())
    .then(t => job(t));
