export interface ChartProps {
    data: AbsData[],
    disable_filter: boolean,
    setDisable: (e:any) => void,
    play: boolean,
    setPlay: (e:any) => void,
}

export interface AbsData {
    jobs: (string | number)[][],
    wages: (string | number)[][],
    name: string,
    industry: string,
    sex: string, 
    state: string,
    population: string,
    type: string, 
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

export interface FilterProps {
    chooseIndustry: (e:any) => void;
    chooseOption: (e:any) => (e:any) => void;
    filterContent: Filters;
    disable_filter: boolean
}