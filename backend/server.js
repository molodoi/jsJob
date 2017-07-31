const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

// Récupère tous les jobs 
const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];  
}

app.use(bodyParser.json());

/**
 * CORS - Autoriser l'accès à l'API à tous les clients
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // Continuer le traitement de notre requête
  next();
});

/**
 * Utilisez la classe express.Router pour créer des gestionnaires de route modulaires et pouvant être montés. 
 * Une instance Router est un middleware et un système de routage complet ; 
 * pour cette raison, elle est souvent appelée “mini-app”.
 * L’exemple suivant créé une routeur en tant que module, 
 * charge une fonction middleware, 
 * définit des routes et monte le module de routeur sur un chemin dans l’application principale. 
 */
const api = express.Router();

// On renvoit 
api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {
  const job = req.body;
  console.log(job);
  addedJobs = [job, ...addedJobs];
  res.json(job);
});

api.get('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); 
  const job = getAllJobs().filter(j => j.id === id);
  if(job.length === 1) {
    res.json({ success: true, job: job[0]});
  } else {
    res.json({ success: false, message: `pas de job ayant pour id ${id}`});
  }
});

app.use('/api', api);

const port = 4201;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
}); 