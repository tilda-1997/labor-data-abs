import React from "react";
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

    const test1 = json[0]
    const test3 = json[2]
    const test = [] as AbsData[]
    const test2 = test.concat(test1)
    const test4= test2.concat(test3)
    console.log('test', test1, typeof(test1))


    const [data, setData] = React.useState([])

    return (
        <Grid>
            {/* <JSONProvider value={Abs}> */}
            <JSONProvider value={json}>
                <Filter />
                { data? <Chart data={json} /> : <p>loading...</p>}
                {/* { data? <Chart data={test4} /> : <p>loading...</p>} */}
            </JSONProvider>
        </Grid>
    )
}

export default Home