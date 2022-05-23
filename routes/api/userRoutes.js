const router = require('express').router();

const{
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/usercontroller');

// /api/courses
router.route('/').get(getUsers).post(createUser);

router
    .route('/:courseId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;