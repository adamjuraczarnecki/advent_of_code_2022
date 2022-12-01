// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

function solution1(input:string[]): string{
  return 'in progress'
}

function solution2(input:string[]): string{
  return 'in progress'
}


// boilerprint
function job(input:string[]): void {
  console.log(input)
  const span1 = document.querySelector('#answer1') as HTMLElement
  span1.innerText = solution1(input)
  const span2 = document.querySelector('#answer2') as HTMLElement
  span2.innerText = solution2(input)
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