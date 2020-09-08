/**
 * Import all required modules
 */
const fs = require('fs');
const crypto = require('crypto');
var path = require('path');

const uploadFile = async function (paths) {
    try {
        console.log(paths);
        await Promise.all(paths.map(async ({ local}) => {
            var f = path.basename(local);
            var dest = path.resolve('userImages/', f);
            fs.rename(local, dest, async (err) => {
                if (err) throw err;
                else {
                    let exists = await fs.existsSync(local);
                    if (exists) {
                        await fs.unlinkSync(local)
                    }
                }
            });

            return
        }))
    } catch (error) {
        console.log(error);
    }
}

const renameFiles = async function (request, response, next) {
    let files = request.file ? [request.file] : request.files;
    if (files.length > 0) {
        let promises = [];
        files.forEach(file => {
            let extension = file.originalname.split('.').pop();
            let newName = 'ocius' + crypto.randomBytes(3).toString('hex') + 'T' + Date.now() + '.' + extension;
            let newPath = 'temp/' + newName;
            promises.push(fs.renameSync(file.path, newPath))
            file.path = newPath
            file['newName'] = newName;
        });
        await Promise.all(promises);
    }
    next()
}



module.exports = {
    renameFiles,
    uploadFile
}