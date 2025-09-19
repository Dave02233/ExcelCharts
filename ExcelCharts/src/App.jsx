import { useState } from 'react'
import styles from './App.module.css'
import { Toggle } from './Components/Toggle'
import { SideBar } from './Components/SideBar'
import { Chart } from './Components/Chart'

function App() {

  const [sideBar, setSideBar] = useState(false);

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
          <h3>Aumenta Precisione</h3>
          <Toggle state={chartPrecision} toggleFunction={setChartPrecision}/>
        </div>

      </header> 
      <SideBar open={sideBar}/>
      <div className={styles.ChartContainer}>
        <Chart precision={chartPrecision} />
      </div>
    </main>
  )
}

export default App
