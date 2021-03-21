/*eslint-disable*/
import React from "react";
import Link from 'next/link';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../components/CustomButtons/Button";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

// import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

// const useStyles = makeStyles(styles);

import FooterStyles from "../../styles/Footer.module.scss";


export default function Footer(props) {
  // const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames(FooterStyles.footer, FooterStyles.footerWhiteFont);
  const aClasses = classNames(FooterStyles.a, FooterStyles.footerWhiteFont);
  return (
    <footer className={footerClasses}>
      <div className={FooterStyles.container}>
        <div className={FooterStyles.left}>
          <List className={FooterStyles.list}>
            <ListItem className={FooterStyles.inlineBlock}>
              <Link href="/">
                <Button>
                  Home Page
                </Button>
              </Link>
            </ListItem>
          </List>
        </div>
        <div className={FooterStyles.right}>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite className={FooterStyles.icon} /> by{" "}
            For me to get a job
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
