// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

function solution1(input:string[]): (string|number){
  return input.reduce((a, x) => {return a + playOneGame(...x.split(' ')) },0)
}

function solution2(input:string[]):( string|number){
  return input.reduce((a, x) => {return a + playOtherGame(...x.split(' ')) },0)
}
// 
// oponent:     A Rock B Paper C Scissors
// Me:          X Rock Y Paper Z Scissors
// Score:       1 Rock 2 Peper 3 Scissors for my choses
// and outcome: 0 lost 3 draw  6 win

enum GameScore {
  lost = 0,
  draw = 3,
  win = 6
}

enum FigurePoint {
  rock = 1,
  paper = 2,
  scissors = 3
}

function playOneGame(oponent:string, me:string): number {
  const MyPoints = {
    'X' : FigurePoint.rock,
    'Y' : FigurePoint.paper,
    'Z' : FigurePoint.scissors
  }
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
  }

  return gameTree[oponent][me] + MyPoints[me]
}


// oponent:     A Rock B Paper C Scissors
// I shuold:    X lose Y draw  Z win
// Score:       1 Rock 2 Peper 3 Scissors for my choses
// and outcome: 0 lost 3 draw  6 win

function playOtherGame(oponent: string, me: string) {
  const GameResults = {
    'X': GameScore.lost,
    'Y': GameScore.draw,
    'Z': GameScore.win
  }

  const myFigure ={
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
  }

  return GameResults[me] + myFigure[oponent][me]
}


// boilerprint
function job(input:string[]): void {
  console.log(input)
  const span1 = document.querySelector('#answer1') as HTMLElement
  const answer1: (string|number) = solution1(input)
  span1.innerText = typeof answer1 == 'number' ? answer1.toString() : answer1
  const span2 = document.querySelector('#answer2') as HTMLElement
  const answer2: (string|number) = solution2(input)
  span2.innerText = typeof answer2 == 'number' ? answer2.toString() : answer2
}

document.querySelector('button').addEventListener('click', function() {
  if (document.body.contains(document.querySelector('select'))) {
      job(document.querySelector('textarea').value.split(singleLineSplit))
  } else {
      job(document.querySelector('textarea').value.split(singleLineSplit))
  }
})

const fileUrl = 'input.txt'
fetch(fileUrl)
  .then( r => r.text() )
  .then( t => job(t.split(singleLineSplit)))