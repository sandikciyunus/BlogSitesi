import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Header = () => {

  const [categories,setCategoryData]=useState([]);
  const [width, setWidth] = useState(window.innerWidth);
   console.log(process.env);
  useEffect(()=>{
    async function getCategories() {
      let response = await axios.get("http://10.10.10.25:5050/categories")
      setCategoryData(response.data.categories)
    }

    getCategories()
  },[]);


useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);
function handleWindowSizeChange() {
  setWidth(window.innerWidth);
}
const isMobile = width <= 768;

  return (
    <div>
        <div className="site-mobile-menu">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div className="site-mobile-menu-body">
      <ul className="site-nav-wrap">
      <li><a href="/">Anasayfa</a></li>
                {
                  categories.map((i,k)=>{
                    return(
                        <li key={i.Id}><a href={"/category/"+i.Id}>{i.Name}</a></li>
                    )
                  })
                }
              </ul>
      </div>
    </div>
    <header className="site-navbar" role="banner">
      <div className="container-fluid">
        <div className="row align-items-center">
          
          <div className="col-12 search-form-wrap js-search-form">
            <form method="get" action="#">
              <input type="text" id="s" className="form-control" placeholder="Search..."></input>
              <button className="search-btn" type="submit"><span className="icon-search"></span></button>
            </form>
          </div>

          <div className="col-4 site-logo">
            <a href="/" className="text-black h2 mb-0">Blog</a>
          </div>

          <div className="col-8 text-right">
            <nav className="site-navigation" role="navigation">
              <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block mb-0">
              {!isMobile?<li><a href="/">Anasayfa</a></li>:null}  
                {
                  categories.map((i,k)=>{
                    return(
                        <li key={i.Id}><a href={"/category/"+i.Id}>{i.Name}</a></li>
                    )
                  })
                }
              
              </ul>
            </nav>
            <a href="#" className="site-menu-toggle js-menu-toggle text-black d-inline-block d-lg-none"><span className="icon-menu h3"></span></a>
            </div>
          </div>

      </div>
    </header>
    </div>
  )
}

export default Header
