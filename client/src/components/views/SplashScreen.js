import React from 'react';

// css
import './SplashScreen.scss';

const SplashScreen = ({ callBackSplash, title }) => {
	// receive props from App.js (parent) in this case the callBackSplash method
	const handleOnClick = () => {
		callBackSplash(false); // pass value 'false' up to App.js (parent) through the callBackSplash method
	};

	return (
		<div className='splash-body'>
			<header className='splash-title animated fadeIn delay-1s'>{title}</header>
			<button
				className='splash-cta animated fadeInDown delay-2s'
				onClick={handleOnClick}
			>
				Enter
			</button>
		</div>
	);
};

export default SplashScreen;
