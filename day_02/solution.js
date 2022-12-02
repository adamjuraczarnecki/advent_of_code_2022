"use strict";
// usefull consts
const singleLineSplit = /\r?\n/;
const doubleLineSplit = /\r?\n\r?\n/;
function solution1(input) {
    return input.reduce((a, x) => { return a + playOneGame(...x.split(' ')); }, 0);
}
function solution2(input) {
    return input.reduce((a, x) => { return a + playOtherGame(...x.split(' ')); }, 0);
}
// 
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
var FigurePoint;
(function (FigurePoint) {
    FigurePoint[FigurePoint["rock"] = 1] = "rock";
    FigurePoint[FigurePoint["paper"] = 2] = "paper";
    FigurePoint[FigurePoint["scissors"] = 3] = "scissors";
})(FigurePoint || (FigurePoint = {}));
function playOneGame(oponent, me) {
    const MyPoints = {
        'X': FigurePoint.rock,
        'Y': FigurePoint.paper,
        'Z': FigurePoint.scissors
    };
    const gameTree = {
        'A': {
            'X': GameScore.draw,
            'Y': GameScore.win,
            'Z': GameScore.lost
        },
        'B': {
            'X': GameScore.lost,
            'Y': GameScore.draw,
            'Z': GameScore.win
        },
        'C': {
            'X': GameScore.win,
            'Y': GameScore.lost,
            'Z': GameScore.draw
        }
    };
    return gameTree[oponent][me] + MyPoints[me];
}
// oponent:     A Rock B Paper C Scissors
// I shuold:    X lose Y draw  Z win
// Score:       1 Rock 2 Peper 3 Scissors for my choses
// and outcome: 0 lost 3 draw  6 win
function playOtherGame(oponent, me) {
    const GameResults = {
        'X': GameScore.lost,
        'Y': GameScore.draw,
        'Z': GameScore.win
    };
    const myFigure = {
        'A': {
            'X': FigurePoint.scissors,
            'Y': FigurePoint.rock,
            'Z': FigurePoint.paper
        },
        'B': {
            'X': FigurePoint.rock,
            'Y': FigurePoint.paper,
            'Z': FigurePoint.scissors
        },
        'C': {
            'X': FigurePoint.paper,
            'Y': FigurePoint.scissors,
            'Z': FigurePoint.rock
        }
    };
    return GameResults[me] + myFigure[oponent][me];
}
// boilerprint
function job(input) {
    console.log(input);
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
