import React, { useContext, useEffect, useState } from 'react';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

//where the form is located
function ReadList() {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [LoadedPost, setLoadedPost] = useState([]);

	useEffect(() => {
		let ignored = false;
		const fetchPost = async () => {
			if (!auth.token) {
			} else {
				try {
					const responseData = await sendRequest(
						`${process.env.REACT_APP_BACKEND_URL}/posts`,
						'GET',
						null,
						{
							Authorization: 'Bearer ' + auth.token
						}
					);
					setLoadedPost(responseData);
				} catch (err) {}
			}
		};
		if (!ignored) {
			fetchPost();
			ignored = true;
		}
	}, [auth.token, sendRequest]);

	//everything in updates is contained in the first div
	return (
		//everything in updates is contained in the first div
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<div className="absolute flex flex-col  top-20 left-20 sm:left-20 md:left-24 ">
				{/*This is where the posted form is located */}
				{LoadedPost.map((read) => (
					<div
						key={read.id}
						className=" flex flex-col justify-between  w-[28rem] md:w-[40rem] lg:w-[74rem] p-2 h-72 md:h-[26rem] mt-10 overflow-scroll border-md border-2 bg-white shadow-md"
					>
						<div className="flex flex-row border-yellow border-b-2 items-center ">
							<div className="text-lg font-bold font-sans text-yellow-500 text-black">
								{read.companyName}{' '}
								{/*This is where the Company Name is located */}
							</div>
						</div>
						{/*This is where the rest of the post is located is located */}
						{read.blog.map((data) => (
							<div className=" text-lg font-bold font-sans text-yellow-500 mb-4 h-[35rem] border-grey border-b-2 text-black">
								<span className="text-sm text-grey mr-2">
									{new Date(data.lastModified).toLocaleDateString('en-us', {
										weekday: 'long',
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}{' '}
									|
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
		</React.Fragment>
	);
}

export default ReadList;
