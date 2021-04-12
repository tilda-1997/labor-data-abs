import React from "react";

const Sex_group: React.FC = () => {

    return (
        <>
        <label>
            <input type='checkbox' name='sex' /> All Genders &nbsp; 
        </label>
        <label>
            <input type='checkbox' name='sex' /> Males &nbsp;
        </label>
        <label>
            <input type='checkbox' name='sex' /> Females
        </label>

        </>
    )
}

export default Sex_group