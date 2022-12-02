// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

function solution1(input:string[]): (string|number){
  return 'in progress'
}

function solution2(input:string[]): (string|number){
  return 'in progress'
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