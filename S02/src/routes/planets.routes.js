import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.delete);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    patch(req, res, next) {
        return next(HttpError.NotImplemented());
    }

    put(req, res, next) {
        return next(HttpError.MethodNotAllowed());
    }

    delete(req, res, next) {

        const index = PLANETS.findIndex(p => p.id == req.params.idPlanet);

        if(index === -1) {
            return next(HttpError.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas`))
        }

        PLANETS.splice(index, 1);
        res.status(204).end();

    }

    post(req, res, next) {
        const newPlanet = req.body;
        const planet = PLANETS.find(p => p.id == newPlanet.id);

        if(planet) {
            //Doublon detected !!!!
            return next(HttpError.Conflict(`La planète avec l'identifiant ${newPlanet.id} existe déjà`));
        } else {
            PLANETS.push(newPlanet);
            res.status(201).json(newPlanet);
        }

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