import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

import planetRepository from '../repositories/planet.repository.js';

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
        const index = PLANETS.findIndex((p) => p.id == req.params.idPlanet);

        if (index === -1) {
            return next(HttpError.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas`));
        }

        PLANETS.splice(index, 1);
        res.status(204).end();
    }

    async post(req, res, next) {
        const newPlanet = req.body;
        
        try  {
            let planetAdded = await planetRepository.create(newPlanet);
            planetAdded = planetAdded.toObject({getters:false, virtuals:false});
            planetAdded = planetRepository.transform(planetAdded);

            res.status(201).json(planetAdded);
        } catch(err) {
            return next(err);
        }

        
    }

    async getAll(req, res, next) {
        
        const filter = {};
        if(req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }

        //Validation des paramètres de la request
        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur c pour Celsius'));
            }
        }

        try {
            let planets = await planetRepository.retrieveAll(filter);

            planets = planets.map(p => {
                p = p.toObject({getters:false, virtuals:false});
                p = planetRepository.transform(p, transformOptions);
                return p;
            });

            res.status(200).json(planets);
        } catch(err) {
            return next(err);
        }

    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        //Validation des paramètres de la request
        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur c pour Celsius'));
            }
        }

        try {
            let planet = await planetRepository.retrieveById(idPlanet);

            if (planet) {
                //1. J'ai une planète
                planet = planet.toObject({getters:false, virtuals:false});
                planet = planetRepository.transform(planet, transformOptions);
                res.status(HttpStatus.OK).json(planet);
            } else {
                //2. J'ai pas de planète
                return next(HttpError.NotFound(`La planète ${idPlanet} n'existe pas`));
            }
        } catch (err) {
            return next(err);
        }
    }
}

new PlanetsRoutes();
export default router;
