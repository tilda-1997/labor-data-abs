import Select from 'react-select';
import { Pp, Div } from '../styled';
import { industryList } from "./Options";
import { ChangeEvent, useEffect, useState} from 'react'
import { FilterProps, Filters, SelectForInd } from "../../Types";

const Filter = (props : FilterProps) => {
    const customStyle = {
        option: (provided:any, state:any) => ({
            ...provided,
            color  : state.isSelected ? '#EC9152': '#6B5048',
            padding: 10,
          }),
    }

    const { chooseIndustry, chooseOption, filterContent } = props
    // 'Australia', 'NSW', 'ACT', 'WA', 'VIC', 'QLD', 'NT', 'SA'

    return(
        <>
        <Div>
            <h2> &equiv; Filter </h2>
            <Pp> &#10029; State or Territory</Pp>
            <div>
            <label>
                <input type = 'checkbox' name = 'nation' value = 'Australia' onChange = {chooseOption('state')} 
                checked={filterContent.state.includes('Australia')} /> Australia &nbsp;
            </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'NSW' onChange = {chooseOption('state')} 
                checked={filterContent.state.includes('NSW')} /> NSW &nbsp;
                </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'VIC' onChange = {chooseOption('state')}
                checked={filterContent.state.includes('VIC')} /> VIC &nbsp;
                </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'QLD' onChange = {chooseOption('state')}
                checked={filterContent.state.includes('QLD')} /> QLD &nbsp;
            </label>
            <br />

            <label>
                <input type = 'checkbox' name = 'nation' value = 'WA' onChange = {chooseOption('state')}
                checked={filterContent.state.includes('WA')} /> WA &nbsp;
            </label>

           <label>
                <input type = 'checkbox' name = 'nation' value = 'NT' onChange = {chooseOption('state')}
                checked={filterContent.state.includes('NT')} /> NT &nbsp;
            </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'SA' onChange = {chooseOption('state')}
                checked={filterContent.state.includes('SA')} /> SA &nbsp;
            </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'ACT' onChange = {chooseOption('state')}
                checked={filterContent.state.includes('ACT')} /> ACT &nbsp;
            </label> 
            </div>


            <Pp> &#10038; Industry</Pp>
            <Select 
                isMulti
                name         = 'industry'
                options      = {industryList}
                defaultValue = {industryList[0]}
                onChange     = {chooseIndustry}
                // value={industries}
                styles = {customStyle}
            />

            <Pp> &#10043; Sex</Pp>
            <>
            <label>
                <input type = 'checkbox' name = 'sex'  value = 'All'  onChange = {chooseOption('sex')} 
                checked={filterContent.sex.includes('All')} /> All Genders &nbsp;
            </label>
            <label>
                <input type = 'checkbox' name = 'sex' value = 'Males' onChange = {chooseOption('sex')} 
                checked={filterContent.sex.includes('Males')}/> Males &nbsp;
            </label>
            <label>
                <input type = 'checkbox' name = 'sex' value = 'Females' onChange = {chooseOption('sex')}
                checked={filterContent.sex.includes('Females')} /> Females
            </label>
            </>
        </Div>
        </>
    )
}

export default Filter
