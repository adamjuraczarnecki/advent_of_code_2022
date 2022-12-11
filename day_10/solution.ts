// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/


function solution1(input:string[]): (string|number){
  let clock: number = 0
  let register: number = 1
  const signalStrengths: number[] = [] 
  input.forEach(x => {
    const code: string = x.split(' ')[0]
    const cycles: number = code === 'addx' ? 2 : 1
    for(let i:number = 0; i < cycles; i++){
      clock++
      if([20, 60, 100, 140, 180, 220].includes(clock)){
        signalStrengths.push(clock * register)
        // console.log(`${clock} * ${register} = ${clock * register}`)
        // debugger
      }
      if(i===1){
        register += parseInt(x.split(' ')[1])
      }
    }
  })
  console.log(clock)
  return signalStrengths.reduce((a,x) => a+x)
}
// 13140
// 13360
function render(lines: string[][]): void {
  console.log(
    lines.map(line => line.join('') ).join('\n')
  )
}
function currentSprite(position: number): string {
  return Array(40).fill('.').map((pixel, i) => pixel = i >= position-1 && i <= position+1 ? '#': ' ').join('')
}

// register sets the middle of 3 pixel wide sprite. 
function solution2(input:string[]): (string|number){
  const screen: string[][] = Array(6).fill(0).map(line => Array(40))
  // const sprite: string[] = Array(40).fill(' ').map((pixel, i) => pixel = i <3 ? '#': ' ')
  let clock: number = 0
  let register: number = 1
    input.forEach(op => {
    const code: string = op.split(' ')[0]
    const cycles: number = code === 'addx' ? 2 : 1
    for(let i:number = 0; i < cycles; i++){
      clock++
      const sprite = currentSprite(register)
      const x = Math.min(Math.floor(clock / 40), 5)
      const y = clock % 40
      // console.log(x, y, op, sprite[y-1])
      // render(screen)
      // debugger
      screen[x][y-1] = sprite[y-1]
      if(i===1){
        register += parseInt(op.split(' ')[1])
      }
    }
  })
  render(screen)
  document.querySelector('#answer2')!.setAttribute('style','font-family: monospace, monospace; font-size: min(3vw, 20px)')
  return '\n'.concat(screen.map(line => line.join('').replaceAll(' ', '\u00a0') ).join('\n'))
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