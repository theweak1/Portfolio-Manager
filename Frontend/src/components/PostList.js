import React from 'react';

function Post(props) {
  return (
    <div className="tweet mx-auto rounded-lg shadow-md border border-gray-200 p-4 flex flex-col justify-between  max-h-96 mt-12 overflow-hidden bg-orange-100 w-96">
      <div className="flex flex-row items-center mb-4">
        <img src={props.avatar} alt="Avatar" className="rounded-full mx-4 my-4 w-20 h-20" />
        <div className="text-lg font-bold font-sans text-yellow-500 text-black">{props.author}</div>
      </div>
      <div className="flex flex-col h-full">
        <p className="text-center mb-4 text-sm text-black self-end">{props.text}</p>
        <span className="text-sm text-gray-500">{props.date}</span>
      </div>
    </div>
  );
}









function PostList(props) {
  return (
    <div>
      {props.posts.map(post => (
        <Post
          key={post.id}
          avatar={post.avatar}
          author={post.author}
          text={post.text}
          date={post.date}
        />
      ))}
    </div>
  );
}

export default PostList;
