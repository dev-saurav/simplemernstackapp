import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getBlogPost()
  }, [])

  const onTitleChangeHandler = e => {
    const title = e.target.value
    setTitle(title)
  }

  const onBodyChangeHandler = e => {
    const body = e.target.value
    setBody(body)
  }

  const submitDataHandler = e => {
    e.preventDefault()
    const payload = {
      title: title,
      body: body
    }
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    }).then(() => { console.log('data has been sent to the server') })
      .catch((err) => { console.log(err) })
    getBlogPost()
    setTitle("")
    setBody("")
  }

  const getBlogPost = () => {
    axios.get("/api")
      .then((response) => {
        const data = response.data
        setPosts(data)
        console.log("data has been received!")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const displayBlogPosts = (posts) => {
    if (!posts) return null
    return posts.map((post) => {
      return (
        <div key={post.id}>
          <h3>
            {post.title}
          </h3>
          <p>
            {post.body}
          </p>
        </div>
      )
    })
  }

  return (
    <div className="App">
      <h1>Welcome to the app</h1>
      <form>
        <div className="form-input">
          <input placeholder="Enter title" type="text" name="title" value={title} onChange={onTitleChangeHandler} />
        </div>
        <div className="form-input">
          <textarea placeholder="enter the body" name="body" id="" cols="30" rows="10" value={body} onChange={onBodyChangeHandler}></textarea>
        </div>
        <button onClick={submitDataHandler}>Submit</button>
        {displayBlogPosts(posts)}
      </form>
    </div >
  );
}

export default App;
