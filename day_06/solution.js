"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
// find start-of-packet marker which is 4 all diffrent chars
// return index of last char of sop
// mjqjpqmgbljsphdztnvjfqwrcgsmlb
// mjqj - no double j
// jpqm - yes - return 7
function hasDuplicates(list) {
    return list.some((char, index) => {
        return list.indexOf(char) !== index;
    });
}
function solution1(input, frame_length = 4) {
    const datastream = input[0].split('');
    const datastreanLen = datastream.length - frame_length;
    for (let i = 0; i < datastreanLen; i++) {
        const frame = datastream.slice(i, i + frame_length);
        // console.log(frame, !hasDuplicates(frame))
        if (!hasDuplicates(frame)) {
            return i + frame_length;
        }
    }
    return 'Not Found';
}
// same shit but frame has lenth of 14 chars
function solution2(input) {
    return solution1(input, 14);
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
