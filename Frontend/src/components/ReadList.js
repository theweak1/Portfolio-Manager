
import React, { useState } from 'react';


//where the form is located
function ReadList(props) {
  
 
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
		],
},

   {     "id": "6437de332b363fa9133d9371",
		"companyName": "Theweak2 Consulting",
		"blog": [
			{
				"id": "642cb3e3a33f2e40628fc6a3",
				"lastModified": "2023-04-04T23:33:55.409Z",
				"title": "This a test",
				"description": "this is an example of what a post could look like."
			},
            {
				"id": "6434c503d58988588ba4f285",
				"lastModified": "2023-04-11T02:25:07.095Z",
				"title": "This a new post",
				"description": "The purpose of this post is to test the email notification service"
			},
        ]},
        {     "id": "6437de337b363fa9133d9371",
		"companyName": "Theweak3 Consulting",
		"blog": [
			{
				"id": "642cb3e3a33f2e40628fc6a3",
				"lastModified": "2023-04-04T23:33:55.409Z",
				"title": "This a test",
				"description": "this is an example of what a post could look like."
			},
        ]}
	
]

  return (
    //everything in updates is contained in the first div
    <div className='absolute flex flex-col  top-20 left-20 sm:left-20 md:left-24 '>
        {/*This is where the posted form is located */}
        {DummyData.map((read) => (
            <div key={read.id} className=" flex flex-col justify-between  w-[28rem] md:w-[40rem] lg:w-[74rem] p-2 h-72 md:h-[26rem] mt-10 overflow-scroll border-md border-2 bg-white shadow-md">
                <div className="flex flex-row border-yellow border-b-2 items-center ">
                    <div className="text-lg font-bold font-sans text-yellow-500 text-black">
                        {read.companyName} {/*This is where the Company Name is located */}
                    </div>
                </div>
                    {/*This is where the rest of the post is located is located */}
                    {read.blog.map((data) => (
                        <div className=" text-lg font-bold font-sans text-yellow-500 mb-4 h-[35rem] border-grey border-b-2 text-black">
                            <span className="text-sm text-grey mr-2">
                                {data.lastModified} | 
                            </span>
                                {data.title}

                            <div className="flex flex-col h-full">
                                <textarea
                                    value={data.description}
                                    className=" text-justify text-sm h-80 p-2 w-[98%] text-black self-start resize-none"
                                    readOnly
                                />
                            </div>
                        </div>
                    ))}
            </div>
        ))}
    </div>
     
  );
}

export default ReadList;
