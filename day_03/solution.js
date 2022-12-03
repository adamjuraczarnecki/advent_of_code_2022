"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
// vJrwpWtwJgWrhcsFMMfFFhFp - one backpack
// vJrwpWtwJgWr one compartnemt (half) 
// hcsFMMfFFhFp
// find letter (p) present in both halves, find index of this letter on alphabet +1 (16) and sum
const lowercase = Array.from(Array(26)).map((e, i) => i + 97).map(x => String.fromCharCode(x));
const uppercase = Array.from(Array(26)).map((e, i) => i + 65).map(x => String.fromCharCode(x));
const alphabet = lowercase.concat(uppercase);
// console.log(alphabet)
function solution1(input) {
    const prioritys = input.map(x => {
        const len = x.length;
        const half1 = x.substring(0, len / 2);
        const half2 = x.substring(len / 2);
        for (let i = 0; i < len / 2; i++) {
            if (half2.includes(half1[i])) {
                return alphabet.indexOf(half1[i]) + 1;
            }
        }
        return 0;
    });
    return prioritys.reduce((a, x) => a + x, 0);
}
// vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// one group is 3 lines
// find letter (r) present in every 3 lines, find index of this letter on alphabet +1 (18) and sum
function chunArrayToListOfn(array, n) {
    return array.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / n);
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
    }, []);
}
function solution2(input) {
    const groups = chunArrayToListOfn(input, 3);
    const prioritys = groups.map(group => {
        group.sort((g1, g2) => g1.length - g2.length);
        const len = group[0].length;
        for (let i = 0; i < len; i++) {
            const theLetter = group[0][i];
            if (group[1].includes(theLetter) && group[2].includes(theLetter)) {
                return alphabet.indexOf(theLetter) + 1;
            }
        }
        return 0;
    });
    return prioritys.reduce((a, x) => a + x, 0);
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
