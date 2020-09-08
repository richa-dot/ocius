const routes = require('express').Router()
const UserController = require("../controllers/userController");
const multer = require('multer');
const upload = multer({ dest: 'temp' });
/**
 * Import middleWare
 */
const DocumentManager = require('../managers/documentManager')


routes.get("/getUserById", UserController.getUserById)
routes.get("/getUsers", UserController.getUsers)
routes.post("/updateUser", upload.array('file'), DocumentManager.renameFiles, UserController.updateUser)
routes.delete('/deleteUser/:userId', UserController.deleteUser)


module.exports = routes;