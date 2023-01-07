const { Router } = require('express')
const { getActivities, getActivitiesById, addActivity, updateActivity, deleteActivity } = require('../controllers/Activity')

const router = Router();

//GET de actividades
router.get("/", async (req, res) => {
  try {
    const { id } = req.params;
    const search = await getActivities(id);
    search.length ? res.json(search) : console.error(`Aun no se han creado Actividades`);
  } catch (error) {
    res.status(404).send(`Error: ${e}`);
  }
});

//GET de actividades ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActivity = await getActivities(id, req.body);
    res.send(updatedActivity);
  } catch (error) {
    res.status(404).send(`Error: ${error}`);
  }
});


// POST Activities
router.post("/", async (req, res) => {
  try {
    const newActivity = await addActivity(req.body);
    res.status(201).send(newActivity);
  } catch (error) {
    res.status(400).send(`Error: ${e}`);
  }
});


// PUT activities por ID (PARAMS)
router.put("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActivity = await updateActivity(id, req.body);
    res.send(updatedActivity);
  } catch (error) {
    res.status(404).send(`Error: ${error}`);
  }
});


// DELETE activities por ID (PARAMS)
router.delete("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteActivity(id);
    res.send(`Activity deleted successfully`);
  } catch (error) {
    res.status(404).send(`Error: ${error}`);
  }
});

module.exports = router;