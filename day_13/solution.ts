// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

// packet starts with "[" ends "]"
// contains n coma seperated values \n or other lits/arrays
// values in every 
// [1,1,3,1,1]   here every value in first line                 
// [1,1,5,1,1]   is smaller than coresponding value in secound row  -> return index + 1

// [[1],[2,3,4]]
// [[1],4]

// [9]
// [[8,7,6]]

// [[4,4],4,4]
// [[4,4],4,4,4]

// [7,7,7,7]
// [7,7,7]

// []
// [3]

// [[[]]]
// [[]]

// [1,[2,[3,[4,[5,6,7]]]],8,9]
// [1,[2,[3,[4,[5,6,0]]]],8,9]
// sum returns -> in example 13
// 2281 to low

type NestedArray = Array<NestedArray | number>

class Pair {
  l: NestedArray
  r: NestedArray
  constructor(input: string) {
    this.l = JSON.parse(input.split(singleLineSplit)[0]) as NestedArray 
    this.r = JSON.parse(input.split(singleLineSplit)[1]) as NestedArray
  }
  test(): boolean {
    return test(this.l, this.r)!
  }
}
function test(l: NestedArray, r: NestedArray): (boolean|undefined) {
  const maxLength: number = Math.max(l.length, r.length)
  for(let i: number = 0; i<maxLength; i++){
    const iL = l[i]
    const iR = r[i]
    if(iL === undefined){return true}
    if(iR === undefined){return false}
    if([iL,iR].every(x => typeof x === 'number')){
      if(iL>iR){return false}
      if(iL<iR){return true}
      continue
    }
    if([iL,iR].some(x => typeof x === 'number')){
      return test(
      typeof iL === 'number' ? [iL] : iL,
      typeof iR === 'number' ? [iR] : iR
      )
    }
    const kwons = test(iL as NestedArray, iR as NestedArray)
    if(kwons !== undefined){return kwons}
    
  }
}

function solution1(input:string): (string|number){
  const pairs: Pair[] = input.split(doubleLineSplit).map(x => new Pair(x))
  return pairs.reduce((a,x,i) => a+(x.test()?i+1:0), 0)
}
// now sort lines in order with dividers and find indexes of thise dividers and multiply
function printLines(lines: NestedArray[]): void {
  console.log(
    lines.map(line => JSON.stringify(line) ).join('\n')
  )
}
function solution2(input:string): (string|number){
  const dividers = [[[2]], [[6]]]
  const lines: NestedArray[] = input.split(singleLineSplit).filter(x => x !== '').map(x=> JSON.parse(x) as NestedArray).concat(dividers)
  lines.sort((a,b) => test(b, a) ? 1 : 0)
  printLines(lines)
  const strings: string[] = dividers.map(x => JSON.stringify(x))
  const indexes: number[] =[]
  lines.forEach((x,i) => {
    strings.forEach(s => {
      if(s===JSON.stringify(x)){
        indexes.push(i+1)
      }
    })
  })
  return indexes[0] * indexes [1]
}


// boilerprint
function job(input:string): void {
  const lines:string = input.trim()
  const span1 = document.querySelector('#answer1') as HTMLElement
  const answer1: (string|number) = solution1(lines)
  span1.innerText = typeof answer1 == 'number' ? answer1.toString() : answer1
  const span2 = document.querySelector('#answer2') as HTMLElement
  const answer2: (string|number) = solution2(lines)
  span2.innerText = typeof answer2 == 'number' ? answer2.toString() : answer2
}

document.querySelector('button')!.addEventListener('click', function() {
  if (document.body.contains(document.querySelector('select'))) {
      job(document.querySelector('textarea')!.value)
  } else {
      job(document.querySelector('textarea')!.value)
  }
})

const fileUrl = 'input.txt'
fetch(fileUrl)
  .then( r => r.text() )
  .then( t => job(t))