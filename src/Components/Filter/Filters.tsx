import Select from 'react-select';
import { Pp, Div } from '../styled';
import { industryList } from "./Options";
import { ChangeEvent, useEffect, useState} from 'react'
import { Filters, SelectForInd } from "../../Types";

const Filter:React.FC = () => {
    const customStyle = {
        option: (provided:any, state:any) => ({
            ...provided,
            color  : state.isSelected ? '#EC9152': '#6B5048',
            padding: 10,
          }),
    }

    const [filterContent, setContent ] = useState({
        state   : [] as string[],
        industry: [] as string[],
        sex     : [] as string[]
    })

    type keyOfClass = keyof Filters
    const chooseOption = (key: keyOfClass) => (e:ChangeEvent<HTMLInputElement>) => {
        const name    = key
        let   eValue  = e.target.value;
        let   isExist = filterContent.sex.includes(eValue)
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
    const chooseIndustry = (inds: any) => {
        setInd(prevState => ({
            ...prevState,
            inds})) 

        let len = Object.keys(inds).length
        for (let i=0; i<len; i++) {
            let newInds = inds[i].value
            let newIndsList = filterContent.industry.concat(newInds)
            setContent(
                prevState => ({
                    ...prevState,
                    industry: newIndsList
                })
            )

        };
    }

    const [indexName, setIndexName] = useState('')

    useEffect(() => {


    }, [filterContent])

    console.log('options', filterContent, industries)

    return(
        <>
        <Div>
            <h2> &equiv; Filter </h2>
            <Pp> &#10029; State or Territory</Pp>
            <div>
            <label>
                <input type = 'checkbox' name = 'nation' value = 'Australia' onChange = {chooseOption('state')} /> Australia &nbsp;
            </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'NSW' onChange = {chooseOption('state')} /> NSW &nbsp;
                </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'VIC' onChange = {chooseOption('state')} /> VIC &nbsp;
                </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'QLD' onChange = {chooseOption('state')} /> QLD &nbsp;
            </label>
           

            <label>
                <input type = 'checkbox' name = 'nation' value = 'WA' onChange = {chooseOption('state')} /> WA &nbsp;
            </label>

           <label>
                <input type = 'checkbox' name = 'nation' value = 'NT' onChange = {chooseOption('state')} /> NT &nbsp;
            </label>

            <label>
                <input type = 'checkbox' name = 'nation' value = 'ACT' onChange = {chooseOption('state')} /> ACT &nbsp;
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
                <input type = 'checkbox' name = 'sex'  value = 'All'  onChange = {chooseOption('sex')} /> All Genders &nbsp;
            </label>
            <label>
                <input type = 'checkbox' name = 'sex' value = 'Males' onChange = {chooseOption('sex')} /> Males &nbsp;
            </label>
            <label>
                <input type = 'checkbox' name = 'sex' value = 'Females' onChange = {chooseOption('sex')} /> Females
            </label>
            </>
        </Div>
        </>
    )
}

export default Filter
