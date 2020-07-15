import {useState, useEffect, useRef} from 'react'
import {motion} from 'framer-motion'

import styles from './Main.module.css'

export default function Main({content, scroll}) {
    const [pos, setPos] = useState(-1)

    const webRef = useRef(null)
    const ecomRef = useRef(null)
    const digiRef = useRef(null)

    const refs=[webRef, ecomRef, digiRef]

    useEffect(() => {
        handleScroll(webRef)
    })

    const handleScroll = () => {
        const webD = window.innerHeight + scroll
        const webB = (webRef.current.offsetTop + webRef.current.clientHeight * 0.3)
        if ((webD > (webB + (webRef.current.clientHeight * 2))) && pos <= 2) {
            setPos(2)
        } else if (webD > (webB + webRef.current.clientHeight) && pos <= 1) {
            setPos(1)
        } else if (webD > webB) {
            setPos(0)
        }
    }

    const variants = {
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                duration: 1
            }
        },
        hidden: {
            opacity: 0,
        }
    }

    return (
        <>
            {
                content.map((con, i) => {
                    return (
                        <motion.div animate={pos >= i ? 'visible' : 'hidden'} initial='hidden' variants={variants} ref={refs[i]} className='section-container'>
                            <motion.div variants={variants} className={`${i % 2 === 1 ? styles.right : styles.left} ${styles.container}`}>
                                <h2 className={styles.header}>{con.title}</h2>
                                <h2 className={styles.tagline}>{con.tagline}</h2>
                                <p className={styles.text}>
                                    {con.content}
                                </p>
                            </motion.div>
                            <motion.img variants={variants} className={`${i % 2 === 0 ? styles.imgRight : styles.imgLeft} ${styles.img}`} src={con.img} alt={con.title + ' on Computer Screen'} />
                        </motion.div>
                    )
                })
            }
        </>
    )

    
}