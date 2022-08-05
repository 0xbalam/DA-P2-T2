import { useState, useEffect } from "react";
import AddPost from '../../components/AddPost'
import DisplayPosts from '../../components/DisplayPosts'

export default function POSTS() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const url = "https://jsonplaceholder.typicode.com/posts";
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log('error', error);
      }

    }

    fetchPost();
  }, [])



  if (!data) return <p>No POSTS fetched</p>
  return (
    <div>
      <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
      <AddPost data={data} setData={setData}></AddPost>
      <h1 className="font-bold text-2xl m-2">POSTS</h1>
      <DisplayPosts data={data}></DisplayPosts>
    </div>
  )
}
