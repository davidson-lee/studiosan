import Head from 'next/head'

import { useState, useEffect } from 'react'

import Hero from '../components/Hero'
import About from '../components/About'
import Main from '../components/Main'
import Review from '../components/Review'
import Footer from '../components/Footer'
import Legal from '../components/Legal'

import data from '../data'

export default function Home() {

  const [scroll, setScroll] = useState(0)

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  })

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  return (
    <div className="container">
      <Head>
        <title>Digital Strategy - Web Development | StudioSAN</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/qwq3dqp.css" />
        <meta name="description" content='StudioSAN is a Toronto based digital agency specializing in delivering custom digital strategy, ecommerce, and web development solutions.' />
      </Head>

      <Hero scroll={scroll} />

      <div className='top-fix' />

      <About scroll={scroll} />

      <main>
        <Main content={data} scroll={scroll} />
      </main>

      <Review scroll={scroll}/>

      <Footer scroll={scroll}/>
      <Legal />

    </div>
  )
}
