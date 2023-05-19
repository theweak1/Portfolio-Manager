import React, { useState } from 'react';

function Post(props) {
  return (
    //This is how the post looks like after you fill in the form
    <div className="tweet mx-auto rounded-lg shadow-md border border-gray-200 p-4 flex flex-col justify-between  max-h-96 mt-12 overflow-hidden bg-yellow bg-opacity-50 w-96">
        <div className="flex flex-row items-center mb-4">
          <div className="text-lg font-bold font-sans text-yellow-500 text-black">
            {props.author}
          </div>
        </div>

      <div className=" text-lg font-bold font-sans text-yellow-500 mb-4 text-black">
        <span className="text-sm text-gray-500 mr-2">
          {props.date} | 
        </span>
          {props.title}
      </div> 
        
      <div className="flex flex-col h-full">
        <p className="text-center text-sm text-black self-start">
          {props.text}
        </p> 
      </div>
    </div>
  );
}

//where the form is located
function PostList(props) {
  //hooks
  const [newPost, setNewPost] = useState({
    id: '',
    title: '',
    author: '',
    text: '',
    date: '',
  });
  
  //handle when the form is submited
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const updatedPosts = [...props.posts, newPost];
    
    /* how making a post would look in theory: 
    
    const response = await fecth('/updates'{
      method: 'POST ',
      body: JSON.stringify(updatedPosts),
      header: {
        'Content-Type' : 'application/json'
      }
    })

    */
    props.setPosts(updatedPosts);

    setNewPost({
      id: '',
      title: '',
      author: '',
      text: '',
      date: '',
    });
  };

  //handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  return (
    //everything in updates is contained in the first div
    <div className='fixed flex justify-start right-20 left-20 h-[50rem] top-32 p-8 text-darkGrey bg-white'>
        {/*This is where the form to submit is located */}
      <form onSubmit={handlePostSubmit} className="flex text-2xl bg-grey w-[40rem] h-[40rem]">
        
        <table className='table-fixed w-full'>
          <thead>
            <th>
              <td>
                <input
                type="text"
                name="author"
                value={newPost.author}
                onChange={handleInputChange}
                placeholder="Author"
                className="border border-gray-300 rounded-md m-2"
                required
                />
              </td>
            </th>
          </thead>

          <tbody>
            <tr>
              <td>
                <input
                type="date"
                name="date"
                value={newPost.date}
                onChange={handleInputChange}
                placeholder="Date"
                className="border border-gray-300 rounded-md m-2"
                required
                />
              </td>
            </tr>

            <tr>
              <td>
                 <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="border border-gray-300 rounded-md m-2"
                  required
                 />
              </td>
            </tr>
            
            <tr>
              <textarea
              type="text"
              name="text"
              value={newPost.text}
              onChange={handleInputChange}
              placeholder="Text"
              className="border border-gray-300 rounded-md h-[20rem] w-[39rem] m-2 resize-none"
              required
              />
            </tr>
            <tr>
              <button type="submit" className="bg-yellow bg-opacity-90 text-darkGrey rounded-md m-2 p-2 px-6">
                Post
              </button>
            </tr>
          </tbody>
          
        </table>
      </form>

    {/*This is where the posted form is located */}
      {props.posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          text={post.text}
          date={post.date}
        />
      ))}
    </div>
  );
}

export default PostList;
