import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../shared/components/FormElements/input';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../shared/util/validators';

//where the form is located
function PostList(props) {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	//hooks
	const [loadedPost, setloadedPost] = useState([]);
	const [creator, setCreator] = '';
	const navigate = useNavigate();

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const [formSubmitted, setFormSubmitted] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			if (!auth.token) {
			} else {
				try {
					const responseData = await sendRequest(
						`${process.env.REACT_APP_BACKEND_URL}/posts/startup`,
						'GET',
						null,
						{
							Authorization: 'Bearer ' + auth.token
						}
					);

					setloadedPost(responseData);
					setCreator(responseData.creator.companyName);
				} catch (err) {}
			}
		};
		fetchPosts();
	}, [auth.token, sendRequest, formSubmitted]);

	//handle when the form is submited
	const handlePostSubmit = async (e) => {
		e.preventDefault();

		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/posts`,
				'POST',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token
				}
			);
		} catch (err) {}
		setFormSubmitted(true);
		navigate('/create-updates');
	};

	const handleDeletePost = async (postId) => {
		setloadedPost((prevState) =>
			prevState.filter((post) => post.id !== postId)
		);

		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`,
				'DELETE',
				null,
				{
					Authorization: 'Bearer ' + auth.token
				}
			);
		} catch (err) {}
	};

	//variables that automaticly give the date and puts the start up as the author
	return (
		//everything in updates is contained in the first div
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<div className=" ">
				{/*This is where the form to submit is located */}
				<form
					onSubmit={handlePostSubmit}
					className="absolute  flex  top-20 left-14 sm:left-20 md:left-20 text-xl w-[23rem] md:w-[34rem] lg:w-[52rem]  h-96 text-darkGrey bg-white rounded-sm"
				>
					<table className="table-fixed w-full">
						<thead className=" border-b-2 border-yellow">
							<tr>
								<th>
									<td>
										<span className="p-2 font-bold">UPDATES</span>
									</td>
								</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>
									<Input
										id="title"
										element="input"
										type="text"
										label="Title"
										validators={[VALIDATOR_REQUIRE()]}
										onInput={inputHandler}
										initialValue={''}
										errorText="Please enter a valid title."
									/>

									{/* <input
                  id="title"
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="rounded-sm w-3/5 m-2 font-bold"
                  required
                /> */}
								</td>
							</tr>

							<tr>
								<td>
									<Input
										id="description"
										element="textarea"
										label="Description"
										validators={[VALIDATOR_MINLENGTH(5)]}
										errorText="Please enter a valid description (min. 5 characters)."
										initialValue={''}
										onInput={inputHandler}
									/>

									{/* <textarea
                  id="text"
                  name="text"
                  value={newPost.text}
                  onChange={handleInputChange}
                  placeholder="Text"
                  className="rounded-sm m-2 p-2 h-52 w-[97.5%] resize-none"
                  required
                /> */}
								</td>
							</tr>

							<tr>
								<td className="text-end">
									<button
										type="submit"
										className="bg-yellow bg-opacity-80 font-bold text-darkGrey rounded-sm m-3 p-2 px-4"
									>
										Post
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>

				{!isLoading && loadedPost && (
					<div className=" relative top-[29rem] left-14 sm:left-20 md:left-20 grid min-grid-cols-1 md:grid-cols-2  gap-14 my-10 rounded-md shadow-md">
						{/*This is where the posted form is located */}
						{loadedPost.map((post) => (
							<div
								key={post.id}
								className=" flex flex-col justify-between mx-auto border-2 w-[23rem] md:w-[27rem] lg:w-[36rem] p-2 max-h-96 h-72 md:h-80 mt-10 overflow-scroll bg-white rounded-md shadow-md"
							>
								<div className="flex flex-row items-center mb-2">
									<div className="text-lg font-bold font-sans text-yellow-500 text-black">
										{post.creator.companyName}
									</div>
								</div>

								<div className=" text-lg font-bold font-sans text-yellow-500 mb-4 text-black">
									<span className="text-sm text-gray-500 mr-2">
										{new Date(post.lastModified).toLocaleDateString('en-us', {
											weekday: 'long',
											year: 'numeric',
											month: 'short',
											day: 'numeric'
										})}{' '}
										|
									</span>
									{post.title}
								</div>

								<div className="flex flex-col h-full">
									<textarea
										value={post.description}
										className=" text-justify text-sm h-24 md:h-32 p-2 w-[95%] text-black self-start resize-none"
										readOnly
									/>
								</div>
								<button
									className=" w-1/5 p-2 my-2 font-bold text-darkGrey rounded-sm bg-yellow bg-opacity-80"
									onClick={() => handleDeletePost(post.id)}
								>
									Delete
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</React.Fragment>
	);
}

export default PostList;
