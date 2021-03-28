import React from "react";
import Image from "next/image";
import Link from "next/link";
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


import ProductSectionStyles from "../../../styles/ProductSection.module.scss"

export default function ProductSection() {

  return (
    <div className={ProductSectionStyles.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <h2 className={ProductSectionStyles.title}>Pathfinding</h2>
          <h5 className={ProductSectionStyles.description}>
            The first programmed section of the website is now up. Check out <Link href="/path-finding"><span style={{color: "blue", cursor: "pointer"}}>Path Finding </span></Link>
            to find the distance between any two points, using the efficient A Star Algorithm.
          </h5>
          <h5 className={ProductSectionStyles.description}>
            I felt it only fitting to use the classic path-finding as the first programmed web page here. Tried and true, it stands as an excellent introduction to
            algorithms in general. Going back, and working through it again was a fantastic trip down memory lane, and also a great way to get warmed up with the site.
          </h5>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <h2 className={ProductSectionStyles.title}>Sudoku</h2>
          <h5 className={ProductSectionStyles.description}>
            The second project is now up, another classic: <Link href="/sudoku"><span style={{color: "blue", cursor: "pointer"}}>the Sudoku Solver</span></Link>. I read the wikipedia page for backtracking, and I knew I had to try it out. The game is playable,
            though I admit most of the thought went into the algorithm rather than the UX of gameplay. I apologize for the clunkyness, and I hope I make up for it in the quick
            automatic solution generation of any puzzle. 
          </h5>
        </GridItem>
      </GridContainer>
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
            Just to point out, no technologies below endorse this site. For more about me, check out my <span className={ProductSectionStyles.links}><Link href="/resume">resume</Link></span>
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="React"
              description="Built for the modern web, React's modularity makes development easier. Coupled with built-in interactivity that comes as expected in the modern web, I have chosen React for my front end."
              iconColor="info"
              stringImg="https://firebasestorage.googleapis.com/v0/b/ethan-hicks.appspot.com/o/baseImages%2Freact-seeklogo.svg?alt=media&token=d12f8d6d-6dc9-40d5-8c19-6f314c44f038"
              height={100}
              width={100}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Nextjs"
              description="While React offers amazing functionality, it lacks on SEO capabilities. To appear high on Google, Nextjs offers the very best. Futhermore, Nextjs's caching capabilites mean time to first byte is as fast as possible so site functionality begins as soon as possible."
              stringImg="https://firebasestorage.googleapis.com/v0/b/ethan-hicks.appspot.com/o/baseImages%2Fnext-js-seeklogo.com.svg?alt=media&token=3f9d5d9c-1723-4ea0-9647-8c0c5242dbf2"
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
              stringImg="https://firebasestorage.googleapis.com/v0/b/ethan-hicks.appspot.com/o/baseImages%2FFirebase_Logo_Standard_Lockup.svg?alt=media&token=a1cc3b16-483d-4a32-b887-3b682fb39760"
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
              stringImg="https://firebasestorage.googleapis.com/v0/b/ethan-hicks.appspot.com/o/baseImages%2FNodejs.png?alt=media&token=418de48b-193b-4ecb-ace8-64933558133e"
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
              stringImg="https://firebasestorage.googleapis.com/v0/b/ethan-hicks.appspot.com/o/baseImages%2FExpressjs.png?alt=media&token=bd3c0ae0-c97d-4305-b882-bb0bc7aa59b7"
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
              stringImg="https://firebasestorage.googleapis.com/v0/b/ethan-hicks.appspot.com/o/baseImages%2FFlask_logo.png?alt=media&token=4b8d8037-6dc7-45d6-9f70-9a23ca46a2b3"
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
