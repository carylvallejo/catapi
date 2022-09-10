import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

//selected cat = cats
const App = () => {
	const [ cat, setCat] = useState('')
	const [ cats, setCats ] = useState(0) 
  const [points, setPoints] = useState(new Array(cat.length).fill(0))

	useEffect( () => {
		haveCat()
	}, [])

	//fetches data from the API
	const haveCat = () => {
		axios
			.get('https://api.thecatapi.com/v1/images/search?')
			.then(response => {
			console.log('Cats: ', response.data[0].url)
			//setCats(response[0].data)
			const cats = response.data[0].url
			const cat = response.data
			console.log('Cat data: ',cat)
			//const catId = response.data[0].id
			setCats(cats)
		})
		.catch((error) => console.error("error"))
	}

	const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

	const voteIncrease = ()  => {
    const copy = [...points]
    // increment the value in position 2 by one
      copy[cats] += 1   

      setPoints(copy)
  }

	const voteDecrease = ()  => {
    const copy = [...points]
    // decrement the value in position 2 by one
      copy[cats] -= 1   

      setPoints(copy)
  }
	

console.log('Score: ', points[cats])
const Card = () => {
	return (
		<div className="card-container">
			<div className="image-container">
				<img src={cats} alt="cat" height="300px" width="250px"/>
			</div>
			<Button handleClick={voteIncrease} text="Upvote" />
			<Button handleClick={voteDecrease} text="Downvote" /> <br />
			<button className="card-btn" onClick={haveCat}>Give me a new cat</button>
		</div>
	)
}

	return (
		<div className="App">
			<h1>Voting Page</h1>
			<Card />
		</div>
 	)
}

export default App; 
