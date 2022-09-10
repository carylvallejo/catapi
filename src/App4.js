import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { catKey } from "./services/key"

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
	const [ cats, setCats ] = useState('') 
	const [favoriteCats, setFavoriteCats] = useState('')
	const [catData, setCatData] = useState([])

	const haveCat = () => {
		axios
				.get('https://api.thecatapi.com/v1/images/search', catKey)
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

	const getUserFavorite = () => {
		axios
			.get(`https://api.thecatapi.com/v1/favourites?sub_id=user1`, catKey)
			.then((response) => setFavoriteCats(response.data))
	}

	//commented since it returns an error that prevents the page from running
	// const getFavorite = () => {
	// 		favoriteCats.map((favorite) => {
	// 			axios
	// 			.get(`https://api.thecatapi.com/v1/images/${favorite.image_id}`, catOptions)
	// 			.then((response) => setCatData((prev) => [...prev, response.data]))
	// 		})
	// }

	useEffect( () => {
		haveCat();
		getUserFavorite();
		//getFavorite()
	}, [])

	const addFave = (event, catId) => {
		event.preventDefault()

		const newFavourite = {
			headers: {
				"content-type":"application/json",
        'x-api-key': 'live_hzIykEDuSgcZWNPV0M72I31HIvfsZ0NwPOmKu6d7hFWg7Ph8Iraj6whE68uzu2aM',
			}
		}
//change catId
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
			<div className="image-container">
				<div>
					<div>{cats.image_id}</div>
					<img alt="cats" src={cats.url} height="300px" width="300px"/>
				</div>
			</div>
		</div>
 	)
}

export default App