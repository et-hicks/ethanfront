import React from 'react'
import classNames from "classnames";
import PathFinder from "../views/PathFinder/PathFinder"

import Meta from "../Customs/Meta"


import PathFindingStyles from "../styles/PathFinder/PathFinding.module.scss"

export default function paths() {
    
    return (<div className={classNames(PathFindingStyles.main, PathFindingStyles.mainRaised)}>
        <Meta title={"Path Finding"} 
            keywords={"Ethan Hicks, software, path finding, a star, path, javascript, demo, software"}
            description={"Demo of the A Star Algorithm"} />
        <div className={PathFindingStyles.container}>
            <br />
            <br />
            <PathFinder />
        </div>
    </div>)


}