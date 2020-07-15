import styles from './Review.module.css'

import { useState, useEffect, useRef } from 'react'
import {motion} from 'framer-motion'

export default function Review({scroll}) {

    const [visible, setVisible] = useState(false)

    const reviewRef = useRef(null)

    useEffect(() => {
        handleScroll(reviewRef)
    })

    const handleScroll = (e) => {
        const revD = window.innerHeight + scroll
        const revB = (reviewRef.current.offsetTop + reviewRef.current.clientHeight * 0.3)
        if (revD > revB) {
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
        <div ref={reviewRef} className={styles.container}>
            <div className={styles.cont}>
                <motion.div animate={visible ? 'visible' : 'hidden'} initial='hidden' variants={variants}>
                    <h2 className={styles.header}>
                        EXCEPTIONAL WORK
                    </h2>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <motion.div animate={visible ? 'wide' : 'short'} initial='short' variants={variants}className={styles.divider} />
                    </div>
                    <p className={styles.text}>
                        " Creative, intelligent, and easy to work with. A web developer who actually respects timelines and completes work properly and efficiently.
                    </p>
                    <p className={styles.text} style={{marginTop: '1rem'}}>
                        We at Vibe Coffee are so happy with the work provided. "
                    </p>
                    <p className={styles.header} style={{fontSize: '1.3rem', marginTop: '2rem'}}>
                        - Vibe Coffee
                    </p>
                </motion.div>
            </div>
        </div>
    )
}