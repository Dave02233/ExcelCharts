import React from "react";
import styles from './Styles/Toggle.module.css'

export const Toggle = React.memo(
    function Toggle({state, toggleFunction}) {

        const handleClick = () => {
            toggleFunction(prev => !prev)
        }

        return (
        <div onClick={handleClick} className={`${styles.ToggleContainer} ${state ? styles.active : ""}`}>
            <div className={styles.StatusLayer}/>
            <div className={styles.MovingLayer}/>
        </div>
    )
});

