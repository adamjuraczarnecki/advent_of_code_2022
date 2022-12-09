// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/

// head and tail must always touching
// If head moved 2 fields straight tail must also move one step it head direction

// ......
// ......
// ......
// ......
// H.....

// R 4 moves are made one by one.
// U 4 this means 4 steps u one after one
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2
// 6456 to low

const Direction:Record<string, number[]> = {
  L: [-1, 0],
  R: [1, 0],
  U: [0, -1],
  D: [0, 1]
}

class Rope {
  x: number
  y: number
  constructor(){
    this.x = 0
    this.y = 0
  }
  oneStep(direction: number[]): void {
    this.x += direction[0]
    this.y += direction[1]
  }
  follow(head: Rope): void{
    const distance = Math.max(
      Math.abs(this.x - head.x),
      Math.abs(this.y - head.y)
    )
    if(distance > 1){
      const directionX = head.x - this.x
      const directionY = head.y - this.y
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;

    }
  }
  snap(): string {
    return `${this.x}-${this.y}`
  }
}

function solution1(input:string[]): (string|number){
  const tailsBeen: Set<string> = new Set()
  const head: Rope = new Rope()
  const tail: Rope = new Rope()
  tailsBeen.add(tail.snap())
  input.forEach(x=> {
    const direction: number[] = Direction[x.split(' ')[0]]
    const moves: number = parseInt(x.split(' ')[1])
    for(let i: number = 0; i < moves; i++){
      head.oneStep(direction)
      tail.follow(head)
      tailsBeen.add(tail.snap())
    }
  })
  return tailsBeen.size
}

function solution2(input:string[]): (string|number){
  const ropes: Rope[] = new Array(10).fill(0).map(x=> new Rope())
  const tailsBeen: Set<string> = new Set()
  tailsBeen.add('0-0')
  input.forEach(x=> {
    const direction: number[] = Direction[x.split(' ')[0]]
    const moves: number = parseInt(x.split(' ')[1])
    
    for(let i: number = 0; i < moves; i++){
      ropes[0].oneStep(direction)   // head
      for(let rope_i:number = 1; rope_i < ropes.length; rope_i++){
        ropes[rope_i].follow(ropes[rope_i - 1])
      }
      tailsBeen.add(ropes.at(-1)!.snap())
    }
  })
  return tailsBeen.size
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