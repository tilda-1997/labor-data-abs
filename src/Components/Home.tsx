import React, { useEffect, useState, ChangeEvent } from "react";
import Chart from "./Chart";
import Filter from "./Filter/Filters";
import { JSONProvider } from '../Data/ABSContext'
// import Abs from '../Data/data-d3-new.json'
import { AbsData , Filters, SelectForInd} from "../Types";
import { Grid } from "./styled";
import content from "../Data/data-d3";


const Home: React.FC = () => {

    const json = content.content

    const initial_0 = [] as AbsData[]
    // give default setting - all states - all industry - all sex
    const initial               = initial_0.concat(json[0]).concat(json[60]).concat(json[120]).concat(json[180]).concat(json[240]).concat(json[300]).concat(json[360]).concat(json[420]).concat(json[480])
    const[selected, setSeleted] = useState(initial as AbsData[])

    const [filterContent, setContent ] = useState({
        state   : [] as string[],
        industry: [] as string[],
        sex     : [] as string[]
    })

    const [disable_Filter, setDisable] = useState(false)
    const [play, setPlay]              = useState(true)

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
                    state: ['Australia', 'NSW', 'ACT', 'WA', 'VIC', 'QLD', 'NT', 'SA', 'TAS']
                })
            )
        }
            let selNew = [] as AbsData[]
            Object.keys(json).map((k:any) => {
                if (filterContent.state.includes(json[k].state) && filterContent.sex.includes(json[k].sex) && filterContent.industry.includes(json[k].industry)){            
                    selNew = selNew.concat(json[k])
                    setSeleted(selNew) 
                }

            })
    }, [filterContent.industry, filterContent.state, filterContent.sex])

    return (
        <Grid>
            <JSONProvider value = {json}>
            <Filter       
                chooseIndustry = {chooseIndustry}
                chooseOption   = {chooseOption}
                filterContent  = {filterContent}
                disable_filter = {disable_Filter}
            />
                {(filterContent.industry.length === 0 && filterContent.state.length === 0 && filterContent.sex.length === 0)? 
                    <Chart data           = {initial}
                           play           = {play}
                           setPlay        = {setPlay}
                           disable_filter = {disable_Filter}
                           setDisable     = {setDisable}
                    />     : <Chart data  = {selected}
                           disable_filter = {disable_Filter}
                           setDisable     = {setDisable}
                           play           = {play}
                           setPlay        = {setPlay}
                /> }
            </JSONProvider>
        </Grid>
    )
}

export default Home