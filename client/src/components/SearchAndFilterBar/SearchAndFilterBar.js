import React, { useEffect, useState } from 'react'
import './SearchAndFilterBar.css'
import 'animate.css'
import { Link } from 'react-router-dom'
import * as actions from '../../redux/actions/index'
import { FaSortAlphaUpAlt, FaSortAlphaDown, FaSearch, FaSortNumericDownAlt, FaSortNumericUpAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'


const SearchAndFilterBar = () => {

  const dispatch = useDispatch()
  const arrayActivities = useSelector(state => state.arrayActivities);
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);



  useEffect(() => {
    dispatch(actions.filterByActivities(activities));
  }, [dispatch, activities])


  function onClick() {
    setName('')
    dispatch(actions.getPagination(1))
  }

  const onInputChange = (e) => {
    setName(e.target.value);
  }

  const handleAz = () => {
    dispatch(actions.orderAz());
    dispatch(actions.getPagination(1))
  }

  const handleZa = () => {
    dispatch(actions.orderZa());
    dispatch(actions.getPagination(1))
  }

  const handlePopulationDown = () => {
    dispatch(actions.orderPopulationDown());
    dispatch(actions.getPagination(1))
  }

  const handlePopulationUp = () => {
    dispatch(actions.orderPopulationUp());
    dispatch(actions.getPagination(1))
  }

  const reset = () => {
    dispatch(actions.getAxiosCountries());
    dispatch(actions.getPagination(1))
  }

  const onContinentChange = (e) => {
    let continent = e.target.value;
    dispatch(actions.filterByContinent(continent));
    dispatch(actions.getPagination(1))
  }

  function handleActivities(e) {
    let activity = e.target.value;
    if (activity === 'Filter by activity') {
      dispatch(actions.getAxiosCountries());
    } else {
      dispatch(actions.filterByActivities(activity));
    }


  }

  return (
    <div className='searchAndFilterBar-Container animate__animated animate__fadeInLeft'>
      <div className='searchByName-container'>
        <input className='inputSearch' type='text' onChange={onInputChange} value={name} placeholder='Search Country' />
        <Link className={name.length == 0 ? 'disable': 'active'} to={`/search/${name}`}>
          <button className='buttonSearch' type='button' disabled={name.length == 0} onClick={onClick}><FaSearch /></button>
        </Link>
      </div>

      <div className='filter-continent-container'>
        <select className='input-continent' onChange={(e) => onContinentChange(e)}>
          <option value="Filter by continent">Filter by continent</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Antarctica">Antartica</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className='filter-continent-activity'>
        <select className='input-continent' onChange={(e) => handleActivities(e)} >
          <option value={'Filter by activity'}>Filter by activity</option>
          {arrayActivities?.map(a => {
            return (
              <option
                key={a.id}
                value={a.name}> {a.name} 
                </option>
            )
          })
          }
        </select>
      </div>

      <div className='filter-Alphabetic-container'>
        <div className='Alphabetic-container'>
          <h3 className='Alphabetic'> Alphabetic: </h3>
          <button className='buttonAZ' onClick={handleAz}><FaSortAlphaDown /></button>
          <button className='buttonZA' onClick={handleZa}><FaSortAlphaUpAlt /></button>
        </div>
      </div>

      <div className='filter-Poblation-container'>
        <div className='Poblation-container'>
          <h3 className='Poblation'> Poblation: </h3>
          <button className='button90' onClick={handlePopulationDown}><FaSortNumericDownAlt /></button>
          <button className='button09' onClick={handlePopulationUp}><FaSortNumericUpAlt /></button>
        </div>
      </div>

      <div className='button-reset-container'>
        <div className='button-reset'>
          <button className='reset' onClick={reset}>RESET</button>
        </div>
      </div>

    </div>
  )
}

export default SearchAndFilterBar

