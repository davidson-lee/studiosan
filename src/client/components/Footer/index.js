import {useState, useEffect, useRef} from 'react'
import {motion} from 'framer-motion'

import styles from './Footer.module.css'
import Contact from '../Contact'

export default function Footer({scroll}) {

    const [visible, setVisible] = useState(false)

    const footerRef = useRef(null)

    useEffect(() => {
        handleScroll(footerRef)
    })

    const handleScroll = (e) => {
        const currentPos = window.innerHeight + scroll
        const bound = (footerRef.current.offsetTop + footerRef.current.clientHeight * 0.2)
        if (currentPos > bound) {
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
        hidden: {
            opacity: 0,
        }
    }

    return (
        <footer ref={footerRef} className={styles.container}>
            <motion.div animate={visible ? 'visible' : 'hidden'} initial='hidden' variants={variants} className={styles.about}>
                <img className={styles.logo} src='/logo.png' alt='StudioSAN Logo' />
                <p className={styles.header}>
                    Let's Work Together
                </p>
                <p className={styles.text}>
                    Every business is different.
                    <br />
                    Connect with us and find out how we can help you.
                </p>
            </motion.div>
            <Contact animate={visible ? 'visible' : 'hidden'} initial='hidden' variants={variants}/>
        </footer>
    )
}