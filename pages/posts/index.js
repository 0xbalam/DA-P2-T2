import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  


  useEffect(() => {
    setLoading(true)

    const fetchJsonData = async () => {
      const url = "https://jsonplaceholder.typicode.com/posts";
      try {
        const response = await fetch(ulr);
        const json = await response.json();
        setData(json)
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchJsonData()

  }, [])

  if (isLoading) return <p className="text-gray-700 text-base">Fetching Posts...</p>
  if (!isLoading && !data) return <p>No POSTS fetched</p>

  return (
    <div>
      <h1 className="font-bold text-2xl m-2">POSTS</h1>
      {data.map(post =>
        <div key={post.id} className="m-2 rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.title}</div>
            <p className="text-gray-700 text-base"> {post.body} </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#{post.id}</span>
          </div>
        </div>
      )}
    </div>
  )
}