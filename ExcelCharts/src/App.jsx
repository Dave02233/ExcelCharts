import { useState } from 'react'
import styles from './App.module.css'
import { SideBar } from './Components/SideBar'

function App() {

  const [sideBar, setSideBar] = useState(false);


  const handleClickMenu = () => {
    setSideBar(prev => !prev)
  }

  return (
    <main className={styles.MainContainer}>
      <header className={styles.titleContainer}>
        <img src="vite.svg" alt="menu" onClick={handleClickMenu} />
        <h1>Production Chart - Excel</h1>
        <div></div>
      </header> 
      <SideBar open={sideBar} />
    </main>
  )
}

export default App
