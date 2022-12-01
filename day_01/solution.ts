const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

function solution1(input:string[]): (string|number){
  const elvsCalories: number[] = input.map(x=> {return x.split(singleLineSplit).reduce((a,z) => (a+parseInt(z)),0)})
  return Math.max(...elvsCalories)
}

function solution2(input:string[]): (string|number){
  let elvsCalories: number[] = input.map(x=> {return x.split(singleLineSplit).reduce((a,z) => (a+parseInt(z)),0)})
  elvsCalories = elvsCalories.sort((n1,n2) => n2 - n1)
  return elvsCalories[0] + elvsCalories[1] + elvsCalories[2]
}


// boilerprint
function job(input:string[]): void {
  const span1 = document.querySelector('#answer1') as HTMLElement
  span1.innerText = solution1(input).toString()
  const span2 = document.querySelector('#answer2') as HTMLElement
  span2.innerText = solution2(input).toString()
}


document.querySelector('button').addEventListener('click', function() {
  if (document.body.contains(document.querySelector('select'))) {
      job(document.querySelector('textarea').value.split(doubleLineSplit))
  } else {
      job(document.querySelector('textarea').value.split(doubleLineSplit))
  }
})

const fileUrl = 'input.txt'
fetch(fileUrl)
  .then( r => r.text() )
  .then( t => job(t.split(doubleLineSplit)))