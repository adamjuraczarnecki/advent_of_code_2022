// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

// oponent:     A Rock B Paper C Scissors
// Me:          X Rock Y Paper Z Scissors
// Score:       1 Rock 2 Peper 3 Scissors for my choses
// and outcome: 0 lost 3 draw  6 win

enum GameScore {
  lost = 0,
  draw = 3,
  win = 6
}

enum Figure {
  rock = 1,
  paper = 2,
  scissors = 3
}

const figureDescriptons: Record<string, Figure> = {
  A: Figure.rock,
  B: Figure.paper,
  C: Figure.scissors,
  X: Figure.rock,
  Y: Figure.paper,
  Z: Figure.scissors
}

function solution1(input:string[]): (string|number){
  const gameTree: Record<Figure, Record<Figure, GameScore>> = {
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
  }

  return input.reduce((a, x) => {
    const [oponent, me] = [figureDescriptons[x.split(' ')[0]], figureDescriptons[x.split(' ')[1]]];
    return a + gameTree[oponent][me] + me
  },0)
}

// oponent:     A Rock B Paper C Scissors
// I shuold:    X lose Y draw  Z win
// Score:       1 Rock 2 Peper 3 Scissors for my choses
// and outcome: 0 lost 3 draw  6 win

function solution2(input:string[]):( string|number){
  const GameResults:Record<string, GameScore>  = {
    'X': GameScore.lost,
    'Y': GameScore.draw,
    'Z': GameScore.win
  }

  const myFigure:Record<Figure, Record<GameScore, Figure>>  = {
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
  }
  return input.reduce((a, x) => {
    const [oponent, result] = [figureDescriptons[x.split(' ')[0]], GameResults[x.split(' ')[1]]];
    return a + result + myFigure[oponent][result]
  },0)
}


// boilerprint
function job(input:string[]): void {
  // console.log(input)
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