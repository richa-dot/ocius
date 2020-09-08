/**
 * Import all models/schema
 */
const UserModel = require("../models/user");
const DocumentManager = require("../managers/documentManager")




// -----------------------------------USER-------------------------------------------//
/**
 * RL This function is used for update personal detail of all user */
const updateUser = async function (userJson, request) {
    try {
        let profileImage = []; let files = [];
        if (request.files.length > 0) {
            request.files.forEach(element => {
                let obj = {
                    local: element.path,
                    remote: 'userImages/' + element.newName
                }
                files.push(obj);
                profileImage.push(obj.remote);
            })
            if (files.length > 0) {
                await DocumentManager.uploadFile(files);
            }
        }
        userJson.profileImagePath = profileImage[0];

        userJson.email = userJson.email.toLowerCase();
        if (!userJson._id) {
            userJson['createdOn'] = new Date();
        }
        // Check the email existence
        let duplicates = checkUserEmailDuplicacy(userJson)
        if (duplicates.emailExists)
            return { code: 200, data: { message: 'This email has already been taken.', errorExist: true, duplicates: duplicates } }

        userJson['updateOn'] = new Date();
        if (!userJson._id) {
            await UserModel(userJson).save();
        } else {
            //update the user detail
            await UserModel.updateOne({ _id: userJson._id }, { $set: userJson }, { upsert: true });
        }
        return { code: 200, data: { message: 'User has been updated successfully', errorExist: false } };

    } catch (error) {
        console.log('updateUser', error)
        return { code: 500, message: 'An error occurred. Please try after sometime.' };
    }
};

const deleteUser = async (userId) => {
    try {
        await UserModel.deleteOne({ _id: userId });
        return { code: 200, data: { message: 'User deleted successfully' } };
    } catch (error) {
        console.log("deleteUser", error);
        return { code: 500, message: 'An error occurred. Please try after sometime.' };
    }
}



/** RL Get User detail */
const getUserById = async function (body) {
    try {
        let user = await UserModel.findOne({ _id: body.userId }).lean();
        return { code: 200, data: user };
    } catch (error) {
        console.log("getUserById", error, { userId: userId });
        return { code: 500, message: 'An error occurred. Please try after sometime.' };
    }
};


/** RL Get the list of all internal users */
const getUsers = async function () {
    try {
        let users = await UserModel.find({});
        return { code: 200, data: { users: users } };
    } catch (error) {
        console.log("getUsers", error);
        return { code: 500, message: 'An error occurred. Please try after sometime.' };
    }
};


const checkUserEmailDuplicacy = async (data) => {
    let emailField = await UserModel.findOne(data._id ? { email: data.email, _id: { $ne: data.userId } } : { email: data.email });
    return Boolean(emailField)
}

module.exports = {
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
}