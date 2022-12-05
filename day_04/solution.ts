// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

// 2-4,6-8 - start-end of sector, secound elf
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7  <- first elf have sector, that contains whole sector of secoud elf. +1
// 6-6,4-6  <- secound elf have sector, that contains whole sector of pirst elf  
// 2-6,4-8

class Elf {
  start: number
  end: number
  constructor(start: number, end: number){
    this.start = start
    this.end = end
  }
  isContainedByPair(pair: Elf): boolean{
    return this.start >= pair.start && pair.end >= this.end
  }
  haveOverlaps(pair: Elf): boolean{
    return pair.start >= this.start && pair.start <= this.end
  }
}

interface Pair {
    elf1: Elf,
    elf2: Elf
}

function createPair(pair: string): Pair{
  const [elf1, elf2] = pair.split(',')
  return {
    elf1: new Elf(parseInt(elf1.split('-')[0]), parseInt(elf1.split('-')[1])),
    elf2: new Elf(parseInt(elf2.split('-')[0]), parseInt(elf2.split('-')[1]))
  }
}

function solution1(input:string[]): (string|number){
  const elfs: Pair[] = input.map(createPair)
  return elfs.reduce((a, pair) => {
    if(pair.elf1.isContainedByPair(pair.elf2) || pair.elf2.isContainedByPair(pair.elf1)){
      a++
    }
    return a
  }, 0)
}


// 2-4,6-8 - start-end of sector, secound elf
// 2-3,4-5
// 5-7,7-9  <- sector 7 is in bouth elft, have Overlaps +1
// 2-8,3-7  <- first elf have sector, that contains whole sector of secoud elf. +1
// 6-6,4-6  <- secound elf have sector, that contains whole sector of pirst elf  
// 2-6,4-8  <- sectors 4,5,6 are in pouth + 1 
// sum 4

function solution2(input:string[]): (string|number){
  const elfs: Pair[] = input.map(createPair)
  return elfs.reduce((a, pair) => {
    if(pair.elf1.haveOverlaps(pair.elf2) || pair.elf2.haveOverlaps(pair.elf1)){
      a++
    }
    return a
  }, 0)
}


// boilerprint
function job(input:string): void {
  const lines:string[] = input.trim().split(singleLineSplit)
  const span1 = document.querySelector('#answer1') as HTMLElement
  const answer1: (string|number) = solution1(lines)
  span1.innerText = typeof answer1 == 'number' ? answer1.toString() : answer1
  const span2 = document.querySelector('#answer2') as HTMLElement
  const answer2: (string|number) = solution2(lines)
  span2.innerText = typeof answer2 == 'number' ? answer2.toString() : answer2
}

document.querySelector('button').addEventListener('click', function() {
  if (document.body.contains(document.querySelector('select'))) {
      job(document.querySelector('textarea').value)
  } else {
      job(document.querySelector('textarea').value)
  }
})

const fileUrl = 'input.txt'
fetch(fileUrl)
  .then( r => r.text() )
  .then( t => job(t))