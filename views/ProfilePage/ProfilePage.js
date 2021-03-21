import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
// import Header from "components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import NavPills from "../../components/NavPills/NavPills.js";

const Parallax = dynamic(() => import("../../components/Parallax/Parallax.js"), {ssr: false})

import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <Parallax small filter image={require("../../public/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <Image src="/img/bg.jpg" alt="..." className={imageClasses} layout="fill" objectFit="contain"/>
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Christian Louboutin</h3>
                    <h6>DESIGNER</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Studio",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <Image src="/img/examples/studio-1.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                            <Image src="/img/examples/studio-2.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Image src="/img/examples/studio-5.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                            <Image src="/img/examples/studio-4.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Work",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <Image src="/public/img/examples/olu-eletu.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                            <Image src="/public/img/examples/clem-onojeghuo.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Image src="/public/img/examples/mariya-georgieva.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                            <Image src="/public/img/examples/clem-onojegaw.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <Image src="/public/img/examples/clem-onojegaw.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>                            
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Image src="/public/img/examples/clem-onojegaw.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                            <Image src="/public/img/examples/clem-onojegaw.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                            <Image src="/public/img/examples/clem-onojegaw.jpg" alt="..." className={navImageClasses} layout="fill" objectFit="contain"/>
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
