import { data } from "autoprefixer";
import React from "react"

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.postAddHandle = this.postAddHandle.bind(this)
  }
  
  componentDidMount() {
    this.fetchPost()
  }

  render() {
    if (!this.state.data) return <p>No POSTS fetched</p>
    return (
      <div>
        <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
        {this.addPost()}
        <h1 className="font-bold text-2xl m-2">POSTS</h1>
        {this.displayPost()}
      </div>
    )
  }

  async fetchPost() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState({ data: json })
    } catch (error) {
      console.log('error', error)
    }
  }

  postAddHandle(event) {
    event.preventDefault();
    
    let id = 0;
    if (this.state.data) {
      id = this.state.data[this.state.data.length - 1].id +1
    }
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    const post = {
      title: title,
      body: body,
      id: id
    }

    const newPosts = this.state.data.concat(post);
    this.setState({ data: newPosts });
    // TOdo need to clear box or report success
  }

  addPost() {
    return (
      <>
        <form onSubmit={this.postAddHandle} className="w-2/5">
          <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="title" placeholder="Title" />
          <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="body" placeholder="Body" />
          <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" type="submit">Add post</button>
        </form>
      </>
    )
  }

  displayPost() {
    return (
      <>
        {this.state.data.map(post =>
          <div key={post.id} className="m-2 rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{post.title}</div>
              <p className="text-gray-700 text-base"> {post.body} </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#{post.id}</span>
            </div>
          </div>)}
      </>
    );
  }
}

export default Posts;