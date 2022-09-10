import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { catOptions } from "./options"
//revise catOptions

const App = () => {
	const [ cats, setCats ] = useState('') 

		useEffect( () => {
			haveCat()
		}, [])

	const haveCat = () => {
		axios
				.get('https://api.thecatapi.com/v1/images/search', catOptions)
				.then(response => {
					console.log('Cats: ', response.data[0].url)
					//setCats(response[0].data)
					//const cats = response.data[0].url
					//const cats_id = response.data[0].id
					setCats(response.data[0])
			})
			.catch((error) => console.error("error"))	
	}

	const handleOnclick = (event) => {
		event.preventDefault()
		haveCat()
	}

	const addFave = (event, catId) => {
		event.preventDefault()

		const newFavourite = {
			headers: {
				"content-type":"application/json",
        'x-api-key': 'live_hzIykEDuSgcZWNPV0M72I31HIvfsZ0NwPOmKu6d7hFWg7Ph8Iraj6whE68uzu2aM',
			}
		}

		const data = {
			image_id: catId,
			sub_id: "user1"
		}

		axios.post("https://api.thecatapi.com/v1/favourites", data, newFavourite)
				.then((response) => console.log(response))
				.catch((error) => { 
					console.log(error)
			})
	}

	
const Card = () => {
	const url = `http:localhost:3000/favorites`
	return (
		<div className="card-container">
			<div className="image-container">
				<img src={cats.url} alt="cat" height="300px" width="250px"/>
			</div>
			<button onClick={(event) => addFave(event, cats.id)}>Fave</button>
			<button className="card-btn" onClick={handleOnclick}>Give me a new cat</button>
		</div>
	)
}

	return (
		<div className="App">
			<h1>Favorite Cat</h1>
			<Card />

			<h1>FAVORITES</h1>
		</div>
 	)
}

export default App