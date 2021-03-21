import React from "react";
// react components for routing our app without refresh
import Link from "next/link";
import Image from "next/image";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button";

// import landing from "../../../public/img/landing.jpg";
// import profile from "../../../public/img/profile.jpg";

import styles from "../../../assets/jss/material-kit-react/views/componentsSections/exampleStyle.js";

const useStyles = makeStyles(styles);

export default function SectionExamples() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Link href="/landing-page" className={classes.link}>
              {/* <img
                src={landing}
                alt="..."
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                }
              /> */}
              <a>
              <Image src="/img/landing.jpg" alt="..." layout="fill" objectFit="contain" className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                } />
              <Button color="primary" size="lg" simple>
                View landing page
              </Button>
              </a>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Link href="/profile-page" className={classes.link}>
                <a>
                  <Image src="/img/profile.jpg" alt="..." layout="fill" objectFit="contain" className={
                      classes.imgRaised +
                      " " +
                      classes.imgRounded +
                      " " +
                      classes.imgFluid
                    } />
                  <Button color="primary" size="lg" simple>
                    View profile page
                  </Button>
                </a>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
