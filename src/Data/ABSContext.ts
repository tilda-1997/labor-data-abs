import { createContext } from 'react'
import Abs from './data-d3-new.json'

const AbsContext = createContext(Abs);
export default AbsContext;
export const JSONProvider = AbsContext.Provider;

