import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as actions from '../../redux/actions/index'
import Buttom from '../Buttom/Buttom'
import Country from '../Country/Country'
import Loading from '../Loading/Loading'
import Pagination from '../Pagination/Pagination'
import './SearchName.css'

const SearchName = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.searchCountryByName(name))
  }, [])

  const currentPage = useSelector(state => state.currentPage)
  const lastPostIndex = useSelector(state => state.lastPostIndex)
  const firstPostIndex = useSelector(state => state.firstPostIndex)
  const resultCountries = useSelector(state => state.searchCountry)
  const { name } = useParams()
  const newTotalPage = Math.ceil(resultCountries.length / 10)

  return (
    <div className='resultHome-container'>
      <h2 className='titleResultSearch'>
        <p>{resultCountries.length}</p> resultados para la busqueda de:
        <p>{name}</p>
      </h2>
      <div className='resultCountries-container'>
        {resultCountries.length > 0 ? resultCountries.slice(currentPage == 1 ? 0 : firstPostIndex, currentPage == 1 ? 10 : lastPostIndex).map((c) => (
          <Country
            flag={c.flag}
            country={c.name}
            capital={c.capital}
            continent={c.continent}
            subRegion={c.subRegion}
            idCountry={c.id}
            id={c.id}
          />
        )) : <Loading />}
        <Buttom
          nameClass='buttom-landinPage'
          description='BACK'
          linkTo='/home'
        />
        <div className='paginationResultSearch'>
          <Pagination 
          paginationSearch={newTotalPage} />
        </div>
      </div>

    </div>
  )
}


export default SearchName