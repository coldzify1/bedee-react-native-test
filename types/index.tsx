
export default interface IQuestion{
    question: string
    A: string
    B: string
    C: string
    D: string
    answer: IAnswer
    selectedAnswer? : IAnswer
}

export type IAnswer = 'A' | 'B' | 'C' | 'D'

export interface IScore{
    name : string
    score : number
}