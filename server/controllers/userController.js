const UserManager = require("../managers/userManager");

const getUserById = function (request, response) {
    UserManager.getUserById(request.query)
        .then(result => response.status(result.code).json(result.data))
        .catch(error => response.status(error.code).json(error.message));
};

const getUsers = function (request, response) {
    UserManager.getUsers()
        .then(result => response.status(result.code).json(result.data))
        .catch(error => response.status(error.code).json(error.message));
};

const updateUser = function (request, response) {
    UserManager.updateUser(JSON.parse(request.body.jsonData), request)
        .then(result => response.status(result.code).json(result.data))
        .catch(error => response.status(error.code).json(error.message));
};


const deleteUser = function (request, response) {
    UserManager.deleteUser(request.params.userId)
        .then(result => response.status(result.code).json(result.data))
        .catch(error => response.status(error.code).json(error.message));
}


module.exports = {
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
}