import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

import styles from './Contact.module.css'

import firebase from 'firebase/app';
import 'firebase/functions';

firebase.initializeApp({
    apiKey: "AIzaSyCyCIacGnPkuolL5r6A4emsM4vBC2FMSTE",
    authDomain: "studiosan-website.firebaseapp.com",
    databaseURL: "https://studiosan-website.firebaseio.com",
    projectId: "studiosan-website",
});
  
const functions = firebase.functions();

export default function Contact({animate, initial, variants}) {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [notification, setNotification] = useState(null)

    const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' })
    
    useEffect(() => {
        if (loading && notification === null) {
            handleSend()
        } else {
            setLoading(false)
        }
    }, [loading, notification])

    useEffect(() => {
        if (!loading && result) {
            const timeout = setTimeout(() => {
                setResult(null)
            }, 5000)
        } else if (loading && result) {
            setContactData({ name: '', email: '', subject: '', message: '' })
        } 
    }, [loading, result])

    useEffect(() => {
        if (result) {
            setLoading(false)
        } 
    }, [result])

    useEffect(() => {
        if (notification) {
            const timeout = setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }, [notification])

    const handleInput = (e, limit) => {
        const reg = /[&<>"'/]/ig;
        if (e.target.value.match(/[&<>"'/]/ig) === null && e.target.value.length < limit) {
            const original = {...contactData}
            original[e.target.name] = e.target.value
            setContactData({...original})
        }
    }

    const handleSend = () => {
        if (contactData.name.length > 1 && contactData.email.length > 1 && contactData.subject.length > 1 && contactData.message.length > 1) {
            const addMessage = firebase.functions().httpsCallable('addMessage');
            addMessage({...contactData}).then((result) => {
                if (result.data.status === 'success') {
                    setResult(result.data.status)
                } else {
                    setNotification({ type: 'Error', message: 'Unable to send message due to a network error.' })
                }
            }).catch(e => {
                setNotification({ type: 'Error', message: 'Unable to send message due to a network error.' })
            });
        } else {
            setNotification({ type: 'Error', message: 'Unable to send message, please ensure all fields are filled.' })
        }
    }

    const vari = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.5
            }
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <motion.div animate={animate} initial={initial} variants={variants} className={styles.container}>
            <h3 style={{textAlign: 'center'}} className='heading-md'>Contact</h3>
            <div className={styles.formrow}>
                <input placeholder='Name' disabled={loading} name='name' type='text' value={contactData.name} onChange={(e) => handleInput(e, 30)} className={styles.fieldSm}></input>
                <input placeholder='Email' disabled={loading} name='email' type='email' value={contactData.email} onChange={(e) => handleInput(e, 100)} className={styles.fieldSm}></input>
            </div>
            <div className={styles.formrow}>
                <input placeholder='Subject' disabled={loading} name='subject' type='text' value={contactData.subject} onChange={(e) => handleInput(e, 100)} className={styles.fieldLg}></input>
            </div>
            <div className={styles.textarea}>
                <textarea placeholder='Message' disabled={loading} name='message' value={contactData.message} onChange={(e) => handleInput(e, 2000)} type='text' className={styles.fieldLg}></textarea>
            </div>
            <div className={styles.formrow}>
                {
                    loading
                        ?
                            <div className={styles.submit}>
                                <div animate={'visible'} initial={'hidden'} variants={vari} className={styles.loader} />
                            </div>
                        :   
                            
                            <div onClick={() => { 
                                    if (result !== 'success') {
                                        setLoading(true)
                                    }
                                }
                            } className={result === 'success' ? styles.thanks : styles.submit}>
                                <motion.h4 animate={'visible'} initial={'hidden'} variants={vari} >{result === 'success' ? 'THANK YOU' : 'SEND'}</motion.h4>
                            </div>
                }     
            </div>
            <motion.div animate={notification ? 'visible' : 'hidden'} variants={vari} className={styles.error}>
                <h4 style={{color: 'rgb(187, 4, 4)', fontVariant: 'small-caps'}}>{notification ? notification.type : null}</h4>
                <p style={{marginTop: '0.5rem', fontSize: '0.8rem'}}>{notification ? notification.message : null}</p>
            </motion.div>
        </motion.div>
    )
}