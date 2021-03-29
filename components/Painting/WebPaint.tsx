import React, {useState, useRef, useEffect} from 'react';


import PaintingStyles from '@styles/Paint/PaintingStyles.module.scss'


export default function WebPaint() {

    const canvasRef = useRef<HTMLCanvasElement>();

    const [pointerDown, setPointerDown] = useState(false)

    const pointerDownFunc = (e: any) => {
        // console.log("pointer down, and the event is: ", e);
        setPointerDown(true);
    }

    const pointerUpFunc = () => {
        // console.log("pointer up");
        setPointerDown(false);
    };

    const pointerLeave = () => {
        // console.log("left");
        setPointerDown(false)
    }

    const mouseMoving = (e) => {
        // console.log("we have a pressed, moving mouse, with event e: ", e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'black'
        /**
         * not screenX, screenY
         * layerX, layerY WORK
         * not clientX, clientY
         * not pagex, pagey
         */
        ctx.fillRect(e.layerX, e.layerY, 10, 10);
    }

    useEffect(() => {

        if (pointerDown) canvasRef.current.addEventListener("mousemove", mouseMoving)

        return () => {
            // clearInterval(paintFunc);
            if (pointerDown) canvasRef.current.removeEventListener("mousemove", mouseMoving)
        }
    }, [pointerDown])


    useEffect(() => {

        // Remember, this logic is currently frozen in place
        // as it is not reset on the rerenders
        canvasRef.current.addEventListener("pointerdown", pointerDownFunc);
        canvasRef.current.addEventListener("pointerup", pointerUpFunc)
        canvasRef.current.addEventListener("pointerleave", pointerLeave)

        return () => {
            canvasRef.current.removeEventListener("pointerdown", pointerDownFunc);
            canvasRef.current.removeEventListener("pointerup", pointerUpFunc);
            canvasRef.current.removeEventListener("pointerleave", pointerLeave);
        };
    }, []);

    
    return (
        <div>
            Web Paint
            <div>
                <canvas id="painting" ref={canvasRef} className={PaintingStyles.artCanvas} height={500} width={500}></canvas>
            </div>
        </div>
    )
}