import React from 'react';
import Link from 'next/link'
import classNames from 'classnames';

import ResumeStyles from "@styles/Resume.module.scss";


export default function Resume() {
    return (
    <div className={classNames(ResumeStyles.main, ResumeStyles.mainRaised)}>
        <div className={ResumeStyles.container}>
            <br />
            <br />
            <h1 className={ResumeStyles.title}>Ethan Hicks</h1>
            <h3 className={ResumeStyles.subtitle}>
                <div style={{float: "left"}} className={ResumeStyles.links}> <Link href="/">ethanhicks.com</Link></div>
                <div style={{float: "right"}}> <a href="https://github.com/et-hicks"className={ResumeStyles.links}>github.com/et-hicks</a></div>
            </h3>
            <h3 className={ResumeStyles.subtitle} > Contact me on the home page</h3>
            <h3 className={ResumeStyles.subtitle} style={{fontSize: "1.75rem", borderTop: "1px solid #3C4858", borderBottom: "1px solid #3C4858"}}>Education</h3>
            <h3 className={ResumeStyles.subtitle}>
                <div style={{float: "left"}}> University of California, Berkeley</div>
                <div style={{float: "right"}}> Aug 2016 - Dec 2020</div>
                <br /><br />
            </h3>
            <h3 className={ResumeStyles.subtitle} style={{fontSize: "1.75rem", borderTop: "1px solid #3C4858", borderBottom: "1px solid #3C4858"}}>Skills</h3>
            <div className={ResumeStyles.row}>
                <div className={ResumeStyles.column}>
                    <h4 style={{color: "#3C4858"}}>Programming Languages</h4>
                    <p className={ResumeStyles.paragraphs}>
                        <table >
                            <tr>
                                <td>Python&nbsp;</td>
                                <td>Typescript</td>
                                <td>Go</td>
                            </tr>
                            <tr >
                                <td>Javascript&nbsp;</td>
                                <td>C/C++ </td>
                                <td>Java</td>
                            </tr>
                            <tr>
                                <td>Verilog&nbsp;</td>
                                <td>Swift</td>
                                <td>Bash</td>
                            </tr>
                        </table>
                    </p>
                </div>
                <div className={ResumeStyles.column}>
                    <h4 style={{color: "#3C4858"}}>Frameworks</h4>
                    <p className={ResumeStyles.paragraphs}>

                    <table >
                            <tr>
                                <td>OpenCV&nbsp;</td>
                                <td>Flask</td>
                                <td>TensorFlow</td>
                            </tr>
                            <tr >
                                <td>Matplotlib&nbsp;</td>
                                <td>Pandas</td>
                                <td>Keras</td>
                            </tr>
                            <tr>
                                <td>React&nbsp;</td>
                                <td>Express</td>
                                <td>Node</td>
                            </tr>
                        </table>
                    </p>
                </div>
                <div className={ResumeStyles.column}>     
                    <h4 style={{color: "#3C4858"}}>Technologies</h4>
                    <p className={ResumeStyles.paragraphs}>
                        <table >
                            <tr>
                                <td >Git/GitHub</td>
                                <td >&nbsp;Docker</td>
                                <td >VS Code </td>&nbsp;
                            </tr>
                            <tr >
                                <td >PostgreSQL</td>
                                <td >&nbsp;GraphQL</td>
                                <td >&nbsp;Ubuntu/CentOS</td>
                            </tr>
                            <tr>
                                <td >npm</td>
                                <td >&nbsp;pip</td>
                                <td >GCP/AWS</td> 
                            </tr>
                        </table>
                  </p>
                </div>
            </div>
            <h3 className={ResumeStyles.subtitle} style={{fontSize: "1.75rem", borderTop: "1px solid #3C4858", borderBottom: "1px solid #3C4858"}}>Experience</h3>
            <h4 style={{color: "blue"}}>
                <div style={{float: "left", color: "blue"}}> <a href="https://varty.io">Varty.io</a></div>
                <div style={{float: "right", fontStyle: "italic", color: "#3C4858"}}> June 2020 - Present</div>
            </h4>
            <br />
            <h5 style={{color: "#3C4858"}}>
                <div style={{float: "left"}}> Full Stack Engineer</div>
                <div style={{float: "right", fontStyle: "italic"}}> Free floating video conferencing aimed at natural conversations</div>
            </h5>
            <br />
            <ul className={ResumeStyles.paragraphs}>
                <li>Boosted average user retention by 50% (10 mins) over 3 months by creating movable avatars embedded with user video streams to make conversations easier and more personable, overall increasing customer satisfaction and leading directly to new user sign ups as the platform spreads</li>
                <br />
                <li>Reduced page load time by 100 to 1500 milliseconds in 2 weeks by integrating WebPack and Cloudflare onto the platform, further providing quick, reliable access to Varty.io from around the globe through Cloudflare’s CDN</li>
                <br />
                <li>Eliminated wasted server storage by 40% (20mb per room across hundreds of rooms) by implementing WebSocket-based client-server communication to monitor user disconnects, reducing overall monthly server costs by 5%, and creating a platform to monitor connection issues, reducing disconnect probability by 60%</li>
            </ul>
            <h5 style={{color: "#3C4858"}}>
                <div style={{float: "left"}}> Data Engineer</div>
            </h5>
            <br />
            <ul className={ResumeStyles.paragraphs}>
                <li>Engineered Varty.io data analytics measured by creating and managing a new NoSQL database to fill up with user tracking data by implementing user interaction and conversation tracking across every major website page</li>
                <br />
                <li>Gained dozens of new clients over 4 months by querying and providing KPIs in both numeric and graphed forms</li>
                <br />
                <li>Trained two interns to develop and program web scraping software, resulting in 30K+ more business and marketing leads for the sales representatives to connect with, successfully making at least 10 connections with potential investors</li>
            </ul>
            <h4 >
                <div style={{float: "left", color: "#3C4858"}}> CS 61B: Algorithms and Data Structures</div>
                <div style={{float: "right", fontStyle: "italic", color: "#3C4858"}}> May 2019 – August 2019</div>
            </h4>
            <br />
            <h5 style={{color: "#3C4858"}}>
                <div style={{float: "left"}}> Academing Intern</div>
                <div style={{float: "right", fontStyle: "italic"}}> University of California, Berkeley</div>
            </h5>
            <br />
            <ul className={ResumeStyles.paragraphs}>
                <li>Mentored 10 students throughout the semester, resulting in each receiving an overall course score at least ½ grade point higher than the course mean, with several students receiving an A+</li>
                <br />
                <li>Created an inclusive and curious learning environment, measured by forming 7+ long lasting project groups between students by working alongside two other interns and a leading teaching assistant in lab class</li>
            </ul>
            <h3 className={ResumeStyles.subtitle} style={{fontSize: "1.75rem", borderTop: "1px solid #3C4858", borderBottom: "1px solid #3C4858"}}>Selected Project</h3>
            <h4 >
                <div style={{float: "left", color: "#3C4858"}}> Robotics @ Berkeley, <span className={ResumeStyles.links}><a href="https://github.com/ethanburrell/simulator_donkey">Self-Driving Car Simulator</a></span></div>
                <div style={{float: "right", fontStyle: "italic", color: "#3C4858"}}> Aug 2019 – May 2020</div>
            </h4>
            <br />
            <h5 style={{color: "#3C4858", paddingBottom: "5px"}}>
                <div style={{float: "left"}}> Software Engineering Club Member</div>
                <div style={{float: "right", fontStyle: "italic"}}> University of California, Berkeley</div>
            </h5>
            <ul className={ResumeStyles.paragraphs}>
                <li>Improved virtual self-driving car race speeds by 40+ seconds by developing stereoscopic video in the computer vision pipeline, allowing for the creation of a depth map, and resulting in reduced swerving to stay on track</li>
                <br />
                <li>Won second place of 8 universities at a virtual donkey simulator race by overhauling driving algorithm from point-to-point to reinforcement learning driving</li>
            </ul>
            <h3 className={ResumeStyles.subtitle} style={{fontSize: "1.75rem", borderTop: "1px solid #3C4858", borderBottom: "1px solid #3C4858"}}>Futher Interests</h3>
            <h5 style={{color: "#3C4858", paddingBottom: "5px"}}>
                <div style={{float: "left", fontSize: "1rem"}}> Hobbies &amp; Interests</div>
                <div style={{float: "right", fontSize: ".85rem"}}> Backpacking, Camping, Lumberjack, Marvel Cinematics, Skateboarding, Reading</div>
            </h5>
            <br /><br /><br /><br />
        </div>
    </div>
    );
}