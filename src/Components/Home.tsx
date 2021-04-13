import React from "react";
import Chart from "./Chart";
import Filter from "./Filter/Filters";
import { JSONProvider } from '../Data/ABSContext'
import Abs from '../Data/data-d3-new.json'
import { ChartProps, AbsData } from "../Types";
import { Grid } from "./styled";

// import Test from "./Test";
// https://api.observablehq.com/@tilda-1997/chart.tgz?v=3

const Home: React.FC = () => {
    const data = Abs
    // console.log('Abs', Abs[0].name)
    return (
        <Grid>
            <JSONProvider value={Abs}>
                <Filter />
                <Chart data={data} />
            </JSONProvider>
        </Grid>
    )
}

export default Home