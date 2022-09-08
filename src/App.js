import { useState, useEffect } from 'react'
import axios from 'axios'

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

	const showDetails = (event) => {
    setCats(event.target.value)
  }
	
	return (
		<div>
			<h1>Get cat images</h1>
			<img src={cats} alt="cat" height="300px" width="250px"/>
			<button onClick={haveCat}>Give me a new cat</button>
		</div>
 	)
}

export default App;
