"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 
// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2  move one caret at once.
// after all moves stacks looks likt this:
//         [Z]
//         [N]
//         [D]
// [C] [M] [P]
//  1   2   3
// message: CMZ
class Stacks {
    stacks;
    constructor(input) {
        let splitedInput = input.split(singleLineSplit);
        splitedInput = splitedInput.reverse();
        const stacktsNumbers = splitedInput?.shift()?.trim()?.split('   ')?.map(x => parseInt(x)) ?? [0];
        const numberOfStacks = stacktsNumbers.length;
        this.stacks = {};
        stacktsNumbers.forEach(x => this.stacks[x] = []);
        const initialMaxStackSize = splitedInput.length;
        for (let i = 0; i < initialMaxStackSize; i++) {
            for (let s = 0; s < numberOfStacks; s++) {
                const caret = splitedInput[i][1 + s * 4];
                if (caret != ' ') {
                    this.stacks[stacktsNumbers[s]].push(caret);
                }
            }
        }
    }
    executeStep(step) {
        const instruction = step.split(' ');
        const moves = parseInt(instruction[1]);
        const from = parseInt(instruction[3]);
        const target = parseInt(instruction[5]);
        for (let i = 0; i < moves; i++) {
            const caret = this.stacks[from].pop() ?? ' ';
            this.stacks[target].push(caret);
        }
    }
    CrateMover9001(step) {
        const instruction = step.split(' ');
        const carets = parseInt(instruction[1]);
        const from = parseInt(instruction[3]);
        const target = parseInt(instruction[5]);
        const stackHeight = this.stacks[from].length;
        const caretsToMove = this.stacks[from].splice(stackHeight - carets, stackHeight);
        this.stacks[target] = this.stacks[target].concat(caretsToMove);
        // debugger
    }
    getMessage() {
        let message = '';
        Object.values(this.stacks).forEach(stack => message += stack.at(-1));
        return message;
    }
}
function solution1(input) {
    const stacks = new Stacks(input[0]);
    const steps = input[1].split(singleLineSplit);
    steps.forEach(x => stacks.executeStep(x));
    console.log(stacks);
    return stacks.getMessage();
}
//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 
// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2  move x at once from y to z.
// after all moves stacks looks likt this:
//         [D]
//         [N]
//         [Z]
// [M] [C] [P]
//  1   2   3
// message: MCD
function solution2(input) {
    const stacks = new Stacks(input[0]);
    const steps = input[1].split(singleLineSplit);
    steps.forEach(x => stacks.CrateMover9001(x));
    console.log(stacks);
    return stacks.getMessage();
}
// boilerprint
function job(input) {
    const lines = input.trimEnd().split(doubleLineSplit);
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
