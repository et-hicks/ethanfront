import React from "react";
import Image from "next/image";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import SvgIcon from "@material-ui/core/SvgIcon";
// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import InfoArea from "../../../components/InfoArea/InfoArea.js";

import * as ReactIcon from "../../../public/svg/react-seeklogo.svg";


import ProductSectionStyles from "../../../styles/ProductSection.module.scss"

export default function ProductSection() {

  return (
    <div className={ProductSectionStyles.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={ProductSectionStyles.title}>About Me</h2>
          <h5 className={ProductSectionStyles.description}>
            Hello! and welcome to my home page. I graduated from UC Berkeley (Go Bears!)
            in December, 2020 and am actively seeking employment oppurtunies. This small 
            website is where I put up fun projects that I have worked on. Right now it is a 
            bit barren but I'll be actively updating it and adding to when I have time.
            The image was taken by my dad, where he is standing above the heart of the forest I grew up in.
            It's home for me, making it apt to appear on my personal homepage.
          </h5>
          <h5 className={ProductSectionStyles.description}>
            Lets talk about the stack of the website. For the sake of brevity, let's call it the FERNN stack.
            Just to point out, no technologies below endorse this site. 
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="React"
              description="Built for the modern web, React's modularity makes development easier. Coupled with built-in interactivity that comes as expected in the modern web, I have chosed React for my front end."
              iconColor="info"
              stringImg="/svg/react-seeklogo.svg"
              height={100}
              width={100}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Nextjs"
              description="While React offers amazing functionality, it lacks on SEO capabilities. To appear high on Google, Nextjs offers the very best. Futhermore, Nextjs's caching capabilites mean time to first byte is as fast as possible so site functionality begins as soon as possible."
              stringImg="/svg/next-js-seeklogo.com.svg"
              height={100}
              width={100}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Firebase"
              description="Firebase, cause its quick to learn, quick to deploy, and quick to get a site up and running."
              stringImg="/svg/Firebase_Logo_Standard_Lockup.svg"
              height={100}
              width={100}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Nodejs"
              description="Full Stack Javascript might not work in every instance, and certanly doesnt even work in every instance on this site, but its quick, easy, and works in a pinch"
              stringImg="/img/Nodejs.png"
              height={60}
              width={100}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Express"
              description="What even is Full Stack Javascript without express on the backend? The two go hand in hand, and its difficult to use one without the other. "
              stringImg="/img/Expressjs.png"
              height={30}
              width={100}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="More to come"
              description="The site will expand as I add more and more to it. Flask will be added on the backend to take advantace of Python's capabilities (notably in ML). For now, the site lacks this."
              stringImg="/img/Flask_logo.png"
              height={40}
              width={100}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
