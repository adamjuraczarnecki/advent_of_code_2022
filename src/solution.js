"use strict";
function solution1(input) {
    return 'in progress';
}
function solution2(input) {
    return 'in progress';
}
// boilerprint
function job(input) {
    console.log(input);
    const span1 = document.querySelector('#answer1');
    span1.innerText = solution1(input);
    const span2 = document.querySelector('#answer2');
    span2.innerText = solution2(input);
}
document.querySelector('button').addEventListener('click', function () {
    if (document.body.contains(document.querySelector('select'))) {
        job(document.querySelector('textarea').value.split(/\r?\n/));
    }
    else {
        job(document.querySelector('textarea').value.split(/\r?\n/));
    }
});
const fileUrl = 'input.txt';
fetch(fileUrl)
    .then(r => r.text())
    .then(t => job(t.split(/\r?\n/)));
