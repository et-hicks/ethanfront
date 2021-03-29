import React, {useState, useRef, useEffect} from 'react';

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import { Tooltip } from '@material-ui/core';
import { Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";


import PaintingStyles from '@styles/Paint/PaintingStyles.module.scss'

enum BrushStyle {
    square = 1,
    roundHollow = 2,
    roundFill = 3,
}

export default function WebPaint() {

    const canvasRef = useRef<HTMLCanvasElement>();

    const [pointerDown, setPointerDown] = useState(false);
    const [chosenID, setChosenID] = useState("blackTable");
    const [numChange, setNumChange] = useState(12);
    const [brushStyle, setBrushStype] = useState(BrushStyle.square);

    const [customColor, setCustomColor] = useState({
        red: 0,
        green: 0,
        blue: 0,
    });

    const onlyAllowNumber = (e) => {
        if (!/^\d+$/.test(e.target.value) && e.target.value !== " ") {
            e.target.value = e.target.value.slice(0, -1)
        } else if (e.target.value === "0") {
            e.target.value = e.target.value.slice(0, -1)
        } else {
            setNumChange(parseInt(e.target.value));
        };
    };

    const handleClearCanvas = (e) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 1000, 1000);
    }

    const parseRGB = (e) => {
        const RGBVals = e.target.value.split(/[ ,]+/)
        
        const customTemp = {
            red: parseInt(RGBVals[0]),
            green: parseInt(RGBVals[1]),
            blue: parseInt(RGBVals[2])
        }

        setCustomColor(customTemp);
        if (
            customTemp.red !== NaN && 
            customTemp.blue !== NaN && 
            customTemp.green !== NaN
        ) {
            const chosenTable = document.getElementById("chosenTable")
            chosenTable.style.backgroundColor = `rgb(${customTemp.red}, ${customTemp.green}, ${customTemp.blue})`
        }
    }

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
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // const fileName = file.name;
        // const regex = /(?<=\.)[^.]*$/;
        // const MIMEType = `image/${fileName.match(regex)[0]}`;
        // const imgBlob = new Blob([file], {type: MIMEType});
 
        if (file === null || file === undefined) return

        const img = new Image()

        const imgURL = URL.createObjectURL(file)

        const ctx = canvasRef.current.getContext('2d');

        img.src = imgURL
        img.height = 500
        img.width = 500

        img.onload = () => {
            ctx.drawImage(img, 0, 0)
        }
    }

    const handleDownload = () => {
        console.log("download the canvas as a thing");
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = canvasRef.current.toDataURL().replace("image/png", "image/octet-stream");
        link.click();
    }

    const mouseMoving = (e) => {
        // console.log("we have a pressed, moving mouse, with event e: ", e);
        const ctx = canvasRef.current.getContext('2d');
        switch(chosenID) {
            case "blackTable":
                ctx.fillStyle = 'black';
                ctx.strokeStyle = "black"
                break;
            case "redTable":
                ctx.fillStyle = 'red';
                ctx.strokeStyle = "red"
                break;
            case "orangeTable":
                ctx.fillStyle = 'orange';
                ctx.strokeStyle = "orange"
                break;
            case "yellowTable":
                ctx.fillStyle = 'yellow';
                ctx.strokeStyle = "yellow"
                break;
            case "blueTable":
                ctx.fillStyle = 'blue';
                ctx.strokeStyle = "blue"
                break;
            case "whiteTable":
                ctx.fillStyle = 'white';
                ctx.strokeStyle = "white"
                break;
            case "greenTable":
                ctx.fillStyle = 'green';
                ctx.strokeStyle = "green"
                break;
            case "purpleTable":
                ctx.fillStyle = 'purple';
                ctx.strokeStyle = "purple"
                break;
            case "chosenTable":
                ctx.strokeStyle = `rgb(${customColor.red}, ${customColor.green}, ${customColor.blue})`
                ctx.fillStyle = `rgb(${customColor.red}, ${customColor.green}, ${customColor.blue})`;
                break;
        }
        /**
         * not layerX, layerY
         * not offset
         * not client
         * not screen
         * not page
         * not x, y
         */
        // console.log(e);

        // multiply by two because CSS shrinks this by 2
        if (brushStyle == BrushStyle.square) {
            ctx.fillRect(e.layerX * 2, e.layerY * 2, numChange, numChange);
        } else if (brushStyle == BrushStyle.roundHollow) {
            // ctx.fillRect(e.layerX * 2, e.layerY * 2, numChange, numChange);
            // console.log("round");
            ctx.beginPath();
            ctx.arc(e.layerX * 2, e.layerY * 2, numChange, 0, 2 * Math.PI);
            ctx.stroke();
        } else if (brushStyle == BrushStyle.roundFill) {
            // ctx.fillRect(e.layerX * 2, e.layerY * 2, numChange, numChange);
            // console.log("round");
            ctx.beginPath();
            ctx.arc(e.layerX * 2, e.layerY * 2, numChange, 0, 2 * Math.PI);
            ctx.fill();
        }
        
    }

    const tableClick = (e) => {

        if (chosenID !== "") {
            const prevChosen = document.getElementById(chosenID);

            prevChosen.style.transform = 'scale(1)';
        }

        const id = e.target.id;
        
        const elem = document.getElementById(id);
        if (elem === null) return
        elem.style.transform = 'scale(1.4)';
        elem !== null && setChosenID(id);
        // console.log("clicked on the table: ", id);
    }

    useEffect(() => {

        if (pointerDown) canvasRef.current.addEventListener("pointermove", mouseMoving)

        return () => {
            // clearInterval(paintFunc);
            if (pointerDown) canvasRef.current.removeEventListener("pointermove", mouseMoving)
        }
    }, [pointerDown])


    useEffect(() => {

        // Remember, this logic is currently frozen in place
        // as it is not reset on the rerenders
        canvasRef.current.addEventListener("pointerdown", pointerDownFunc);
        canvasRef.current.addEventListener("pointerup", pointerUpFunc)
        canvasRef.current.addEventListener("pointerleave", pointerLeave)

        return () => {
            canvasRef.current?.removeEventListener("pointerdown", pointerDownFunc);
            canvasRef.current?.removeEventListener("pointerup", pointerUpFunc);
            canvasRef.current?.removeEventListener("pointerleave", pointerLeave);
        };
    }, []);


    const lineThiccness = (
        // @ts-ignore
            <GridItem xs={12} sm={4} md={4} lg={3}>
                <CustomInput
                    labelText="Line Size"
                    id="float"
                    formControlProps={{
                    fullWidth: true,
                    onChange: onlyAllowNumber,
                    }}
                />
            </GridItem>);

    const customRGB = (
    // @ts-ignore
        <GridItem xs={12} sm={4} md={4} lg={3}>
            <CustomInput
                labelText="Custom RGB Value"
                id="float"
                formControlProps={{
                fullWidth: true,
                onChange: parseRGB,
                }}
            />
        </GridItem>);

    const resetPuzzle = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"Clicking this will clear the canvas"} enterDelay={2500}>
            <span>
                <Button onClick={handleClearCanvas}>
                        Clear Canvas
                </Button>
            </span>
        </Tooltip>
        </GridItem>)

    const uploadImageButton = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"Upload an image to paint on"} enterDelay={500}>
           <Button >
                <form onChange={handleImageUpload}>
                    <input type='file' id="imageUpload" accept="image/*"></input>
                </form>
            </Button>
        </Tooltip>
        </GridItem>)

    const downloadButton = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"Upload an image to paint on"} enterDelay={500}>
           <Button onClick={handleDownload}>
                Download as an image
            </Button>
        </Tooltip>
        </GridItem>)

    const colorTable = (
        <GridItem>
            <table style={{height: "20px", width: "300px"}} onClick={tableClick}>
                <tbody>
                    <tr>
                        <td className={PaintingStyles.black} id="blackTable"></td>
                        <td className={PaintingStyles.white} id="whiteTable"></td>
                        <td className={PaintingStyles.red} id="redTable"></td>
                        <td className={PaintingStyles.orange} id="orangeTable"></td>
                        <td className={PaintingStyles.yellow} id="yellowTable"></td>
                        <td className={PaintingStyles.blue} id="blueTable"></td>
                        <td className={PaintingStyles.green} id="greenTable"></td>
                        <td className={PaintingStyles.purple} id="purpleTable"></td>
                        <td style={{backgroundColor: 'rgb(0, 0, 0)'}} id="chosenTable"></td>
                    </tr>
                </tbody>
            </table>
        </GridItem>
    );

    const controller = (<div>
        <FormControlLabel
            control={
                <Radio 
                    checked={brushStyle === BrushStyle.square}
                    value={BrushStyle.square}
                    onChange={() => setBrushStype(BrushStyle.square)}
                />
            }
            label={"Square Brush"}
        />
        <FormControlLabel 
            control={
                <Radio 
                    checked={brushStyle === BrushStyle.roundHollow}
                    value={BrushStyle.roundHollow}
                    onChange={() => setBrushStype(BrushStyle.roundHollow)}
                />
            }
            label={"Round and Hollow"}
        />
        <FormControlLabel 
            control={
                <Radio 
                    checked={brushStyle === BrushStyle.roundFill}
                    value={BrushStyle.roundHollow}
                    onChange={() => setBrushStype(BrushStyle.roundFill)}
                />
            }
            label={"Round and Full"}
        />
    </div>)

    return (
        <div>
                <GridContainer>
                        {lineThiccness}
                        {customRGB}
                        {resetPuzzle}
                    </GridContainer>
                    <GridContainer>
                        {uploadImageButton}
                        {downloadButton}
                    </GridContainer>
                    <GridContainer>
                        {controller}
                        {colorTable}
                </GridContainer>
                <canvas id="painting" 
                ref={canvasRef} 
                className={PaintingStyles.artCanvas} 
                height={1000} width={1000}></canvas>
        </div>
    )
}