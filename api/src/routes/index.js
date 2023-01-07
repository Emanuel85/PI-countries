const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter= require('./Country')
const activityRouter= require('./Activity')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();

router.use('/countries', countryRouter)
router.use('/activities', activityRouter)

module.exports = router;