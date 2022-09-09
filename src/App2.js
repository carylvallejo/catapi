import { useState, useEffect } from 'react'
import axios from 'axios'
import './App2.css'

const App = () => {
  const [ cats, setCats] = useState([]) 
  const [ search, setSearch ] = useState('')
  const [ selectedCat, setSelectedCat ] = useState('')

	//fetch data from API
	useEffect( () => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        setCats(response.data)
      })
  }, [])

	//makes query case insensitive
	const filteredCat = cats.filter(cat =>
		cat.name.toLowerCase().includes(search.toLowerCase()))
	const searchCat = (event) => {
		setSearch(event.target.value)
		if(filteredCat.length === 1) {
			setSelectedCat(filteredCat[0])
		}
	}

	//event handler for showing breed details from search
	const showDetails = (event) => {
		setSearch(event.target.value)
	}

	const FilterCat = () => {
		if (search === "") {
			return null
			//displays possible breeds based on what the user types
		} else if(filteredCat.length > 1) {
			return(
				filteredCat.map(cat => 
					<div key={cat.name}>
						{cat.name}
						<button value={cat.name} onClick={showDetails} style={{marginLeft: 3}}> Show</button>
					</div>)
			)
			//display info about a specific breed
		} else if (filteredCat.length === 1) {
			const cat = filteredCat[0]
			return(
				<div className='card-container'>
					<div className="card-title">
						<h2>{cat.name}</h2>
					</div>
					<div className="image-container">
					<img src={cat.image.url} alt="breed" height="300px" className="center"/>
					</div>
					<div className="card-content">
						<div className="card-body">
							<p>{cat.description}</p>
							<hr
    						style={{
      						backgroundColor: 'red',
      						width: 450
    						}}
  						/>
							<p>{cat.temperament}</p>
							<p>Adaptability: {cat.adaptability}/5</p>
							<p>Affection Level: {cat.affection_level}/5</p>
							<p>Child Friendly: {cat.child_friendly}/5</p>
							<p>Energy Level: {cat.energy_level}/5</p>
							<p>Intelligence: {cat.intelligence}/5</p>
							<p>To learn more about {cat.name} cats, click <a href={cat.wikipedia_url}>HERE</a></p>
						</div>
					</div>
				</div>
			)
		}
	}

	return(
		<div className="cats">
			Search cat breeds <input value={search} onChange={searchCat} />
			<FilterCat />
		</div>
	)
}

export default App