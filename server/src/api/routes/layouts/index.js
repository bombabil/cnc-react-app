import { Router } from 'express';

const router = Router();

// GET /api/v1/layout
// get a single labtop with world + coords as params
router.get('/layout', (req, res, next) => {
    const { w, x, y } = req.query;
    // TODO auth require

    const collection = req.db.collection(`layouts_${w}`);
    collection.findOne({ x, y }, (err, layout) => {
        if (err) {
            console.log(err);
            next(err);
        }
        // console.log(`GET:\t${collection.namespace} - items: ${layout.length}`)
        res.json(layout);
    });
});

// GET /api/v1/layouts
// get all layouts from a world
// TODO add a way to filter for "saw from player and/or alliance"
router.get('/layouts', async (req, res, next) => {
    let { w, skip, limit, sort } = req.query;
    limit = limit ? +limit : 50;
    skip = skip ? +skip : 50;
    try {
        const collection = req.db.collection(`layouts_${w}`);
        const layouts = await collection
            .find()
            .sort({ [sort]: -1 })
            .limit(limit)
            .skip(skip * limit)
            .toArray();
        console.log(`GET:\t${collection.namespace} - items: ${layouts.length}`);
        res.json(layouts);
    } catch (err) {
        console.log({ err });
        next(err);
    }
});

export default router;
