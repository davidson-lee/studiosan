import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

export default function Box() {

    const [exists, setExists] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setExists(false)
        }, 3000)
    })

    const variants = {
        visible: {
            width: '100%',
            height: '100%',
            opacity: 1
        },
        hidden: {
            width: 0,
            height: 0,
            opacity: 0,
            transition: {
                delay: Math.random() * 1.5,
                duration: 1.5
            }
        }
    }

    return (
        <>
            {
                exists
                    ?
                        <div 
                            className='box-container'
                        >
                            <motion.div
                                className='box'
                                initial='visible'
                                animate='hidden'
                                variants={variants}
                            />
                        </div>
                    :
                        null
            }
        </>
        
    )
}