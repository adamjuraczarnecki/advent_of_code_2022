"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
// oponent:     A Rock B Paper C Scissors
// Me:          X Rock Y Paper Z Scissors
// Score:       1 Rock 2 Peper 3 Scissors for my choses
// and outcome: 0 lost 3 draw  6 win
var GameScore;
(function (GameScore) {
    GameScore[GameScore["lost"] = 0] = "lost";
    GameScore[GameScore["draw"] = 3] = "draw";
    GameScore[GameScore["win"] = 6] = "win";
})(GameScore || (GameScore = {}));
var Figure;
(function (Figure) {
    Figure[Figure["rock"] = 1] = "rock";
    Figure[Figure["paper"] = 2] = "paper";
    Figure[Figure["scissors"] = 3] = "scissors";
})(Figure || (Figure = {}));
const figureDescriptons = {
    A: Figure.rock,
    B: Figure.paper,
    C: Figure.scissors,
    X: Figure.rock,
    Y: Figure.paper,
    Z: Figure.scissors
};
function solution1(input) {
    const gameTree = {
        [Figure.rock]: {
            [Figure.rock]: GameScore.draw,
            [Figure.paper]: GameScore.win,
            [Figure.scissors]: GameScore.lost
        },
        [Figure.paper]: {
            [Figure.rock]: GameScore.lost,
            [Figure.paper]: GameScore.draw,
            [Figure.scissors]: GameScore.win
        },
        [Figure.scissors]: {
            [Figure.rock]: GameScore.win,
            [Figure.paper]: GameScore.lost,
            [Figure.scissors]: GameScore.draw
        }
    };
    return input.reduce((a, x) => {
        const [oponent, me] = [figureDescriptons[x.split(' ')[0]], figureDescriptons[x.split(' ')[1]]];
        return a + gameTree[oponent][me] + me;
    }, 0);
}
// oponent:     A Rock B Paper C Scissors
// I shuold:    X lose Y draw  Z win
// Score:       1 Rock 2 Peper 3 Scissors for my choses
// and outcome: 0 lost 3 draw  6 win
function solution2(input) {
    const GameResults = {
        'X': GameScore.lost,
        'Y': GameScore.draw,
        'Z': GameScore.win
    };
    const myFigure = {
        [Figure.rock]: {
            [GameScore.lost]: Figure.scissors,
            [GameScore.draw]: Figure.rock,
            [GameScore.win]: Figure.paper
        },
        [Figure.paper]: {
            [GameScore.lost]: Figure.rock,
            [GameScore.draw]: Figure.paper,
            [GameScore.win]: Figure.scissors
        },
        [Figure.scissors]: {
            [GameScore.lost]: Figure.paper,
            [GameScore.draw]: Figure.scissors,
            [GameScore.win]: Figure.rock
        }
    };
    return input.reduce((a, x) => {
        const [oponent, result] = [figureDescriptons[x.split(' ')[0]], GameResults[x.split(' ')[1]]];
        return a + result + myFigure[oponent][result];
    }, 0);
}
// boilerprint
function job(input) {
    // console.log(input)
    const span1 = document.querySelector('#answer1');
    const answer1 = solution1(input);
    span1.innerText = typeof answer1 == 'number' ? answer1.toString() : answer1;
    const span2 = document.querySelector('#answer2');
    const answer2 = solution2(input);
    span2.innerText = typeof answer2 == 'number' ? answer2.toString() : answer2;
}
document.querySelector('button').addEventListener('click', function () {
    if (document.body.contains(document.querySelector('select'))) {
        job(document.querySelector('textarea').value.split(singleLineSplit));
    }
    else {
        job(document.querySelector('textarea').value.split(singleLineSplit));
    }
});
const fileUrl = 'input.txt';
fetch(fileUrl)
    .then(r => r.text())
    .then(t => job(t.split(singleLineSplit)));
