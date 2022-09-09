import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [ cats, setCats] = useState([]) 
  const [ search, setSearch ] = useState('')
  const [ selectedCat, setSelectedCat ] = useState('')

	useEffect( () => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        setCats(response.data)
      })
  }, [])

	const filteredCat = cats.filter(cat =>
		cat.name.toLowerCase().includes(search.toLowerCase()))
	const searchCat = (event) => {
		setSearch(event.target.value)
		if(filteredCat.length === 1) {
			setSelectedCat(filteredCat[0])
		}
	}

	const showDetails = (event) => {
		setSearch(event.target.value)
	}

	const FilterCat = () => {
		if (search === "") {
			return null
		} else if(filteredCat.length > 1) {
			return(
				filteredCat.map(cat => 
					<div key={cat.name}>
						{cat.name}
						<button value={cat.name} onClick={showDetails}>Show</button>
					</div>)
			)
		} else if (filteredCat.length === 1) {
			const cat = filteredCat[0]
			return(
				<div className='cats'>
					<h2>{cat.name}</h2>
					<img src={cat.image.url} alt="breed" height="300px" width="250px" className="center"/>
					<p>{cat.description}</p>
					<hr
    style={{
      backgroundColor: 'red',
      width: 800
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