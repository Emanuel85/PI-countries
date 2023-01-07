const { Router } = require('express')
const { searchCountry, getAllCountries, searchCountryById } = require('../controllers/Country')
const router = Router();

//GET para countries && countreies?name

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name === undefined) {
      const todosPaises = await getAllCountries()
      res.json(todosPaises);
    } else {
      const search = await searchCountry(name);
      if (search.length === 0) res.status(501).send("No existe el pais");
      else res.json(search);
    }
    //retornamos el registro a mostrar
  } catch (error) {
    console.log(`No se encontro ${error}`);//cambie el console.error por un console.log
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const searchById = await searchCountryById(id.toUpperCase())
    res.json(searchById);
  } catch (err) {
    res.status(404).send(`No se encontro ${id}`);
  }
});

module.exports = router