import axios from 'axios'
export const AXIOS_COUNTRIES = 'AXIOS_COUNTRIES'
export const GET_PAGINATION = 'GET_PAGINATION'
export const ACTUAL_PAGE = 'ACTUAL_PAGE'
export const COUNTRY_DETAIL = 'COUNTRY_DETAIL'
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY '
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const POST_ACTIVITY = 'POST_ACTIVITY'
export const ORDER_AZ = 'ORDER_AZ'
export const ORDER_ZA = 'ORDER_ZA'
export const ORDER_POPULATION_UP = 'ORDER_POPULATION_UP'
export const ORDER_POPULATION_DOWN = 'ORDER_POPULATION_DOWN'
export const FILTER_BY_ACTIVITIES = 'FILTER_BY_ACTIVITIES'
export const AXIOS_ACTIVITIES = 'AXIOS_ACTIVITIES'


export const getAxiosCountries = () => {
  return async function (dispatch) {
    const resultCountries = await axios.get('https://pi-countries-5j09.onrender.com/countries')//registros cargados en resultTest
    return dispatch({
      type: AXIOS_COUNTRIES,
      payload: resultCountries.data
    })
  }
}

// export function getActivities() {
//   return async function (dispatch) {
//     try {
//       const resultActivities = await axios.get(`http://localhost:3001/activities`)
//       return dispatch({
//         type: FETCH_ACTIVITIES,
//         payload: resultActivities.data
//       });
//     } catch (error) {
//       console.log(error)
//     };
//   }
// }

export const getPagination = (payload) => {
  return {
    type: GET_PAGINATION,
    payload: payload
  }
}

export const getActivities = () => {
  return async function (dispatch) {
    try {
      const resultActivity = await axios.get(`https://pi-countries-5j09.onrender.com/activities`)
      return dispatch({
        type: AXIOS_ACTIVITIES,
        payload: resultActivity.data
      });

    } catch (error) {
      console.log('Error action postActivity ' + error)
    }
  }
}

export const getCountryDetail = (payload) => {
  return async function (dispatch) {
    const resultCountry = await axios.get(`https://pi-countries-5j09.onrender.com/countries/${payload}`)
    return dispatch({
      type: COUNTRY_DETAIL,
      payload: resultCountry.data
    })
  }
}

export const postActivity = (payload) => {
  return async function (dispatch) {
    try {
      const resultActivity = await axios.post(`https://pi-countries-5j09.onrender.com/activities`, payload)
      return dispatch({
        type: POST_ACTIVITY,
        payload: resultActivity
      });

    } catch (error) {
      console.log('Error action postActivity ' + error)
    }
  }
};

export const searchCountryByName = (payload) => {
  return async function (dispatch) {
    try {
      const resultSearch = await axios.get(`https://pi-countries-5j09.onrender.com/countries?name=${payload}`)
      return dispatch({
        type: SEARCH_COUNTRY,
        payload: resultSearch.data
      })
    } catch (error) {
      console.log('Error SearchCountryByName function', error)
    }
  }
}

export const orderAz = () => {
  return {
    type: ORDER_AZ
  }
}

export const orderZa = () => {
  return {
    type: ORDER_ZA
  }
}

export const orderPopulationDown = () => {
  return {
    type: ORDER_POPULATION_DOWN
  }
}

export const orderPopulationUp = () => {
  return {
    type: ORDER_POPULATION_UP
  }
}

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload
  }
}

export function filterByActivities(payload) {
  //console.log('Soy el PAYLOAD DE ACTIVITIDAD',payload)
  return {
    type: FILTER_BY_ACTIVITIES,
    payload: payload
  }
}
