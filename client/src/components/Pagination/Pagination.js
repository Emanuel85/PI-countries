import React, { useEffect } from 'react'
import * as actions from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import './Pagination.css'

const Pagination = () => {
  let totalPages = useSelector((state) => state.pages);//TOTAL DE PAGINAS
  const actualPages = useSelector((state) => state.currentPage)//PAGINA ACTUAL
  const foundCountry = useSelector((state) => state.searchCountry)//RESULTADO DE BUSQUEDA 
  const dispatch = useDispatch()
  const page = []

  //CONDICIONAL QUE COMPRUEBA SI SE REALIZO UNA BUSQUEDA, SI foundCountry ES MAYOR A UNO numberOfCountries TOMA COMO ACTIONS A countriesFound Y useEffect
  //dispacha numberOfCountries

  let allCountries = actions.getAxiosCountries()
  let countriesFound = actions.searchCountryByName()
  let numberOfCountries = []

  if (foundCountry.length > 0) {
    numberOfCountries = countriesFound
  } else {
    numberOfCountries = allCountries
  }

  useEffect(() => {
    dispatch(numberOfCountries)
  }, [])

  const countriesTotalPage = totalPages

  while (totalPages > 0) {
    page.unshift(totalPages)
    totalPages = totalPages - 1
  }

  return (
    <div className='pagination-container'>
      <button className='page' disabled={actualPages == 1 ? true : false} onClick={() => dispatch(actions.getPagination(actualPages - 1))}>◄</button>

      {page.map(p =>
        <button
          className={actualPages == p ? 'page-current' : actualPages + 3 >= p && actualPages - 3 <= p ? 'page' : "page-noCurrent"}
          onClick={() => dispatch(actions.getPagination(p))}>
          {actualPages + 3 >= p && actualPages - 3 <= p ? p : "..."}
        </button>)}

      <button className='page' disabled={actualPages == countriesTotalPage ? true : false} onClick={() => dispatch(actions.getPagination(actualPages + 1))}>►</button>
    </div>
  )
}

export default Pagination