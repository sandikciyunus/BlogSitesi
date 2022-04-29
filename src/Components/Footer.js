import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Footer = () => {

  const [contact,setContactData]=useState({});


  useEffect(()=>{
    const getContact=async()=>{
      var response=await axios.get("http://10.10.10.25:5050/contacts");
      setContactData(response.data.contact);
    }
    getContact();
  },[]);

  return (
    <div className="site-footer">
    <div className="container">
      <div className="row mb-5">
       
        <div className="col-md-8 ml-auto">
          <ul className="list-unstyled float-left mr-5">
            <li><a href="/about">Hakkımda</a></li>
          </ul>
        </div>
        <div className="col-md-4">
          

          <div>
            <h3 className="footer-heading mb-4">İletişim</h3>
            <p>
              <a href={contact.Linkedin} target="_blank"><span className="icon-linkedin p-2"></span></a>
              <a href={contact.Github} target="_blank"><span className="icon-github p-2"></span></a>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <p>
          Copyright © 2022 Tüm Hakları Saklıdır
            </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Footer
