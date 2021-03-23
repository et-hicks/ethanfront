import React from "react";
import Image from 'next/image'
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import InfoStyles from "../../styles/InfoStyles.module.scss";

export default function InfoArea(props) {

  const { title, description, iconColor, vertical, stringImg, height, width } = props;
  const iconWrapper = classNames({
    [InfoStyles.iconWrapper]: true,
    [InfoStyles[iconColor]]: true,
    [InfoStyles.iconWrapperVertical]: vertical
  });
  const iconClasses = classNames({
    [InfoStyles.icon]: true,
    [InfoStyles.iconVertical]: vertical
  });
  return (
    <div className={InfoStyles.infoArea}>
      <div className={iconWrapper}>
       {props.icon ? 
       <props.icon className={iconClasses} /> : 
      //  <Image src={stringImg} height={height} width={width} className={iconClasses}></Image>}
      <img src={stringImg} alt="something to be shown" height={height} width={width}></img>}
      </div>
      <div className={InfoStyles.descriptionWrapper}>
        <h4 className={InfoStyles.title}>{title}</h4>
        <p className={InfoStyles.description}>{description}</p>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray"
};

InfoArea.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  vertical: PropTypes.bool,
  stringImg: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
