import React from 'react'
import classNames from 'classnames';

import Meta from "@Customs/Meta";

import WebPaint from "@components/Painting/WebPaint"

import PaintingStyles from '@styles/Paint/PaintingStyles.module.scss';

export default function PaintView() {
    
    return (
        <div className={classNames(PaintingStyles.main, PaintingStyles.mainRaised)}>
            <Meta title={"Paint"} 
            description={"Very simple browser representation of a Painting tool"}
            keywords={"Ethan, Hicks, Ethan Hicks, Software, Paint, HTML Canvas, Draw, Paint, Edit, Picture"}
            />
           <div className={PaintingStyles.container}>
                <br />
                <br />
                <br />
                <h1 className={PaintingStyles.title}>Broswer Version of Paint</h1>
                <WebPaint />
                <p className={PaintingStyles.paragraphs}>
                MS Paint was an old tool from another generation. Long since outdated, its place in the hearts
                of many still lives on. I wanted to spend an afternoon creating a basic version of paint for the
                browser. Just a simple one, where people can either draw from scratch or draw on top of an existing 
                image.
                </p>
                <p className={PaintingStyles.paragraphs}>
                For an afternoon of work, it came out pretty ok. In the future I might decide to add onto it,
                and create a fully fledged version of Paint in the browser, but for now I think it's in a 
                good stopping place.
                </p>
                <br />
           </div>
        </div>
    );
}