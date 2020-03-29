import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './redux/store/store';

// layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Main from './components/layout/Main';

// views
import SplashScreen from './components/views/SplashScreen';

import { Container } from 'reactstrap';

class App extends Component {
	state = {
		splash: true,
		title: 'CJM'
	};
	callBackSplash = splash => {
		// receives callBack value from child SplashScreen.js callBack function: props.callBackSplash(false)
		this.setState({
			splash: splash // set state splash value to false
		});
		console.log(splash);
	};

	render() {
		const { splash, title } = this.state;
		return (
			<Provider store={store}>
				<Router basename={'/'}>
					<div className='App'>
						{splash ? (
							<Fragment>
								<SplashScreen
									callBackSplash={this.callBackSplash}
									title={title}
								/>
							</Fragment>
						) : (
							<Fragment>
								<Header />
								<Container>
									<Main />
								</Container>
								<Footer />
							</Fragment>
						)}
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
