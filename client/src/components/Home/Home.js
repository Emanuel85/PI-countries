import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as actions from '../../redux/actions/index'
import Buttom from '../Buttom/Buttom'
import Countries from '../Countries/Countries'
import Pagination from '../Pagination/Pagination'
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar'
import './Home.css'


export const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAxiosCountries())
    dispatch(actions.getActivities())
  }, [])
  return (
    <div className='home-container'>
      
      <NavLink to={'/'}>
        <h1 className='title-container'>TRAVEL SOUL</h1>
      </NavLink>
      <Countries />
      <Pagination/>
      <SearchAndFilterBar />
      <Buttom
        nameClass='button-addActivitie'
        description='CREAR ACTIVIDAD'
        linkTo='/create'
      />
    </div>
  )
}

export default Home
