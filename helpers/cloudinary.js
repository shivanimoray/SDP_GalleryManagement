var cloudinary = require('cloudinary');

//Cloudinary configuration
module.exports = cloudinary.config({ 
    cloud_name: 'gallerymanagement', 
    api_key: '737794942173524', 
    api_secret: 'X8dcoVu-aagDEroD0wt1K-WBEvk' 
});

module.exports.cloudinary = cloudinary;