import {motion} from 'framer-motion'

import styles from './Hero.module.css'
import Box from './Box'

export default function Hero({scroll}) {

    const times = 25

    const variants = {
        visible: {
            opacity: 1,
            transition: {
                duration: 2
            }
        },
        hidden: {
            opacity: 0.4,
        }
    }

    return (
        <motion.header initial='hidden' animate='visible' variants={variants} className={styles.container} style={{top: `-${scroll < 1000 ? scroll / 10 : 100}px`}}>
            {
                [...Array(times)].map((e, i) => <Box key={i}/>)
            }
            <div className={styles.textbox}>
                <h1 className={styles.title}>StudioSAN</h1>
                <h3 className={styles.tagline}>Digital Strategy & Web Development</h3>
            </div>
        </motion.header>
    )
}