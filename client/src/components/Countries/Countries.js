import React, { useEffect } from 'react'
import * as actions from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import Country from '../Country/Country'
import Loading from '../Loading/Loading'
import './Countries.css'


const Countries = () => {
  const countries = useSelector(state => state.countries)
  const currentPage= useSelector(state => state.currentPage)
  const lastPostIndex = useSelector(state => state.lastPostIndex)
  const firstPostIndex = useSelector(state => state.firstPostIndex)
  

  return (
    <>
      <div className='countries-container'>

        {countries.length > 0 ? countries.slice(currentPage == 1 ? 0 : firstPostIndex, currentPage == 1 ? 9 : lastPostIndex).map((c) => (
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

      </div>
    </>
  )
}

export default Countries



