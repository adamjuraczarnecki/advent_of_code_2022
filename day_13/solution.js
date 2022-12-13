"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
class Pair {
    l;
    r;
    constructor(input) {
        this.l = JSON.parse(input.split(singleLineSplit)[0]);
        this.r = JSON.parse(input.split(singleLineSplit)[1]);
    }
    test() {
        return test(this.l, this.r);
    }
}
function test(l, r) {
    const maxLength = Math.max(l.length, r.length);
    for (let i = 0; i < maxLength; i++) {
        const iL = l[i];
        const iR = r[i];
        if (iL === undefined) {
            return true;
        }
        if (iR === undefined) {
            return false;
        }
        if ([iL, iR].every(x => typeof x === 'number')) {
            if (iL > iR) {
                return false;
            }
            if (iL < iR) {
                return true;
            }
            continue;
        }
        if ([iL, iR].some(x => typeof x === 'number')) {
            return test(typeof iL === 'number' ? [iL] : iL, typeof iR === 'number' ? [iR] : iR);
        }
        const kwons = test(iL, iR);
        if (kwons !== undefined) {
            return kwons;
        }
    }
}
function solution1(input) {
    const pairs = input.split(doubleLineSplit).map(x => new Pair(x));
    return pairs.reduce((a, x, i) => a + (x.test() ? i + 1 : 0), 0);
}
// now sort lines in order with dividers and find indexes of thise dividers and multiply
function printLines(lines) {
    console.log(lines.map(line => JSON.stringify(line)).join('\n'));
}
function solution2(input) {
    const dividers = [[[2]], [[6]]];
    const lines = input.split(singleLineSplit).filter(x => x !== '').map(x => JSON.parse(x)).concat(dividers);
    lines.sort((a, b) => test(b, a) ? 1 : 0);
    printLines(lines);
    const strings = dividers.map(x => JSON.stringify(x));
    const indexes = [];
    lines.forEach((x, i) => {
        strings.forEach(s => {
            if (s === JSON.stringify(x)) {
                indexes.push(i + 1);
            }
        });
    });
    return indexes[0] * indexes[1];
}
// boilerprint
function job(input) {
    const lines = input.trim();
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
