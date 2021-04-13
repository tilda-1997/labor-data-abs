import React, { useEffect } from "react";
import * as d3 from 'd3';
import { ChartProps } from "../Types";
import { ChartDiv } from "./styled";

const Chart = (props: ChartProps) => {

    const {data} = props

    const height = 560
    const width = 954
    const margin = ({top: 10, right: 20, bottom: 30, left: 40})
    const color = d3.scaleOrdinal(data.map(d => d.state), d3.schemeCategory10).unknown("black")
    const radius = d3.scaleSqrt([0, 3e5], [0, width / 12])
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
    
    const y = d3.scaleLinear([90, 115], [height - margin.bottom, margin.top])
    const x = d3.scaleLog([90, 105], [margin.left, width - margin.right])

    // const legend = {
    //     // const id = DOM.uid().id;
    //     const id = uid().id,
    //     return html`<style>
      
    //   .${id} {
    //     display: inline-flex;
    //     align-items: center;
    //     margin-right: 1em;
    //   }
      
    //   .${id}::before {
    //     content: "";
    //     width: 1em;
    //     height: 1em;
    //     margin-right: 0.5em;
    //     background: var(--color);
    //   }
      
    //   </style><div style="display: flex; align-items: center; min-height: 33px; font: 10px sans-serif; margin-left: ${margin.left}px;"><div>${color.domain().map(state => html`<span class="${id}" style="--color: ${color(state)}">${document.createTextNode(state)}</span>`)}
    //   `;
    // }

    const getTime = () => {
        var time = [];
        for (var i = 0; i <= 57; i++) {
          // var str = '';
          let str = null 
          str = data[1].wages[i][0]
          // time.push(new Date(data[0].wages[i].date))
          time.push(new Date(str))
        }
        return time
    }

    const formatDate = d3.timeFormat("%e-%b-%Y")
    const timeList_0 = getTime()
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
          index: d.index,
          name: d.name,
          state: d.state,
          population: d.population,
          industry: d.industry,
          sex: d.sex,
          jobs: valueAt(d.jobs, formatDate(year)),
          wages: valueAt(d.wages, formatDate(year))
        }));
    }

    const year = timeList[0]
    const currentData = dataAt(year)


   useEffect(() => {
    const svg = d3.select("#canvas")
    svg.attr("width", width)
        .attr("height", height);

    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    svg.append("g")
        .call(grid);
    
    const circle = svg.append("g")
        .attr("stroke", "black")
        .selectAll("circle")
        .data(dataAt(timeList[0]), (d:any) => d.name)
        .join("circle")
        .sort((a, b) => d3.descending(a.jobs, b.jobs))
        .attr("cx", d => x(d.jobs))
        .attr("cy", d => y(d.wages))
        .attr("r", d => radius(Number(d.population)))
        .attr("fill", d => color(d.state))
        .call(circle => circle.append("title")
            .text(d => [d.state, 'population '+ d.population+' (000)', 
                        'jobs: '+ d.jobs, 'wages: '+ d.wages, d.name  ].join("\n")));
      
   })

    return (
        <ChartDiv>
            <div>
                <span style={{fontWeight: 'bold'}}>State and Territory: </span>&nbsp;&nbsp;
                <span style={{color: color('Australia')}}>&#9635; &nbsp;Australia</span> &nbsp;&nbsp;
                <span style={{color: color('ACT')}}>&#9635;&nbsp;ACT</span> &nbsp;&nbsp;
                <span style={{color: color('NSW')}}>&#9635;&nbsp;NSW</span> &nbsp;&nbsp;
                <span style={{color: color('NT')}}>&#9635;&nbsp;NT</span> &nbsp;&nbsp;
                <span style={{color: color('QLD')}}>&#9635;&nbsp;QLD</span> &nbsp;&nbsp;
                <span style={{color: color('SA')}}>&#9635;&nbsp;SA</span> &nbsp;&nbsp;
                <span style={{color: color('TAS')}}>&#9635;&nbsp;TAS</span> &nbsp;&nbsp;
                <span style={{color: color('VIC')}}>&#9635;&nbsp;VIC</span> &nbsp;&nbsp;
                <span style={{color: color('WA')}}>&#9635;&nbsp;WA</span> &nbsp;&nbsp;
            </div>
            <br />
       
        <svg id="canvas" style={{ width: '954px', height: '560px' }}></svg>
       
        </ChartDiv>
    )
}

export default Chart