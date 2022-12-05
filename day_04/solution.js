"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
// 2-4,6-8 - start-end of sector, secound elf
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7  <- first elf have sector, that contains whole sector of secoud elf. +1
// 6-6,4-6  <- secound elf have sector, that contains whole sector of pirst elf  
// 2-6,4-8
class Elf {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    isContainedByPair(pair) {
        return this.start >= pair.start && pair.end >= this.end;
    }
    hasOverlaps(pair) {
        return pair.start >= this.start && pair.start <= this.end;
    }
}
function createPair(pair) {
    const [elf1, elf2] = pair.split(',');
    return {
        elf1: new Elf(parseInt(elf1.split('-')[0]), parseInt(elf1.split('-')[1])),
        elf2: new Elf(parseInt(elf2.split('-')[0]), parseInt(elf2.split('-')[1]))
    };
}
function solution1(input) {
    const elfs = input.map(createPair);
    return elfs.reduce((a, pair) => {
        if (pair.elf1.isContainedByPair(pair.elf2) || pair.elf2.isContainedByPair(pair.elf1)) {
            a++;
        }
        return a;
    }, 0);
}
function solution2(input) {
    const elfs = input.map(createPair);
    return elfs.reduce((a, pair) => {
        if (pair.elf1.hasOverlaps(pair.elf2) || pair.elf2.hasOverlaps(pair.elf1)) {
            a++;
        }
        return a;
    }, 0);
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
