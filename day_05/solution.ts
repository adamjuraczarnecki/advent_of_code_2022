// usefull consts
const singleLineSplit = /\r?\n/
const doubleLineSplit = /\r?\n\r?\n/


//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 
// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2  move one caret at once.
// after all moves stacks looks likt this:
//         [Z]
//         [N]
//         [D]
// [C] [M] [P]
//  1   2   3
// message: CMZ

class Stacks{
  stacks: Record<number, string[]>
  constructor(input:string){
    let splitedInput: string[] = input.split(singleLineSplit)
    splitedInput = splitedInput.reverse()
    const stacktsNumbers: number[] = splitedInput?.shift()?.trim()?.split('   ')?.map(x=>parseInt(x)) ?? [0]
    const numberOfStacks:number = stacktsNumbers.length
    this.stacks = {}
    stacktsNumbers.forEach(x => this.stacks[x] = [])
    const initialMaxStackSize = splitedInput.length
    for(let i:number = 0; i < initialMaxStackSize; i++){
      for(let s:number = 0; s < numberOfStacks; s++){
        const caret: string = splitedInput[i][1 + s * 4]
        if( caret != ' '){
          this.stacks[stacktsNumbers[s]].push(caret)
        }
      }
    }
  }
  executeStep(step:string): void{
    const instruction: string[] = step.split(' ')
    const moves: number = parseInt(instruction[1])
    const from: number = parseInt(instruction[3])
    const target: number = parseInt(instruction[5])
    for(let i:number = 0; i < moves; i++){
      const caret: string = this.stacks[from].pop() ?? ' '
      this.stacks[target].push(caret)
    }
  }
  CrateMover9001(step:string): void{
    const instruction: string[] = step.split(' ')
    const carets: number = parseInt(instruction[1])
    const from: number = parseInt(instruction[3])
    const target: number = parseInt(instruction[5])
    const stackHeight:number = this.stacks[from].length
    const caretsToMove: string[] = this.stacks[from].splice(stackHeight - carets, stackHeight)
    this.stacks[target] = this.stacks[target].concat(caretsToMove)
    // debugger
  }

  getMessage(): string{
    let message: string =''
    Object.values(this.stacks).forEach(stack => message += stack.at(-1))
    return message
  }
}



function solution1(input:string[]): (string|number){
  const stacks:Stacks = new Stacks(input[0])
  const steps: string[] = input[1].split(singleLineSplit)
  steps.forEach(x => stacks.executeStep(x))
  console.log(stacks)
  return stacks.getMessage()
}

//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 
// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2  move x at once from y to z.
// after all moves stacks looks likt this:
//         [D]
//         [N]
//         [Z]
// [M] [C] [P]
//  1   2   3
// message: MCD

function solution2(input:string[]): (string|number){
  const stacks:Stacks = new Stacks(input[0])
  const steps: string[] = input[1].split(singleLineSplit)
  steps.forEach(x => stacks.CrateMover9001(x))
  console.log(stacks)
  return stacks.getMessage()
}


// boilerprint
function job(input:string): void {
  const lines:string[] = input.trimEnd().split(doubleLineSplit)
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