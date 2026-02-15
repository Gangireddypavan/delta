const cloudinaryStorage = require('multer-storage-cloudinary');
console.log('Type of export:', typeof cloudinaryStorage);
console.log('Export keys:', Object.keys(cloudinaryStorage));
console.log('CloudinaryStorage prop type:', typeof cloudinaryStorage.CloudinaryStorage);
