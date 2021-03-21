import React, { useState } from "react";
import dynamic from 'next/dynamic';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
// import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button";

// import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const Parallax = dynamic(() => import("../../components/Parallax/Parallax.js"), {ssr: false})

const dashboardRoutes = [];

import landingPageStyles from "../../styles/LandingPage.module.scss"
import Footer from "../../components/Footer/Footer.js";

export default function LandingPage(props) {
  const [counter, setCounter] = useState(0)
  return (
    <div>

      <Parallax filter image={require("../../public/img/BucksAndThompson.jpg")}>
        <div className={landingPageStyles.container} >
          {/* @ts-ignore */}
          <GridContainer justify={"center"} style={{padding: "70px 0"}}>
            {/* @ts-ignore */}
            <GridItem xs={12} sm={12} md={8} >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <h1 className={landingPageStyles.title} style={{background: "rgba(255, 255, 255, 0.7)", fontSize: "80px", textAlign: "center"}}>&nbsp;Ethan Hicks&nbsp;</h1>
              {/* <br /> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <h1 className={landingPageStyles.title} style={{background: "rgba(255, 255, 255, 0.7)", padding:"-15px 0em 0em 0em", color:"#515451", textAlign: "center", fontFamily:`BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`}}>&nbsp;Software Engineer&nbsp;</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(landingPageStyles.main, landingPageStyles.mainRaised)}>
        <div className={landingPageStyles.container}>
          <ProductSection />
          {/* <TeamSection /> */}
          <WorkSection />
        </div>
      </div>
    </div>
  );
}
