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

export interface Filters {
    sex: string[],
    state: string[],
    industry: string[]
}

export interface SelectForInd {
    value: string;
    label: string;
  }