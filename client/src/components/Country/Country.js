import React from 'react'
import { Link } from 'react-router-dom'
import './Country.css'
import { imgBank } from '../../assets/imageBank'

const Country = ({ flag, continent, subRegion, capital, country, idCountry, id }) => {

const imgDefault='https://images.squarespace-cdn.com/content/v1/60e6341f017575363ab46dbc/1627357208379-MVVT1Q1MZXUAFYOFJ3W3/placeholder-world.png?format=2500w'
const img = imgBank.find((i)=> i.id===id ).image ? imgBank.find((i)=> i.id===id ).image : imgDefault


  return (
    <Link to={`/country/${id}`}>
      <div className='country-container' style={{ backgroundImage: `url(${img})` }}>
        <img className='country-flag' src={`${flag}`} alt={`${country}`} />
        <div className='country-detail'>
          <p className='country-continent'> {`${continent} (${subRegion})`} </p>
          <h2 className={country.length > 13 ? 'country-name small-font' : 'country-name'}> {`${country}`} </h2>
          <p className='country-capital'> {`(${capital})`} </p>
          <p className='country-id'> {`${idCountry}`} </p>
        </div>
      </div>
    </Link>
  )

}

export default Country

// style={{backgroundImage:`url(${imgCountry})`}}

//className={country.length > 13 ?'country-name small-font'}