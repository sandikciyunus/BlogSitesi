import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';


const CategoryDetail = () => {
  const params=useParams();
  const [posts,setPostData]=useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0)

  useEffect(()=>{
   const getPosts=async()=>{
      const response = await fetch('http://10.10.10.25:5050/categories/bloglist/'+params.id)
      const list = await response.json()
      console.log(list);
      setPageCount(Math.ceil(list.posts.length/perPage))
      setPostData(list.posts.slice(offset, offset+perPage))
    }
    getPosts();
  },[offset])

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage*perPage)
  }
  return (
    <div>

    <div className="site-section bg-white">
      <div className="container">
        <div className="row">

          {
            posts.map((i,k)=>{
              return (
                <div key={i.Id} className="col-lg-4 mb-4">
                <div className="entry2">
                  <a><img src={i.Image} alt="Image" className="img-fluid rounded"></img></a>
                  <div className="excerpt">
    
                  <h2><a href={"/post/"+i.Id}>{i.Title}</a></h2>
                  <div className="post-meta align-items-center text-left clearfix">
                    <span>{new Date(i.PublishDate).toLocaleDateString()}</span>
                  </div>
                  
                    <p>{i.ContentSummary}</p>
                    <p><a href={"/post/"+i.Id}>Daha Fazla</a></p>
                  </div>
                </div>
              </div>
              )
            })
          }
       
         
      
        </div>
        <ReactPaginate
  previousLabel={"geri"}
  nextLabel={"ileri"}
  breakLabel={"..."}
  breakClassName={"break-me"}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageClick}
  containerClassName={"pagination"}
  subContainerClassName={"pages pagination"}
  activeClassName={"active"}
/>
    </div>
  </div>
    
    </div>
  )
}

export default CategoryDetail
