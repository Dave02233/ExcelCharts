import { useEffect, useState } from 'react';
import styles from './Styles/SideBar.module.css'

export const SideBar = ({ open }) => {

    useEffect(() => {
        setVisibility(open);
        console.log(open)
    }, [open])

    const [visibility, setVisibility] = useState(false);

    const handleSubmit = submitEvent => {
        submitEvent.preventDefault();

        const data = new FormData(submitEvent.target);
        const formData = Object.fromEntries(data.entries());

        console.log(formData);
    }

    return (
        <div className={`${styles.SideBarContainer} ${visibility ? styles.open : styles.closed}`}>
            <form onSubmit={handleSubmit}>
                <div className={styles.pathInput}>
                   <h3>Seleziona una cartella:</h3>
                    <input className={styles.pathObject}
                        name="path"
                        type="file"
                        webkitdirectory="true" 
                        directory="true" //fallback per browser di merda
                        multiple
                    />
                </div>
                <div className={styles.dateInput}>
                    <h3>Seleziona le date:</h3>
                    <div className={styles.dateObject}>
                        <div>
                            <h4>Inizio:</h4>
                            <input name='startDate' type="date" />
                        </div>
                        <div>
                            <h4>Fine:</h4>
                            <input name='endDate' type="date" />
                        </div>
                    </div>
                </div>
                <button type='submit'>Cerca</button>
            </form>

            <div className={styles.blackBackground}/>
        </div>
    )
}

