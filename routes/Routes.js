const express = require('express');
const { Company } = require('../model/Model');
const router = express.Router();


// Get service status
router.get('/status', (req, res) => {
    res.json({ status: 'running' });
  });

// Insert a new company
router.post('/company', async (req, res) => {
   try {
    const company = new Company({
        name: req.body.name,
        location: req.body. location,
        revenue: req.body.revenue,
      });
      await company.save();
      res.status(201).json(company);
   } catch (error) {
     console.log(error)
   }
   
  });

  // Update existing company
router.put('/company/:id', async (req, res) => {
    
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
    } catch (error) {
        console.log(error)
    }
  });

  // Return list of companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.log(error)
    }
   
  });

  // Get company detail by ID

  router.get('/company/:id', async (req, res) => {
   
    try {
        const company = await Company.findById(req.params.id);
        if (company) {
          res.json(company);
        } else {
          res.status(404).json({ error: 'Company not found' });
        }
    } catch (error) {
        console.log(error)
    }
  });
  
  // Compare company details and return delta
  
router.get('/company/:id/compare/:idd', async (req, res) => {
        
      try {
          
        const company1 = await Company.findById(req.params.id);
        if (!company1) {
          return res.status(404).json({ message: 'Company 1 not found' });
        }
        const company2 = await Company.findById(req.params.idd);
        if (!company2) {
          return res.status(404).json({ message: 'Company 2 not found' });
        }
      //   Calculate the delta
        const delta = {
          name: company1.name === company2.name ? null : company2.name,
          location: company1. location === company2. location ? null : company2. location,
          revenue: company1.revenue === company2.revenue ? null : company2.revenue,
         
        };
        res.status(200).json(delta);
      } catch (err) {
        res.status(500).json({ message: 'not working'  + err.message });
      }
    });

    module.exports = router;
  
  