import { useState } from 'react'
import styles from './App.module.css'
import { Toggle } from './Components/Toggle'
import { SideBar } from './Components/SideBar'
import { ReChart } from './Components/ReChart'
import { ChartJSChart } from './Components/ChartJSChart'

function App() {

  const [sideBar, setSideBar] = useState(true);

  const handleClickMenu = () => {
    setSideBar(prev => !prev)
  };

  const [chartPrecision, setChartPrecision] = useState(false);

  return (
    <main className={styles.MainContainer}>
      <header className={styles.titleContainer}>
        <img className={sideBar ? styles.rotate : ''} src="vite.svg" alt="menu" onClick={handleClickMenu} />
        <h1>Production Chart - Excel</h1>
        <div className={styles.ToggleContainer}>
          <h3>Maggiore precisione</h3>
          <Toggle state={chartPrecision} toggleFunction={setChartPrecision}/>
        </div>

      </header> 
      <SideBar open={sideBar}/>
      <div className={styles.ChartContainer}>
        <ReChart precision={chartPrecision} />
        {/*<ChartJSChart />*/}
      </div>
    </main>
  )
}

export default App
