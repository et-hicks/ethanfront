import React from 'react';
import dynamic from 'next/dynamic';

import Meta from './Meta';

import Footer from "../components/Footer/Footer.js";

const Header = dynamic(() => import("../components/Header/Header.js"), { ssr: false });
const HeaderLinks = dynamic(() => import("../components/Header/HeaderLinks.js"), { ssr: false });

import layoutStyles from '../styles/Layout.module.css';

const Layout = ({ children }: any)=> {
    return (
        <>
            <Meta />
            <Header
                brand="Ethan Hicks' Homepage"
                rightLinks={<HeaderLinks />}
                fixed
                color="white"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
            />
            <div className={layoutStyles.container}> 
                <main className={layoutStyles.main}>
                    {children}
                </main>
            </div>
            <Footer />
        </>
    );
};


export default Layout;