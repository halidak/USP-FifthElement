import React, { useEffect, useState } from "react"
import "./About.css"
import AboutPicture from "./AboutPicture"
import AvailableNotice from "./AvailableNotice"
import Label from "./Label"

const About = (props) => {
  return (
    <>
      <section className='about'>
        <AboutPicture />
        <Label setSearch={props.setSearch} setLocationSearch={props.setLocationSearch} setJobTypeSearch={props.setJobTypeSearch}/>
        <AvailableNotice search={props.search} locationSearch={props.locationSearch} jobTypeSearch={props.jobTypeSearch}/>
      </section>
    </>
  )
}

export default About