import React, { useState } from "react";
import Chart from "./Chart";
import Filter from "./Filter/Filters";
import { JSONProvider } from '../Data/ABSContext'
import Abs from '../Data/data-d3-new.json'
import { ChartProps, AbsData } from "../Types";
import { Grid } from "./styled";
import JSON from "../Data/data-d3";


const Home: React.FC = () => {
    // const data = Abs
    // console.log('Abs', Abs[0].name)

    const json = JSON.content

    // const test_0 = [] as AbsData[] 
    // const test = test_0.concat(json[2])
    // console.log(test)


// the following code leads to 'Too many re-renders. React limits the number of renders to prevent an infinite loop'

    // const[selected, setSeletced] = useState([] as AbsData[])
    // Object.keys(json).map((k:any) => {
    //     let selNew = [] as AbsData[]
    //     if (json[k].name='Australis-0. All industries-All'){
    //         let sel = [] as AbsData[]
    //         selNew = selected.concat(json[k])
    //     }
    //     setSeletced(selNew)  
    // })


    return (
        <Grid>
            {/* <JSONProvider value={Abs}> */}
            <JSONProvider value={json}>
                <Filter />
                {/* {data? <Chart data={selected} /> : <p>loading...</p>} */}
                <Chart data={json} /> 
            </JSONProvider>
        </Grid>
    )
}

export default Home