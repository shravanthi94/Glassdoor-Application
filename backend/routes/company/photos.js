const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { companyCheckAuth } = require('../../middleware/companyAuth');

const Company = require('../../models/CompanyModel');

const photostorage = multer.diskStorage({
  destination: `${path.join(__dirname, '../..')}/public/uploads/photos`,
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.params.id}-company-${Date.now()}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const photouploads = multer({
  storage: photostorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST /company/images/photos/:id
// @desc   Upload pictures of the company
// @access Private
router.post('/photos/:id', companyCheckAuth, async (req, res) => {
  photouploads(req, res, async (err) => {
    if (!err) {
      try {
        const company = await Company.findById(req.params.id);

        company.photos.push({ file: req.file.filename, status: 'new' });

        await company.save();

        res.status(200).json(company);
      } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
      }
    } else {
      console.log('Error!', err);
    }
  });
});

// @route  GET /company/images/photos/:filename
// @desc   View the company photos
// @access Public
router.get('/photos/:filename', (req, res) => {
  const image = `${path.join(__dirname, '../..')}/public/uploads/photos/${
    req.params.filename
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(__dirname, '../..')}/public/uploads/photos/default.png`,
    );
  }
});