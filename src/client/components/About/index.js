import { useState, useEffect, useRef } from 'react'
import {motion} from 'framer-motion'

import styles from './About.module.css'

export default function About({scroll}) {

    const [visible, setVisible] = useState(false)

    const aboutRef = useRef(null)

    useEffect(() => {
        handleScroll(aboutRef)
    })

    const handleScroll = (e) => {
        const abtD = window.innerHeight + scroll
        const abtB = (aboutRef.current.offsetTop + aboutRef.current.clientHeight * 0.3)
        if (abtD > abtB) {
            setVisible(true)
        }
    }

    const variants = {
        visible: {
            opacity: 1,
            transition: {
                duration: 2
            }
        },
        wide: {
            opacity: 1,
            width: '80%',
            transition: {
                duration: 2
            }
        },
        short: {
            width: '20%', 
            opacity: 0,
        },
        hidden: {
            opacity: 0,
        }
    }

    return (
        <div ref={aboutRef} className={styles.container}>
            <div className={styles.cont}>
                <motion.div animate={visible ? 'visible' : 'hidden'} initial='hidden' variants={variants}>
                    <img className={styles.logo} src='/logo-sm.png' alt='StudioSAN logo image' />
                    <h2 className={styles.header}>
                        CUSTOMER EXPERIENCES
                        <br />
                        That Drive Results
                    </h2>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <motion.div animate={visible ? 'wide' : 'short'} initial='short' variants={variants}className={styles.divider} />
                    </div>
                    <p className={styles.text}>
                        We create engaging customer experiences that elevate your brand and digital presence.
                    </p>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <motion.div animate={visible ? 'wide' : 'short'} initial='short' variants={variants}className={styles.divider} />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}