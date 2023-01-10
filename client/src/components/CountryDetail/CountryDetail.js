import React, { useEffect } from 'react'
import * as actions from '../../redux/actions/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './CountryDetail.css'
import Buttom from '../Buttom/Buttom.js'
import { imgBank } from '../../assets/imageBank.js'
import ActivityDetail from '../ActivityDetail/ActivityDetail.js'
import { CgScrollV } from "react-icons/cg";



const CountryDetail = () => {
  const dispatch = useDispatch()
  const country = useSelector(state => state.country)
  const { name, capital, flag, continent, subRegion, population, area, activities } = country
  const { id } = useParams()
  const imageDefault = 'https://images.unsplash.com/photo-1498354178607-a79df2916198?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGVhcnRofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'

  useEffect(() => {
    dispatch(actions.getCountryDetail(id))
  }, [dispatch, id])


  const img = imgBank.find((i) => i.id === id).image ? imgBank.find((i) => i.id === id).image : 'https://images.squarespace-cdn.com/content/v1/60e6341f017575363ab46dbc/1627357208379-MVVT1Q1MZXUAFYOFJ3W3/placeholder-world.png?format=2500w'

  return (
    <div className='countryDetails-container'>
      <div className='details-container'>
        <h2>{name}</h2>
        <h3>{capital}</h3>
        <p className='detail-population'>
          <p>POBLACION:</p>
          {population} Hab.
        </p>
        <p className='detail-surface'>
          <p>SUPERFICIE:</p>
          {area}km2
        </p>
      </div>
      <div className='country-image' style={{ backgroundImage: `url(${img})` }} ></div>
      <h1 className='titleActivities'> Actividades </h1>

      {activities && <div className='scrollTouch'>
          <CgScrollV />
        </div>}
      <div className='activities-container'>

        {activities && activities.map((a, index) =>
          <ActivityDetail
            img={a.image.length > 0 ? a.image : imageDefault}
            name={a.name}
            difficulty={a.difficulty}
            duration={a.duration}
            season={a.season}
            key={index}
          />
        )}
      </div>
      < Buttom
        nameClass='buttom-countryDetails'
        description='BACK'
        linkTo='/home'
      />

    </div >


  )
}

export default CountryDetail
//style={{ backgroundImage: `url(${imgCountry})` }}
//https://www.commonwealthfund.org/sites/default/files/styles/countries_hero_desktop/public/country_image_Japan.jpg?h=fcdfd899&itok=eL0Jj4cw

// {
//   activities && activities.map((a, index) => {
//     return (
//       <div key={index} >

//         <div className="divInfoActivity">
//           <div>
//             <h2 className='subtitleActivity'> Name: </h2>
//             <p className='pActivity'> {a.name} </p>
//           </div>
//           <div>
//             <h2 className='subtitleActivity'> Difficulty: </h2>
//             <p className='pActivity'> {a.difficulty} </p>
//           </div>
//           <div>
//             <h2 className='subtitleActivity'> Duration: </h2>
//             <p className='pActivity'> {a.duration} </p>
//           </div>
//           <div>
//             <h2 className='subtitleActivity'> Season: </h2>
//             <p className='pActivity'> {a.season} </p>
//           </div>
//         </div>
//       </div>
//     )
//   })
// }