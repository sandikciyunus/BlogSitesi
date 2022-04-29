import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [posts,setPostData]=useState([]);
  const [offset, setOffset] = useState(0);
const [perPage] = useState(6);
const [pageCount, setPageCount] = useState(0)
useEffect(() => {
  const fetchData = async () => {
  const response = await fetch('http://10.10.10.25:5050/posts')
  const list = await response.json()
  setPageCount(Math.ceil(list.posts.length/perPage))
  setPostData(list.posts.slice(offset, offset+perPage))
  }
  fetchData()
}, [offset])

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage*perPage)
  }
 
  return (
      <div>
<div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <h2>Bloglar</h2>
          </div>
        </div>
        <div className="row">
          {
            posts.map((i,k)=>{
return(
  <div key={i.Id} className="col-lg-4 mb-4">
  <div className="entry2">
    <a><img src={i.Image} alt="Image" className="img-fluid rounded"></img></a>
    <div className="excerpt">
    <span className="post-category text-white bg-secondary mb-3">{i.categoryName}</span>

    <h2><a href={"post/"+i.Id}>{i.Title}</a></h2>
    <div className="post-meta align-items-center text-left clearfix">
      <span>{ new Date(i.PublishDate).toLocaleDateString()}</span>
    </div>
    
      <p>{i.ContentSummary}</p>
      <p><a href={"post/"+i.Id}>Daha Fazla</a></p>
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

export default Home
