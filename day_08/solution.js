"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
// 30373    every digit one tree, value means height bigger higher
// 25512    tree is visible when if trees betwen it and an edge are shorter
// 65332    all trees at the edge are visible, bo blockers
// 33549    
// 35390
// 
// 11111
// 11101
// 11011
// 10101
// 11111
// return sum of visible trees  --> 21
function printVisMap(visMap) {
    console.log(visMap.map(row => row.map(x => x.toString()).join('')).join('\n'));
}
function seenTrees(direction, tree) {
    const dirLen = direction.length;
    for (let i = 0; i < direction.length; i++) {
        if (direction[i] >= tree) {
            return i + 1;
        }
    }
    return direction.length;
}
function solution(input) {
    const forest = input.map(x => x.split('').map(t => parseInt(t)));
    const forDim = [forest[0].length, forest.length]; // [x, y]
    const visMap = forest.map(row => new Array(forDim[0]).fill(1)); // if visable --> 1
    const scenic_scores = [];
    // const sceMap: number[][] = forest.map(row => new Array(forDim[0]).fill(0)) // not usfull, maby for visualisation, or just for fun 
    for (let row = 1; row < forDim[1] - 1; row++) { // start with 1, becouse edges are always visable
        for (let col = 1; col < forDim[0] - 1; col++) { // ends with lenth-1 same reason
            const currentTree = forest[row][col];
            const top = forest.slice(0, row).map(row => row[col]);
            const bot = forest.slice(row + 1).map(row => row[col]);
            const lef = forest[row].slice(0, col);
            const rig = forest[row].slice(col + 1);
            const isInvisible = [top, bot, lef, rig].map(dir => dir.some(tree => tree >= currentTree)).every(dir => dir);
            if (isInvisible) {
                visMap[row][col] = 0;
            }
            else {
                const seen_top = seenTrees(top.reverse(), currentTree);
                const seen_bot = seenTrees(bot, currentTree);
                const seen_lef = seenTrees(lef.reverse(), currentTree);
                const seen_rig = seenTrees(rig, currentTree);
                const scenic_score = seen_top * seen_bot * seen_lef * seen_rig;
                scenic_scores.push(scenic_score);
                // sceMap[row][col] = scenic_score
                // if(scenic_score===268800 || (row===3&&col===2)){
                //   console.log(`${row}/${col} tree: ${currentTree}`)
                //   console.log(`${seen_top} * ${seen_lef} * ${seen_bot} * ${seen_rig} = ${scenic_score}`)
                //   console.log(`[${top}] [${lef}] [${bot}] [${rig}]`)
                //   console.log(`[${top.slice(0, seen_top)}] [${lef.slice(0, seen_lef)}] [${bot.slice(0, seen_bot)}] [${rig.slice(0, seen_rig)}]`)
                //   console.log(`[${top.slice(0, seen_top).length}] [${lef.slice(0, seen_lef).length}] [${bot.slice(0, seen_bot).length}] [${rig.slice(0, seen_rig).length}]`)
                // }
            }
        }
    }
    // printVisMap(visMap)
    return [visMap.reduce((a, row) => a + row.reduce((q, tree) => q + tree), 0), Math.max(...scenic_scores)];
}
// scenic score is how many trees is ceen from top of tree
// count trees smaller from tree in each directions and multiply
// find tree with max scenic score
// 1553256 too high
// 268800
// boilerprint
function job(input) {
    const lines = input.trim().split(singleLineSplit);
    const span1 = document.querySelector('#answer1');
    const [answer1, answer2] = solution(lines);
    span1.innerText = typeof answer1 == 'number' ? answer1.toString() : answer1;
    const span2 = document.querySelector('#answer2');
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
