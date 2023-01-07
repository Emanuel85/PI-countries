const axios = require('axios');
const { Country, Activity } = require('../db')
const { Op } = require('sequelize')



//Realiza la carga de registros a la BD
const getAllCountries = async () => {
try {
let countryFromApi = await axios('https://restcountries.com/v3/all')
       .then(r => r.data)
     const countryDataBase = []
     const checkData = await Country.findAll({
      include: [{
        model: Activity,
        through: { attributes: [] }
      }]
     })
     if (checkData.length === 0) {
       for (let c of countryFromApi) {
         const newRegister = await Country.create({
           id: c.cca3,
           name: c.name.common,
           capital: c.capital ? c.capital[0] : 'N/A',
           flag: Array.isArray(c.flags) && c.flags[1] ? c.flags[1] : "Image not found",
           continent: c.continents[0],
           subRegion: c.subregion ? c.subregion : 'N/A',
           population: c.population.toString(),
           area: c.area.toString()
         })
         countryDataBase.push(newRegister)
       }
     } else {
       countryDataBase.push(...checkData)
     }
     console.log('Paises cargados exitosamente en la base de datos')
     return countryDataBase
   } catch (error) {
     console.log(`No pudieron cargarse los paises, ${error}.`)
   }
 }; 

//Busca el pais por nombre ?REQUERY =>VERIFICAR LA CONSULTA POR QUE NO DEVUELVE LAS ACTIVIDADES
const searchCountry = async (name) => {
  try {
    let search
    //Comprabamos que nos pasen un pais
    if (name) {//realizamos la busqueda del pais dentro de la tabla country
      search = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%` //Usamos el operador ilike para que coincidir con el pais a buscar 
          }
        }
      }, //traemos tambien las actividades q pertenecen a este
        {
          include: [{
            model: Activity,
            through: {
              attributes: []
            }
          }]
        })
    } else {
      search = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      })
      console.log(`${name} fue encontrado satisfactoriamente`)
    }
    return search.map((c) => {
      return {
        id: c.id,
        name: c.name,
        capital: c.capital,
        flag: c.flag,
        continent: c.continent,
        subRegion: c.subregion,
        population: c.population,
        area: c.area,
        activities: c.activities,
      };
    });
  } catch (err) {
    console.log(`${name} no fue encontrado`);
  }
};


//Busca por ID
const searchCountryById = async (id) => {
  try {
    return await Country.findByPk(
      id, {
      include: [{
        model: Activity,
        through: {
          attributes: []
        }
      }]
    });
  } catch (err) {
    console.error(`El ${id} no coincide con ningun pais, ${err}`);
  }
};

module.exports = {
  getAllCountries,
  searchCountry,
  searchCountryById
}


