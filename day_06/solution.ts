// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

// find start-of-packet marker which is 4 all diffrent chars
// return index of last char of sop
// mjqjpqmgbljsphdztnvjfqwrcgsmlb
// mjqj - no double j
// jpqm - yes - return 7


function hasDuplicates(list: string[]): boolean{
  return list.some((char, index) => {
    return list.indexOf(char) !== index
  })
}

function solution1(input:string[]): (string|number){
  const datastream: string[] = input[0].split('')
  const datastreanLen: number = datastream.length
  for (let i:number = 0; i < datastreanLen-4; i++){
    const frame :string[] = datastream.slice(i, i+4)
    // console.log(frame, !hasDuplicates(frame))
    if (!hasDuplicates(frame)){
      return i+4
    }
  }
  return 'Not Found'
}

// same shit but frame has lenth of 14 chars
function solution2(input:string[]): (string|number){
  const datastream: string[] = input[0].split('')
  const datastreanLen: number = datastream.length
  for (let i:number = 0; i < datastreanLen-14; i++){
    const frame :string[] = datastream.slice(i, i+14)
    // console.log(frame, !hasDuplicates(frame))
    if (!hasDuplicates(frame)){
      return i+14
    }
  }
  return 'Not Found'
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