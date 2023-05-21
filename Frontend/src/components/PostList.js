
import React, { useState } from 'react';


//where the form is located
function PostList(props) {
  //hooks
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    id: 1,
    title: '',
    author: '',
    text: '',
    date: '',
  });
 
  //handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  //handle when the form is submited
  const handlePostSubmit = (e) => {
    e.preventDefault();
    setPosts((prevState) => [...prevState, newPost]);

    setNewPost((prevState) => ({
      ...prevState, id: prevState.id + 1,
      title: '',
      author: '',
      text: '',
      date: '',
    }));
  };

  const handleDeletePost = (postId) => {
    setPosts((prevState) => prevState.filter((post) => post.id !== postId));
  };

  //variables that automaticly give the date and puts the start up as the author
  const boAuthor = "Franky";
  const updateDate = new Date(Date.now()).toString();


  return (
    //everything in updates is contained in the first div
    <div className=' '>
      {/*This is where the form to submit is located */}
      <form onSubmit={handlePostSubmit}
        className="absolute  flex  top-20 left-14 sm:left-20 md:left-20 text-xl w-[23rem] md:w-[34rem] lg:w-[52rem]  h-96 text-darkGrey bg-white rounded-sm">
        <table className="table-fixed w-full">
          <thead className=' border-b-2 border-yellow'>
            <tr>
              <th>
                <td>
                  <span className='p-2 font-bold'>UPDATES</span>
                </td>
              </th>
            </tr>
          </thead>

          <tbody>
                <p className='hidden'>
                  {newPost.author = boAuthor}
                </p>

                <p  className='hidden'>
                  {newPost.date = updateDate}
                </p>
            
            <tr>
              <td>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="rounded-sm w-3/5 m-2 font-bold"
                  required
                />
              </td>
            </tr>

            <tr>
              <td>
                <textarea
                  id="text"
                  name="text"
                  value={newPost.text}
                  onChange={handleInputChange}
                  placeholder="Text"
                  className="rounded-sm m-2 p-2 h-52 w-[97.5%] resize-none"
                  required
                />
              </td>
            </tr>

            <tr>
              <td className="text-end">
                <button
                  type="submit"
                  className="bg-yellow bg-opacity-80 font-bold text-darkGrey rounded-sm m-3 p-2 px-4">
                  Post
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>

      <div className=' relative top-[29rem] left-14 sm:left-20 md:left-20 grid min-grid-cols-1 md:grid-cols-2  gap-14 my-10 rounded-md shadow-md'>
        {/*This is where the posted form is located */}
        {posts.map((post) => (
          <div key={post.id} className=" flex flex-col justify-between mx-auto border-2 w-[23rem] md:w-[27rem] lg:w-[36rem] p-2 max-h-96 h-72 md:h-80 mt-10 overflow-scroll bg-white rounded-md shadow-md">
            <div className="flex flex-row items-center mb-2">
              <div className="text-lg font-bold font-sans text-yellow-500 text-black">
                {post.author}
              </div>
            </div>
    
            <div className=" text-lg font-bold font-sans text-yellow-500 mb-4 text-black">
              <span className="text-sm text-gray-500 mr-2">
                {post.date} | 
              </span>
                {post.title}
            </div> 
            
            <div className="flex flex-col h-full">
              <textarea
                  value={post.text}
                  className=" text-justify text-sm h-24 md:h-32 p-2 w-[95%] text-black self-start resize-none"
                  readOnly
                />
            </div>
            <button
                className=" w-1/5 p-2 my-2 font-bold text-darkGrey rounded-sm bg-yellow bg-opacity-80"
                onClick={() => handleDeletePost(post.id)}>
                Delete
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default PostList;
