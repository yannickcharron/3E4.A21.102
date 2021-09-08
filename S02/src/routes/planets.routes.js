import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        router.get('/planets', this.getAll);
        router.get('/planets/:idPlanet', this.getOne);
        router.post('/planets', this.post);
    }

    post(req, res, next) {
        
    }

    getAll(req, res, next) {
        res.status(200); //Etape 1 = Status
        //res.set('Content-Type', 'application/json'); //Etape 2 = Contenu de la réponse
        res.json(PLANETS); //Étape 3 = Envoyer les données

        //res.status(200).json(PLANETS);
    }

    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet
        // let planet;
        // for(let p of PLANETS) {
        //     if(p.id == idPlanet) { //J'ai trouvé la planète
        //         planet = p;
        //         break;
        //     }
        // }

        const planet = PLANETS.find(p => p.id == idPlanet);
        
        
        if(planet) { //1. J'ai une planète
            res.status(HttpStatus.OK).json(planet);
        } else {
            return next(HttpError.NotFound(`La planète ${idPlanet} n'existe pas`));
        }

        
        //2. J'ai pas de planète
        


    }


}

new PlanetsRoutes();
export default router;