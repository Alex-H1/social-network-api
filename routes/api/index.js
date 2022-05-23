const router = require('express').router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.user('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;