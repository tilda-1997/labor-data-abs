import './App.css';
import Home from './Components/Home';
import { Intro , Link} from './Components/styled';

function App() {
  return (
    <div    className = "App-header">
    <header className = 'title'>
        <h1> Weekly Payroll Jobs and Wages in Australia (2020~2021) </h1>
        <Intro> This site represents the labour data of Australia during the COVID stage, from Jan 2020 to Jan 2021. 
          The original data comes from ABS (Australian Bureau of Statistics), and the data used in the chart has been preprocessed using python. 
          This chart can dynamically reflect the changes in labour data over time according to time. 
          The filters on the left can select the group of different regions, industries and sex to display in the chart (multiple selections supported). 
          When the chart is being demonstrated, the filter will be disabled. 
          &#10048; Github Link: <Link href='https://github.com/tilda-1997/labor-data-abs'>Repo</Link>
        </Intro>
      </header>
      <Home />
    </div>
  );
}

export default App;
