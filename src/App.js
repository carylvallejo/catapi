// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import './App.css'

// //const url = 'https://api.thecatapi.com/v1/images/search'

// const App = () => {
// 	// console.log('Hello World test')
// 	const [ cats, setCats ] = useState('') 

// 		useEffect( () => {
// 			haveCat()
// 		}, [])

// 	const haveCat = () => {
// 		axios
// 				.get('https://api.thecatapi.com/v1/images/search')
// 				.then(response => {
// 					console.log('Cats: ', response.data[0].url)
// 					//setCats(response[0].data)
// 					const cats = response.data[0].url
// 					setCats(cats)
// 				})
// 	}

// 	// const showDetails = (event) => {
//   //   setCats(event.target.value)
//   // }

// const Card = () => {
// 	return (
// 		<div className="card-container">
// 			<div className="image-container">
// 				<img src={cats} alt="cat" height="300px" width="250px"/>
// 			</div>
// 			<button className="card-btn" onClick={haveCat}>Give me a new cat</button>
// 		</div>
// 	)
// }

// 	return (
// 		<div className="App">
// 			<h1>Get cat images</h1>
// 			<Card />
// 		</div>
//  	)
// }

// export default App;

import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

//const url = 'https://api.thecatapi.com/v1/images/search'

const App = () => {
	// console.log('Hello World test')
	const [ cats, setCats ] = useState('') 

		useEffect( () => {
			haveCat()
		}, [])

	const haveCat = () => {
		axios
				.get('https://api.thecatapi.com/v1/images/search')
				.then(response => {
					console.log('Cats: ', response.data[0].url)
					//setCats(response[0].data)
					const cats = response.data[0].url
					setCats(cats)
				})
	}

	// const showDetails = (event) => {
  //   setCats(event.target.value)
  // }

const Card = () => {
	return (
		<div className="card-container">
			<div className="image-container">
				<img src={cats} alt="cat" height="300px" width="250px"/>
			</div>
			<button className="card-btn" onClick={haveCat}>Give me a new cat</button>
		</div>
	)
}

	return (
		<div className="App">
			<h1>Get cat images</h1>
			<Card />
		</div>
 	)
}

export default App;

