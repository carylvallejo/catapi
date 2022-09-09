import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
	// console.log('Hello World test')
	const [ cats, setCats ] = useState('') 
	const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(cats.length).fill(0))

		useEffect( () => {
			haveCat()
		}, [])

	const haveCat = () => {
		axios
				.get('https://api.thecatapi.com/v1/images/search?limit=10')
				.then(response => {
					console.log('Cats: ', response.data[0].url)
					//setCats(response[0].data)
					const cats = response.data[0].url
					const cat = response.data
					const catId = response.data[0].id
					//console.log(cat.length)
					setCats(cats)
				})
	}

	const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

	// const showDetails = (event) => {
  //   setCats(event.target.value)
  // }

	const voteIncrease = ()  => {
    const copy = [...points]
    // increment the value in position 2 by one
      copy[selected] += 1   

      setPoints(copy)
  }

	const voteDecrease = ()  => {
    const copy = [...points]
    // increment the value in position 2 by one
      copy[selected] -= 1   

      setPoints(copy)
  }
	

console.log(points[selected])
const Card = () => {
	return (
		<div className="card-container">
			<div className="image-container">
				<img src={cats} alt="cat" height="300px" width="250px"/>
			</div>
			<p>has {points[selected]} votes</p>
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