import Select from 'react-select';
import { Pp, Div } from './styled';
import { industryList } from "./Options";
import State from "./State";
import SexGroup from "./Sex_group";

const Filter:React.FC = () => {


    return(
        <>
        <Div>
            <h2> &equiv; Filter </h2>
            <Pp> &diams; State or Territory</Pp><State />


            <Pp> &diams; Industry</Pp>
            <Select 
            isMulti
            name='industry'
            options={industryList}
            defaultValue={industryList[0]}
            />

            <Pp> &diams; Sex</Pp><SexGroup />
        </Div>
        </>
    )
}

export default Filter
