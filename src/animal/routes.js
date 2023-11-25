const {Router} = require('express');
const controller = require('./controller');
const router = Router();

router.get('/',  controller.getAnimals);
router.get('/join',  controller.join);
router.get('/join/order/:id',  controller.order);
router.get('/search/:search/:id', controller.search);
router.get('/join/:name', controller.selectAnimalByNameAndJoin);
router.get('/type',  controller.getType);
router.post("/", controller.addAnimal);
router.get('/:id',  controller.getAnimalById);
router.get('/type/:id',  controller.getTypeById);
router.put("/:id", controller.updateAnimal);
router.delete('/:id', controller.removeAnimal);

module.exports = router;