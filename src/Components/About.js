import React, { useEffect, useState } from 'react'
import axios from 'axios';
const About = () => {
    const [about,setAboutData]=useState({});
    useEffect(()=>{
        const getAbout=async()=>{
          var response=await axios.get("http://10.10.10.25:5050/abouts");
          setAboutData(response.data.about);
        }
        getAbout();
      },[]);

      
  return (
    <div>
    <div className="site-cover site-cover-sm same-height overlay single-page" style={{ backgroundImage: `url("images/img_4.jpg")` }}>
      <div className="container">
        <div className="row same-height justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="post-entry text-center">
              <h1 className="">Hakkımda</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    <div className="site-section bg-light">
      <div className="container">
        <div className="row">
          
          <div className="col-md-12 mr-auto order-md-1">
            <p>{about.Description}</p>            
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default About;
