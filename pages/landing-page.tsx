import dynamic from 'next/dynamic'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Components from '../views/Components/Components'
import SectionBasics from '../views/Components/Sections/SectionBasics';
import LandingPage from '../views/LandingPage/LandingPage'

// const Components = dynamic(() => import("../views/Components/Components"))


export default function Home() {
  return (<div>
    Landing Page
  </div>);
}
