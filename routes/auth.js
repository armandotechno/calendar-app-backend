/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require('express-validator') // Check se encarga de validar un campo en particular, uno a la vez
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt')


const router = Router();


router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    crearUsuario );

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario );


router.get('/renew', validarJWT, revalidarToken);




module.exports = router;