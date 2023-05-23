import React, { useEffect, useReducer } from 'react';
import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators)
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || '',
		isTouched: false,
		isValid: props.initialValid || false
	});

	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = (event) => {
		dispatch({
			type: 'CHANGE',
			val: event.target.value,
			validators: props.validators
		});
	};

	const touchHandler = () => {
		dispatch({ type: 'TOUCH' });
	};

	const element =
		props.element === 'input' ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
				className={`w-full border  ${
					!inputState.isValid && inputState.isTouched
						? 'border-red-500'
						: 'border-gray-300'
				} p-2 rounded-lg text-black mt-2  focus:outline-none`}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
				className={`w-full border ${
					!inputState.isValid && inputState.isTouched
						? 'border-red-500'
						: 'border-gray-300'
				} bg-gray-100 focus:bg-gray-200 px-2 py-1`}
			/>
		);

	return (
		<div
			className={`mb-4 ${
				!inputState.isValid && inputState.isTouched ? 'text-red-500' : ''
			}`}
		>
			<label htmlFor={props.id} className="font-bold mb-2">
				{props.label}
			</label>
			{element}
			{!inputState.isValid && inputState.isTouched && (
				<p className="text-red-500">{props.errorText}</p>
			)}
		</div>
	);
};

export default Input;
