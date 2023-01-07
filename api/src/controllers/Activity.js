const { Country, Activity } = require('../db')
const { Op } = require('sequelize')


const getActivities = async (id) => {
  try {
    let search
    if (id) {// Traigo la actividad pasada por id incluyendo el pais q tienen esa actividad
      search = await Activity.findByPk(id, { include: [Country] })
      console.log('Actividad encontrada satisfactoriamente')
      return search
    } else { //Sino la encuentra traigo todas desde la BD con sus paises respectivos 
      search = await Activity.findAll({ order: ["id"] }, { include: [Country] });//
      return search
    }
  } catch (error) {
    console.log(`La Actividad no se pudo encontrar, (getActivities) ${error}`)
  }
}

const getActivitiesById = async (id) => {
  try {
    return await Activity.findByPk(id, {
      include: {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        }
      }
    })
  } catch (error) {
    console.log(`La Actividad no se pudo encontrar, (getActivitiesById) ${error}`)
  }
}

const addActivity = async (content) => { //REVISAR
  try {
    const { name, difficulty, duration, season, countries, image } = content;
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
      image
    });
    const searchCountry = []
    for (let i = 0; i < countries.length; i++) {
      let search = await Country.findOne({
        where: {
          name: {
            [Op.iLike]: `%${countries[i]}%`
          }
        }
      })
      searchCountry.push(search)
    }
    for (let e of searchCountry) {
      await newActivity.addCountry(e);
    }
    const returnCountry = await Activity.findByPk(newActivity.id, {
      include: [{
        model: Country,
        through: {
          attributes: []
        }
      }],
    }).then(results => results.toJSON())
    return returnCountry

  } catch (error) {
    console.error(`La actividad no se pudo agregar a la base de datos (addActivity), ${content}`);
  }
};

const updateActivity = async (id, content) => {
  try {
    const { name, difficulty, duration, season } = content;
    const activity = await Activity.findByPk(id);

    if (name) activity.name = name;
    if (difficulty) activity.difficulty = difficulty;
    if (duration) activity.duration = duration;
    if (season) activity.season = season;

    await activity.save();

    return activity;
  } catch (error) {
    console.log(`La actividad no pudo actualizarse (updateActivity), ${error}`);
  }
};

const deleteActivity = async (id) => {
  try {
    const activity = await Activity.destroy({
      where: {
        id
      }
    });
    if (activity > 0) {
      console.log(`La actividad (id: ${id}) se borro correctamente`);
    } else console.log(`La actividad no existe`);
  } catch (error) {
    console.log(`No se pudo borrar la actividad (deleteActivity), ${error}`);
  }
};

module.exports = {
  getActivities,
  getActivitiesById,
  addActivity,
  updateActivity,
  deleteActivity
}
