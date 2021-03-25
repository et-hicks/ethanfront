import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import WorkStyle from "../../../styles/WorkStyle.module.scss";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"; // done with css
import GridItem from "../../../components/Grid/GridItem.js"; // done with css
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button"; // Done with css

import { backendAddress } from "../../../Customs/constants.ts";

export default function WorkSection() {
  
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")

  console.log(email, name, company, message);

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleCompany = (e) => {
    e.preventDefault();
    setCompany(e.target.value);
  }

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handleMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }
  
  const inputEmailProps =  {
    onChange: handleEmail
  }

  const inputNameProps = {
    onChange: handleName
  }

  const inputCompanyProps = {
    onChange: handleCompany
  }

  const submitForm = (e) => {
    e.preventDefault();

    if (email !== "" && name !== "" && company !== "" && message !== "") {
      
      const fd = {
        name: name,
        company: company, 
        email: email,
        message: message
      }
  
      console.log("fd is: ", fd, `${backendAddress}/contactMe`);
      
      
      fetch(`${backendAddress}/contactMe`, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fd)
      }).then(response => {
        return response.json()
      }).then(data => console.log(data))
    }
  }


  return (
    <div className={WorkStyle.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={WorkStyle.title}>Contact Me</h2>
          <h4 className={WorkStyle.description}>
            Said above, I'm actively looking for work. Contact me for a chat. Lets talk about
            Front End, Back End, or Machine Learning work. 
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={8} sm={12} md={12}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={inputNameProps}
                />
              </GridItem>
              <GridItem xs={8} sm={12} md={6}>
                <CustomInput
                  labelText="Company Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={inputCompanyProps}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={inputEmailProps}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Your Message"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                    className: WorkStyle.textArea
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    onChange: handleMessage,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button color="transparent" onClick={submitForm}>Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
