import React, { useEffect, useState, ChangeEvent } from "react";
import Chart from "./Chart";
import Filter from "./Filter/Filters";
import { JSONProvider } from '../Data/ABSContext'
import Abs from '../Data/data-d3-new.json'
import { ChartProps, AbsData , Filters, SelectForInd} from "../Types";
import { Grid } from "./styled";
import content from "../Data/data-d3";


const Home: React.FC = () => {

    const json = content.content

    const initial_0 = [] as AbsData[] 
    // default setting - all states-all industry-all sex
    const initial = initial_0.concat(json[0]).concat(json[60]).concat(json[120]).concat(json[180]).concat(json[240]).concat(json[300]).concat(json[360]).concat(json[420]).concat(json[480])

    const[selected, setSeleted] = useState(initial as AbsData[])

    const [filterContent, setContent ] = useState({
        state   : [] as string[],
        industry: [] as string[],
        sex     : [] as string[]
    })

    type  keyOfClass   = keyof Filters
    const chooseOption = (key: keyOfClass) => (e:ChangeEvent<HTMLInputElement>) => {
        const name    = key
        let   eValue  = e.target.value;
        let   isExist = filterContent[name].includes(eValue)
        if (isExist){
            const newList = filterContent[name].filter(i => i!==eValue);
            setContent(
            prevState => ({
                ...prevState,
                [name]: newList
            }))
        }else{
            const newList = filterContent[name].concat(eValue)
            setContent(
                prevState => ({
                    ...prevState,
                    [name]: newList
                }))
        }
    }  

    const [industries, setInd] = useState([] as SelectForInd[])
    const chooseIndustry       = (inds: any) => {
        setInd(prevState => ({
            ...prevState,
            inds})) 

        let len = Object.keys(inds).length
        for (let i=0; i<len; i++) {
            let newInds     = inds[i].value
            let newIndsList = filterContent.industry.concat(newInds)
            setContent(
                prevState => ({
                    ...prevState,
                    industry: newIndsList
                })
            )

        };
    }
    
    // filterContent.state.includes(json[k].state) && filterContent.sex.includes(json[k].sex) && filterContent.industry.includes(json[k].industry)
    useEffect(() => {
        setSeleted([])
        if (filterContent.industry.length === 0 ){
            setContent(
                prevState => ({
                    ...prevState,
                    industry: ['0. All industries']
                })
            )
        }
        if (filterContent.sex.length === 0 ) {
            setContent(
                prevState => ({
                    ...prevState,
                    sex: ['All']
                })
            )
        } 
        if (filterContent.state.length === 0){
            setContent(
                prevState => ({
                    ...prevState,
                    state: ['Australia', 'NSW', 'ACT', 'WA', 'VIC', 'QLD', 'NT', 'SA']
                })
            )
        }
            let selNew = [] as AbsData[]
            Object.keys(json).map((k:any) => {
                // if (filterContent.state.includes(json[k].state) && filterContent.sex.includes(json[k].sex) && filterContent.industry.includes(json[k].industry)){            
                //     selNew = selNew.concat(json[k])
                //     setSeleted(selNew) 
                //     console.log('test', selected)
                // }
                // console.log(filterContent.industry, json[k].industry)

                if (filterContent.state.includes(json[k].state) && filterContent.sex.includes(json[k].sex) && filterContent.industry.includes(json[k].industry)){            
                    selNew = selNew.concat(json[k])
                    setSeleted(selNew) 
                    console.log('test', selected)
                }
                

            })
        
            
        // if (filterContent.industry.length == 0 && filterContent.state.length == 0 && filterContent.sex.length == 0 ){
        //     setSeletced(initial) 
        // } else {
        //     let selNew = [] as AbsData[]
        //     Object.keys(json).map((k:any) => {
        //         if (filterContent.state.includes(json[k].state) && filterContent.sex.includes(json[k].sex) && filterContent.industry.includes(json[k].industry)){
        //             selNew = selected.concat(json[k])
        //         }
        //     })
        //     setSeletced(selNew) 
        //     console.log('new', selected)
        // } 
    }, [filterContent.industry, filterContent.state, filterContent.sex])




    // useEffect(() => {
    //     Object.keys(json).map((k:any) => {
    //         let selNew = [] as AbsData[]
    //         if (json[k].name='Australis-0. All industries-All'){
    //             let sel = [] as AbsData[]
    //             selNew = selected.concat(json[k])
    //         }
    //        setSeletced(selNew)  
    //     })
    // },[])

    console.log('options', filterContent)

    return (
        <Grid>
            <JSONProvider value={json}>
                <Filter chooseIndustry={chooseIndustry} chooseOption={chooseOption} filterContent={filterContent} />
                {(filterContent.industry.length === 0 && filterContent.state.length === 0 && filterContent.sex.length === 0)? 
                <Chart data={initial} /> : <Chart data={selected} /> }
            </JSONProvider>
        </Grid>
    )
}

export default Home