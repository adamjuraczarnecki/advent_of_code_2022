"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
const lowercase = Array.from(Array(26)).map((e, i) => i + 97).map(x => String.fromCharCode(x));
function parseMap(input) {
    let start = [0, 0];
    let target = [0, 0];
    const chartDim = [input.length, input[0].length];
    const elevMap = Array(chartDim[0]).fill(0).map(_ => new Array(chartDim[1]));
    input.forEach((row, x) => {
        row.split('').forEach((square, y) => {
            if (square === 'S') {
                start = [x, y];
                elevMap[x][y] = lowercase.indexOf('a');
            }
            else if (square === 'E') {
                target = [x, y];
                elevMap[x][y] = lowercase.indexOf('z');
            }
            else {
                elevMap[x][y] = lowercase.indexOf(square);
            }
        });
    });
    return [start, target, chartDim, elevMap];
}
function getNeighbors([x, y], chartDim) {
    const offsets = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    const points = offsets.map(([dx, dy]) => [x + dx, y + dy]);
    return points.filter(point => point.every(x => x >= 0) && point[0] < chartDim[0] && point[1] < chartDim[1]);
}
function solution1(input) {
    const [start, end, charDim, elevMap] = parseMap(input);
    let queue = [[start, 0]];
    const visited = new Set();
    while (queue.length) {
        const [currentPoint, steps] = queue.shift();
        if (visited.has(currentPoint.toString())) {
            continue;
        }
        visited.add(currentPoint.toString());
        if (currentPoint.toString() === end.toString()) {
            return steps;
        }
        // just if current point isn't the tartet add to queue all possible next steps.
        // do it as long as you hit the target
        const neighbors = getNeighbors(currentPoint, charDim);
        const possibleValues = neighbors.filter(point => elevMap[point[0]][point[1]] <= elevMap[currentPoint[0]][currentPoint[1]] + 1);
        queue = queue.concat(possibleValues.map(point => [point, steps + 1]));
    }
    return 'Shortest path not found';
}
// find shortest path from any point with elevation 'a' (0)
// so in reverse, we can find shortest path from end to first 'a'
function solution2(input) {
    const [start, end, charDim, elevMap] = parseMap(input);
    let queue = [[end, 0]];
    const visited = new Set();
    while (queue.length) {
        const [currentPoint, steps] = queue.shift();
        if (visited.has(currentPoint.toString())) {
            continue;
        }
        visited.add(currentPoint.toString());
        if (elevMap[currentPoint[0]][currentPoint[1]] === 0) {
            return steps;
        }
        const neighbors = getNeighbors(currentPoint, charDim);
        const possibleValues = neighbors.filter(point => elevMap[point[0]][point[1]] >= elevMap[currentPoint[0]][currentPoint[1]] - 1);
        queue = queue.concat(possibleValues.map(point => [point, steps + 1]));
    }
    return 'Shortest path not found';
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
