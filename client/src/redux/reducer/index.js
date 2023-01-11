import {
  COUNTRY_DETAIL,
  AXIOS_COUNTRIES,
  GET_PAGINATION,
  SEARCH_COUNTRY,
  ORDER_AZ,
  ORDER_ZA,
  FILTER_BY_CONTINENT,
  POST_ACTIVITY,
  ORDER_POPULATION_DOWN,
  ORDER_POPULATION_UP,
  FILTER_BY_ACTIVITIES,
  AXIOS_ACTIVITIES,
  MODAL_CONFIRMED
} from "../actions";


export const postPerPage = 10
const initialState = {
  countries: [],//249
  countriesList: [],
  country: [],
  searchCountry: [],
  ordenAlphabetic: [],
  filteredContinent: [],
  arrayActivities: [],
  firstPostIndex: 0,
  lastPostIndex: 9,
  currentPage: 1, //Pagina Actual
  pages: 0,//Total de paginas 25
  confirmed: false
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case AXIOS_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesList: action.payload,
        filteredContinent: action.payload,
        pages: Math.ceil(action.payload.length / postPerPage)
      }

    case COUNTRY_DETAIL: {
      return {
        ...state,
        country: action.payload
      }
    }

    case SEARCH_COUNTRY: {
      return {
        ...state,
        countries: action.payload,
        searchCountry: action.payload,
        pages: Math.ceil(action.payload.length / postPerPage)
      }
    }

    case AXIOS_ACTIVITIES:
      return {
        ...state,
        arrayActivities: action.payload
      }

    case POST_ACTIVITY:
      return {
        ...state,
        confirmed: true
      };

    case MODAL_CONFIRMED:
      return {
        ...state,
        confirmed:false
      }

    case GET_PAGINATION: {
      return {
        ...state,
        currentPage: action.payload,
        firstPostIndex: (postPerPage * (action.payload - 1)) - 1,
        lastPostIndex: (postPerPage * action.payload) - 1,
        pages: Math.ceil(state.countries.length / postPerPage)
      }
    }

    case ORDER_AZ: {
      let backupOrderAZ = [...state.countries]
      let orderAZ = backupOrderAZ.sort(function (a, b) {
        return ('' + a.name).localeCompare(b.name);
      })
      return {
        ...state,
        countries: orderAZ,
      }
    }

    case ORDER_ZA: {
      let backupOrderZA = [...state.countries]
      let orderZA = backupOrderZA.sort(function (b, a) {
        return ('' + a.name).localeCompare(b.name);
      })
      return {
        ...state,
        countries: orderZA,
      }
    }

    case ORDER_POPULATION_DOWN:
      let backup3 = [...state.countries]
      let orderPopulationDown = backup3.sort(function (a, b) {
        return a.population - b.population;
      })
      return {
        ...state,
        countries: orderPopulationDown,
      }

    case ORDER_POPULATION_UP:
      let backup4 = [...state.countries]
      let orderPopulationUp = backup4.sort(function (a, b) {
        return b.population - a.population;;
      })
      return {
        ...state,
        countries: orderPopulationUp,
      }

    case FILTER_BY_CONTINENT:
      const arrayContinent = state.filteredContinent
      const continentFounded = action.payload === 'Filter by continent' ? arrayContinent : arrayContinent.filter(e => e.continent === action.payload)
      return {
        ...state,
        countries: continentFounded
      }

    case FILTER_BY_ACTIVITIES:
      const allCountries = state.countriesList
      const filterActivity = action.payload === 'default' ? allCountries : allCountries.filter(c => c.activities && c.activities.some(a => a.name === action.payload))
      return {
        ...state,
        countries: filterActivity,
        pages: Math.ceil(filterActivity.length / postPerPage),
      }
    default:
      return state
  }
}