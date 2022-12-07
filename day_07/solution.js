"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.device = exports.Device = void 0;
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
/* NOTES:

$ cd /                  <-- main dir
$ ls                    <-- command begins with $  cd change dir, ls list
dir a                   <-- output. prefix dir means directory
14848514 b.txt          <-- file named b.txt with size of 14848514
 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k

then calculate size of all dirs, and sum those with sise bigger than 100_000

{'/': { // 48381165 > 100_000 -> 0
  a: {  // 94853 < 100_000 -> 94853
    e: { // - 584 - more than 100_000 -> 584
      i: 584
    },
    f: 29116,
    g: 2557,
    h.lst: 62596
  },
  b.txt: 14848514,
  c.dat: 8504156,
  d: { // 24933642 > 100_000 -> 0
    j: 4060174,
    d.log: 8033020,
    d.ext: 5626152,
    k: 7214296
  }
}
return 94853 + 584 -> 95437

END OF NOTES */
class Device {
    filesystem;
    currentDir;
    dirSizes;
    constructor() {
        this.filesystem = { "/": {} };
        this.currentDir = [];
        this.dirSizes = [];
    }
    terminal(input) {
        const line = new Line(input);
        if (line.isCommmand) {
            this.executeComand(line);
        }
        else {
            this.parseOutput(line);
        }
    }
    executeComand(comand) {
        if (comand.line[1] === 'cd') {
            if (comand.line[2] == '..') {
                this.currentDir.pop();
            }
            else {
                this.currentDir.push(comand.line[2]);
            }
        }
    }
    parseOutput(output) {
        let currentDir = this.filesystem;
        this.currentDir.forEach(x => currentDir = currentDir[x]);
        if (output.line[0] === 'dir') {
            currentDir[output.line[1]] = {};
        }
        else {
            currentDir[output.line[1]] = parseInt(output.line[0]);
        }
    }
    du() {
        this.dirSizes = [];
        this.getSize(this.filesystem['/']);
        return this.dirSizes;
    }
    getSize(thin) {
        if (typeof thin === 'number') {
            return thin;
        }
        else {
            const dirSize = Object.values(thin).reduce((a, x) => a + this.getSize(x), 0);
            this.dirSizes.push(dirSize);
            return dirSize;
        }
    }
}
exports.Device = Device;
class Line {
    line;
    isCommmand;
    constructor(line) {
        this.line = line.split(' ');
        this.isCommmand = this.line[0] === '$';
    }
}
let device = new Device();
exports.device = device;
function solution1(input) {
    exports.device = device = new Device();
    input.forEach(line => device.terminal(line));
    return device.du().reduce((a, x) => { if (x < 100000) {
        return a + x;
    }
    else {
        return a;
    } }, 0);
}
// total space:   70_000_000
// needed unused: 30_000_000
// returrn size of smalest dir that if deleted releses missing space
// for tes input 24933642
//               24933642
function solution2(input) {
    const dirSizes = device.du().sort((a, b) => a - b);
    const missingSpace = 30000000 - (70000000 - dirSizes.at(-1));
    const dirsAmount = dirSizes.length;
    for (let i = 0; i < dirsAmount; i++) {
        if (dirSizes[i] >= missingSpace) {
            return dirSizes[i];
        }
    }
    return 'not found';
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
