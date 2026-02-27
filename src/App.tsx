import React from 'react';
import './App.css';
import useWindowSize from './hooks/useWindowSize';
import Header from './component/Header';
import { Main } from './component/Main';
import Footer from './component/Footer';
import { CatDataProvider } from './context/CatContext';

/*
Future Plans
Another main interface introducing your app
	Scrollable introduction
	Cat on the top right corner of the introduction region that is animated (Done)
	User input of how many cats until consider as ending (Done)
		Fetching api the amount of cats (Done)
Bubble position top left and right on main showing current liked, disliked ones
	When tab or click "select" border, button to remove those ones
		Refetch delete amount
Swipe
	Decided: animation => card get smaller and gradually move to that direction, once reach inner shadow of relative color to dislike and like div (Done)
	Save it to array: dislike or like (Done)
Toggle button for light and dark mode
*/

function App() {

	return (
		<div className="App">
			<Header />
			{/* Show main content*/}
			<CatDataProvider>
				<Main />
			</CatDataProvider>
			<Footer />
		</div>
	);
}


export default App;
