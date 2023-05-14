import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
	const content = (
		<div
			className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md transition-transform ${
				props.show
					? 'translate-y-0 opacity-100 z-50'
					: '-translate-y-10 opacity-0'
			} w-90`}
		>
			<header className="bg-darkGrey text-white py-2 px-4 rounded-t-md">
				<h2 className="text-lg">{props.header}</h2>
			</header>
			<form
				onSubmit={
					props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
				}
				className="bg-white"
			>
				<div className="p-4 ">{props.children}</div>
				<footer className="py-2 px-4 rounded-b-md">{props.footer}</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
	return (
		<>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames={{
					enter: 'transform -translate-y-10 opacity-0',
					enterActive:
						'transform translate-y-0 opacity-100 transition-all duration-200',
					exit: 'transform translate-y-0 opacity-100',
					exitActive:
						'transform -translate-y-10 opacity-0 transition-all duration-200'
				}}
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</>
	);
};

export default Modal;
