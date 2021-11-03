import express from 'express';
import HttpError from 'http-errors';
import paginate from 'express-paginate';

import explorationsRepository from '../repositories/explorations.repository.js';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', paginate.middleware(20, 50), this.getAll);
        router.get('/:explorationId', this.getOne);
    }

    async getAll(req, res, next) {

        const retrieveOptions = {
            skip:req.skip,
            limit:req.query.limit
        };

        try {
            
            let [explorations, documentsCount] = await explorationsRepository.retrieveAll(retrieveOptions);
            

            explorations = explorations.map(e => {
                e = e.toObject({getters:false, virtuals:false});
                e = explorationsRepository.transform(e);
                return e;
            });

            const pageCount = Math.ceil(documentsCount/req.query.limit);
            const hasNextPage = (paginate.hasNextPages(req))(pageCount);

            const response = {
                _metadata: {
                    hasNextPage: hasNextPage,
                    page: req.query.page,
                    limit: req.query.limit,
                    skip: req.skip,
                    totalPages: pageCount,
                    totalDocuments: documentsCount
                },
                _links:{
                    
                },
                data:explorations
            };

            res.status(200).json(response);

        } catch (err) {
            return next(err);
        }

    }

    async getOne(req, res, next) {

        const retrieveOptions = {};
        const transformOptions = { embed:{} };

        if(req.query.embed && req.query.embed === 'planet') {
            retrieveOptions.planet = true;
            transformOptions.embed.planet = true;
        }

        try {
            const idExploration = req.params.explorationId;
            let exploration = await explorationsRepository.retrieveById(idExploration, retrieveOptions);

            if(!exploration) {
                return next(HttpError.NotFound());
            }

            exploration = exploration.toObject({getters:false, virtuals:false});
            exploration = explorationsRepository.transform(exploration, transformOptions);

            res.status(200).json(exploration);


        } catch(err) {
            return next(err);
        }
        

    }

}

new ExplorationsRoutes();

export default router;