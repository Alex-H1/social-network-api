const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtcontroller')
// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;