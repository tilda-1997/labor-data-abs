import Select from 'react-select';
import { Pp, Div } from '../styled';
import { industryList } from "./Options";
import State from "./State";
import SexGroup from "./Sex_group";

const Filter:React.FC = () => {
    const customStyle = {
        option: (provided:any, state:any) => ({
            ...provided,
            color: state.isSelected ? '#EC9152' : '#6B5048' ,
            padding: 10,
          }),
    }

    return(
        <>
        <Div>
            <h2> &equiv; Filter </h2>
            <Pp> &#10029; State or Territory</Pp><State />


            <Pp> &#10038; Industry</Pp>
            <Select 
            isMulti
            name         = 'industry'
            options      = {industryList}
            defaultValue = {industryList[0]}
            styles={customStyle}
            />

            <Pp> &#10043; Sex</Pp><SexGroup />
        </Div>
        </>
    )
}

export default Filter
