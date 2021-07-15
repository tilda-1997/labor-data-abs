import { useEffect, useState } from "react";
import * as d3 from 'd3';
import { ChartProps , AbsData} from "../Types";
import { ChartDiv, Button, Pp } from "./styled";
// import { linkHorizontal } from "d3";

const Chart = (props: ChartProps) => {

    const {data, disable_filter, setDisable, play, setPlay} = props

    const height     = 560
    const width      = 954
    const margin     = ({top: 20, right: 10, bottom: 40, left: 40})
    const color      = d3.scaleOrdinal(data.map(d => d.state), d3.schemeCategory10).unknown("white")
    const radius     = d3.scaleSqrt([0, 3e5], [0, width / 10])
    const bisectYear = d3.bisector(([year]) => year).left

    const grid = (g:any) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call((g:any) => g.append("g")
        .selectAll("line")
        .data(x.ticks())
        .join("line")
            .attr("x1", (d:any) => 0.5 + x(d))
            .attr("x2", (d:any) => 0.5 + x(d))
            .attr("y1", margin.top)
            .attr("y2", height - margin.bottom))
        .call((g:any) => g.append("g")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
            .attr("y1", (d:any) => 0.5 + y(d))
            .attr("y2", (d:any) => 0.5 + y(d))
            .attr("x1", margin.left)
            .attr("x2", width - margin.right));
    
    const xAxis = (g:any) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80, ","))
        .call((g:any) => g.select(".domain").remove())
        .call((g:any) => g.append("text")
            .attr("x", width)
            .attr("y", margin.bottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text("Payroll jobs (index %)→"))

    const yAxis = (g: any) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g:any) => g.select(".domain").remove())
        .call((g:any) => g.append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Total wages  (index %)"))
    
    const y = d3.scaleLinear([60, 130], [height - margin.bottom, margin.top])
    const x = d3.scaleLog([60, 130], [margin.left, width - margin.right])

    const getTime = () => {
        var time = [];
        for (var i = 0; i <= 57; i++) {
          let str = null
              str = data[0]?.wages[i][0]
          // time.push(new Date(data[0].wages[i].date))
          time.push(new Date(str))
        }
        return time
    }

    const formatDate          = d3.timeFormat("%e-%b-%Y")
    const timeList_0          = getTime()
    const sortByDateAscending = (a:any, b:any) => {
        // Dates will be cast to numbers automagically:
        return a - b;
    }
    // sorted list
    const timeList = timeList_0.sort(sortByDateAscending)

    const valueAt = (values:any, year:any) => {
        const i = bisectYear(values, year, 0, values.length - 1);
        const a = values[i];
        return a[1];
    }

    const dataAt = (year:any) => {
        return data.map(d => ({
        //   index: d.index,
          name      : d.name,
          state     : d.state,
          population: d.population,
          industry  : d.industry,
          sex       : d.sex,
          type      : d.type,
          jobs      : valueAt(d.jobs, formatDate(year)),
          wages     : valueAt(d.wages, formatDate(year))
        }));
    }

    const [currentData, setCurrentData] = useState([] as AbsData[])
    const [yearAtPoint, setYear]        = useState('' as any)

    const playChart = () => {
        if(play){
            for(let i = 0;i <= 57;i++){
                setTimeout(()=>{
                    let year = timeList[i];
                    let cur  = dataAt(year);
                    setYear(year);
                    setCurrentData(cur);
                    if(i==57){
                        setPlay(false)
                        setDisable(false)
                    }
                },500*i)
            }
        }
    }

   useEffect(() => {
    const svg = d3.select("#canvas")
    svg.selectAll("*").remove()
            .append("svg")
            .attr("width", width)
            .attr("height", height);

    svg.attr("width", width)
        .attr("height", height);

    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    svg.append("g")
        .call(grid);
    
    const circle = svg.append("g")
        .attr("stroke", "grey")
        .selectAll("circle")
        // dataAt will pick different date data
        .data(dataAt(timeList[0]))
        .join("circle")
        .sort((a, b) => d3.descending(a.jobs, b.jobs))
        .attr("cx", d => x(d.jobs))
        .attr("cy", d => y(d.wages))
        .attr("r", d => radius(Number(d.population)))
        // .attr("fill", d => color(d.name))
        .attr("fill", d => color(d.state))
        .call(circle => circle.append("title")
            .text(d => [ d.state, 'population '+ d.population+' (000)', d.industry, d.sex,
                        'jobs: '+ d.jobs, 'wages: '+ d.wages ].join("\n")));
    
    const update = (data:any) => {
        circle.data(data, (d:any) => {return d.name})
        .sort((a, b) => d3.descending(a.population, b.population))
        .attr("cx", d => x(d.jobs))
        .attr("cy", d => y(d.wages))
        .attr("r", d => radius(+d.population));
    }
    update(currentData); 
   }, [currentData, data, disable_filter, play])

    return (
        <ChartDiv>
            <div>
                {/* {data.map(d => <>
                    <><span style={{color: color(d.state)}}>&#9635; &nbsp;</span>{d.state}&nbsp;&nbsp;</>)} */}
                     <span style = {{color: color('Australia')}}>&#9635; &nbsp;</span> Australia&nbsp;&nbsp;
                     <span style = {{color: color('ACT')}}>&#9635;&nbsp;</span> ACT&nbsp;&nbsp;
                     <span style = {{color: color('NSW')}}>&#9635;&nbsp;</span> NSW&nbsp;&nbsp;
                     <span style = {{color: color('NT')}}>&#9635;&nbsp;</span> NT&nbsp;&nbsp;
                     <span style = {{color: color('QLD')}}>&#9635;&nbsp;</span> QLD&nbsp;&nbsp;
                     <span style = {{color: color('SA')}}>&#9635;&nbsp;</span> SA&nbsp;&nbsp;
                     <span style = {{color: color('TAS')}}>&#9635;&nbsp;</span> TAS&nbsp;&nbsp;
                     <span style = {{color: color('VIC')}}>&#9635;&nbsp;</span> VIC&nbsp;&nbsp;
                     <span style = {{color: color('WA')}}>&#9635;&nbsp;</span> WA&nbsp;&nbsp;
                      
            </div>
            <br />
            <svg id = "canvas" style = {{ width: '954px', height: '560px' }}></svg>

            <div>
                &nbsp;&nbsp;<Button onClick={() => {
                    setPlay(true)
                    setDisable(true)
                    playChart()
                    }}>Play</Button>  &nbsp;&nbsp;
                {/* <button onClick={() => setPlay(false)}>Pause</button> &nbsp;&nbsp; */}
                <Pp style = {{display:'inline-block'}}>Current Date: {(yearAtPoint=='') ? '2020-01-03' : JSON.stringify(yearAtPoint).substring(1,11)}</Pp>
             </div>
            
        </ChartDiv>
    )
}

export default Chart
