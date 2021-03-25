import React from 'react'
import classNames from "classnames";
import PathFinder from "../views/PathFinder/PathFinder"

import PathFindingStyles from "../styles/PathFinder/PathFinding.module.scss"

export default function paths() {
    
    return (<div className={classNames(PathFindingStyles.main, PathFindingStyles.mainRaised)}>
        <div className={PathFindingStyles.container}>
            <br />
            <br />
            <PathFinder />
        </div>
    </div>)


}