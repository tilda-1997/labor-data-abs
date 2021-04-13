export interface ChartProps {
    data: AbsData[]
}

export interface AbsData {
    index: number,
    jobs: (string | number)[][],
    wages: (string | number)[][],
    name: string,
    industry: string,
    sex: string, 
    state: string,
    population: string, 
}