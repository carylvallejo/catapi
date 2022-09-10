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
					const cats = response.data[0].url
					const cats_id = response.data[0].id
					setCats(cats)
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

		const rawBody = {
			image_id: catId,
			sub_id: "user1"
		}

		axios.post("https://api.thecatapi.com/v1/favourites", rawBody, newFavourite)
				.then((response) => console.log(response))
				.catch((error) => { 
					console.log(error)
			})
	}

const Card = () => {
	return (
		<div className="card-container">
			<div className="image-container">
				<img src={cats} alt="cat" height="300px" width="250px"/>
			</div>
			<button className="grid-button" onClick={(event) => addFave(event)}>
							Fave
			</button>
			<button className="card-btn" onClick={haveCat}>Give me a new cat</button>
		</div>
	)
}

	return (
		<div className="App">
			<h1>Favorite Cat</h1>
			<Card />
		</div>
 	)
}

export default App;