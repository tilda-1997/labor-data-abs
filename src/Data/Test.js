// import { Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef} from 'react';
// import notebook from '../@d3/chart';

const Test = () => {

    // const ref = useRef<HTMLDivElement>();
    const ref = useRef();

    // useEffect(() => {
    //     const runtime = new Runtime();
    //     runtime.module(notebook, (name) => {
    //     if (name === 'chart') {
    //         return new Inspector(ref.current);
    //     }
    //     });
    //     return () => runtime.dispose();
    // }, []);

    return (
        <div>
            <div ref={ref}></div>
        </div>
    )
}

export default Test