import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
const PostDetail = () => {

    const params=useParams();
    const [post,setPostData]=useState({});
    const [lastFivePosts,setLastFivePostData]=useState([]);
    const [comments,setCommentData]=useState([]);
    const [commentData,setData]=useState({
        PostId:Number(params.id),
        Name:"",
        ContentMain:""
        });
    const [categories,setCategoryData]=useState([]);

    useEffect(()=>{
        const getLastFivePosts=async()=>{
          var response=await axios.get("http://10.10.10.25:5050/posts/post/lastFivePost");
          setLastFivePostData(response.data.posts);
        }
        getLastFivePosts();
    },[])
    useEffect(()=>{
      async function getCategories(){
        var response=await axios.get("http://10.10.10.25:5050/categories");
        setCategoryData(response.data.categories);
      }
      getCategories();
    },[]);    

    useEffect(()=>{
      async function getPostDetail(){
       var response=await axios.get("http://10.10.10.25:5050/posts/"+params.id);
       setPostData(response.data.post);
      }
      getPostDetail();
    },[]);
    useEffect(()=>{
        async function getComments(){
         var response=await axios.get("http://10.10.10.25:5050/posts/comment/getComments/"+params.id);
         setCommentData(response.data.comments);
        }
        getComments();
      },[]);

      const addComment=(e)=>{
          e.preventDefault();
          axios.post("http://10.10.10.25:5050/posts/addComment",commentData);
          window.location.reload();
      }
  return (
   <div>
        <div className="site-cover site-cover-sm same-height overlay single-page">
      <div className="container">
        <div className="row same-height justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="post-entry text-center">
              <span className="post-category text-white bg-success mb-3">{post.categoryName}</span>
              <h1 className="mb-4"><a>{post.Title}</a></h1>
              <div className="post-meta align-items-center text-center">
               
                <span>{ new Date(post.PublishDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <section className="site-section py-lg">
      <div className="container">
        
        <div className="row blog-entries element-animate">

          <div className="col-md-12 col-lg-8 main-content">
            
            <div className="post-content-body">
          {post.ContentMain}
            </div>

            
    

            <div className="pt-5">
             
            {comments.length>0? <h3 className="mb-5">{comments.length} yorum var</h3>:null} 
              <ul className="comment-list">
                  {
                      comments.map((i,k)=>{
                          return(
                            <li key={i.Id} className="comment">
                            <div className="comment-body">
                              <h3>{i.Name}</h3>
                              <p>{i.ContentMain}</p>
                            </div>
                          </li>
                          )
                      })
                  }
               
              </ul>
              
              <div className="comment-form-wrap pt-5">
                <h3 className="mb-5">Yorum Yap</h3>
                <form onSubmit={addComment} className="p-5 bg-light">
                  <div className="form-group">
                    <label htmlFor="name">İsim</label>
                    <input type="text" required className="form-control" name='Name' onChange={(e)=>setData({...commentData,Name:e.target.value})} id="name"></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Mesaj</label>
                    <textarea name="ContentMain" required id="message" onChange={(e)=>setData({...commentData,ContentMain:e.target.value})} cols="30" rows="10" className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <button type='submit' className='btn btn-info'>Yorum Yap</button>
                  </div>

                </form>
              </div>
            </div>

          </div>


          <div className="col-md-12 col-lg-4 sidebar">
            <div className="sidebar-box search-form-wrap">
              <form action="#" className="search-form">
                <div className="form-group">
                  <span className="icon fa fa-search"></span>
                  <input type="text" className="form-control" id="s" placeholder="Type a keyword and hit enter"></input>
                </div>
              </form>
            </div>
        
            <div className="sidebar-box">
              <h3 className="heading">Son 5 Blog</h3>
              <div className="post-entry-sidebar">
                <ul>
                  {
                    lastFivePosts.map((i,k)=>{
                      return(
                            <li key={i.Id}>
                    <a href={"/post/"+i.Id}>
                      <img src={i.Image} alt="Image placeholder" className="mr-4"></img>
                      <div className="text">
                        <h4>{i.Title}</h4>
                        <div className="post-meta">
                          <span className="mr-2">{new Date(i.PublishDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                      )
                    })
                  }
              
                  
                </ul>
              </div>
            </div>

            <div className="sidebar-box">
              <h3 className="heading">Kategoriler</h3>
              <ul className="categories">
                  {
                      categories.map((i,k)=>{
                          return(
                            <li key={i.Id}><a href={"/category/"+i.Id}>{i.Name} <span>({i.count})</span></a></li>

                          )
                      })
                  }
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>

   
   </div>

  )
}

export default PostDetail
