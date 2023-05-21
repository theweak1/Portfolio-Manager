
import React, { useState } from 'react';


//where the form is located
function ReadList(props) {
  //hooks
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    id: 1,
    title: '',
    author: '',
    text: '',
    date: '',
  });
 
  const DummyData = [
	{
		"id": "64374e332b363fa9133d9371",
		"companyName": "Theweak1 Consulting",
		"blog": [
			{
				"id": "642cb3e3a33f2e40628fc6a3",
				"lastModified": "2023-04-04T23:33:55.409Z",
				"title": "This a test",
				"description": "this is an example of what a post could look like."
			},
			{
				"id": "642cc472b5342e03cc81ddd6",
				"lastModified": "2023-04-07T18:46:54.758Z",
				"title": "This is an update test",
				"description": "I am updating this post to see if the last modified date changes in the datebase."
			},
			{
				"id": "642cccb17076274e3b0febdc",
				"lastModified": "2023-04-05T01:19:45.689Z",
				"title": "This a new",
				"description": "this is an example of what a post could look like."
			},
			{
				"id": "6434bd37c837c8871ff44aed",
				"lastModified": "2023-04-11T01:51:51.360Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434bd6767d7f58edff612ca",
				"lastModified": "2023-04-11T01:52:39.677Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434bd89370a93a421beba20",
				"lastModified": "2023-04-11T01:53:13.683Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434bd92370a93a421beba21",
				"lastModified": "2023-04-11T01:53:21.997Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434bda16155b1d4a25b3618",
				"lastModified": "2023-04-11T01:53:37.924Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434bdeee5a548212f499136",
				"lastModified": "2023-04-11T01:54:54.261Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434be035e21b1f0073cc3b1",
				"lastModified": "2023-04-11T01:55:15.668Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434c0a9d58989088ba4f283",
				"lastModified": "2023-04-11T02:06:33.610Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434c0c4d58989088ba4f284",
				"lastModified": "2023-04-11T02:07:00.765Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "6434c503d58989088ba4f285",
				"lastModified": "2023-04-11T02:25:07.095Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
			{
				"id": "644b17b869593161453f9b8b",
				"lastModified": "2023-04-28T00:47:52.220Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			}
		]
	}
]

  //variables that automaticly give the date and puts the start up as the author
  const boAuthor = "Franky";
  const updateDate = new Date(Date.now()).toString();


  return (
    //everything in updates is contained in the first div
      <div className=' relative top-[29rem] left-14 sm:left-20 md:left-20 grid min-grid-cols-1 md:grid-cols-2  gap-14 my-10 rounded-md shadow-md'>
        {/*This is where the posted form is located */}
        {DummyData.map((read) => (
          <div key={read.id} className=" flex flex-col justify-between mx-auto border-2 w-[23rem] md:w-[27rem] lg:w-[36rem] p-2 max-h-96 h-72 md:h-80 mt-10 overflow-scroll bg-white rounded-md shadow-md">
            <div className="flex flex-row items-center mb-2">
              <div className="text-lg font-bold font-sans text-yellow-500 text-black">
                {read.companyName}
              </div>
            </div>
    
            <div className=" text-lg font-bold font-sans text-yellow-500 mb-4 text-black">
              <span className="text-sm text-gray-500 mr-2">
                {read.lastModified} | 
              </span>
                {read.title}
            </div> 
            
            <div className="flex flex-col h-full">
              <textarea
                  value={read.description}
                  className=" text-justify text-sm h-24 md:h-32 p-2 w-[95%] text-black self-start resize-none"
                  readOnly
                />
            </div>
          </div>
        ))}
      </div>
      
  );
}

export default ReadList;
