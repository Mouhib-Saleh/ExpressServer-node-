const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/info', (req, res) => {
  const osInfo = {
    platform: os.platform(),
    type: os.type(),
    hostname: os.hostname(),
   
  };

  res.json(osInfo);
});

router.get('/cpus', (req, res) => {
    const cpus = os.cpus();
    const cpuInfo = [];
  
    for (let i = 0; i < cpus.length; i++) {
      const cpu = cpus[i];
      const cpuData = {
        model: cpu.model,
        speed: cpu.speed,
        times: cpu.times,
      };
      cpuInfo.push(cpuData);
    }
  
    res.json(cpuInfo);
  });
  router.get('/cpus/:id', (req, res) => {
    const cpuId = req.params.id;
    const cpus = os.cpus();
  
    if (cpuId < 0 || cpuId >= cpus.length) {
      return res.status(404).json({ error: 'CPU not found' });
    }
  
    const cpu = cpus[cpuId];
    const cpuData = {
      model: cpu.model,
      speed: cpu.speed,
      times: cpu.times,
    };
  
    res.json(cpuData);
  });

module.exports = router;