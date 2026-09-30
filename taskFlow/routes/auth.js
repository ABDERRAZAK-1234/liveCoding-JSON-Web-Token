// TODO 1 : importer express (require('express'))
const express = require('express');
// TODO 2 : importer jsonwebtoken (require('jsonwebtoken'))
const jwt = require('jsonwebtoken');
// TODO 3 : importer le tableau users depuis ../data/users
const users = require('../data/users');
// TODO 4 : créer le router avec express
const router = express.Router();
// TODO 5 : créer la route POST "/login" avec le handler (req, res)
router.post('/login', (req, res) =>{
    const {email , password} = req.body;

    const user = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if(!user){
        return res.status(401).json({
            success: false,
            message: "L'edentifiant est incorrect"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    return res.status(200).json({
        success: true,
        token: token
    });
});

module.exports = router;

    //   TODO 6 : extraire { email, password } de req.body

    //   TODO 7 : chercher dans users avec find() l'utilisateur dont email ET password correspondent

    //   TODO 8 : si aucun utilisateur n'est trouvé (!user)
    //     TODO 9 : faire un return res.status(401).json(...)
    //       TODO 10 : success: false
    //       TODO 11 : message: "L'identifiant est incorrect"

    //   TODO 12 : créer const token avec jwt.sign(payload, secret, options)
    //     TODO 13 : payload, propriété sub : user.id
    //     TODO 14 : payload, propriété email : user.email
    //     TODO 15 : payload, propriété role : user.role   
    //! Ne jamais inclure password dans le payload ou dans la réponse.
    //     TODO 16 : secret : process.env.JWT_SECRET
    //     TODO 17 : options : { expiresIn: "15m" }

    //   TODO 18 : faire un return res.status(200).json(...)
    //     TODO 19 : success: true
    //     TODO 20 : token



// TODO 21 : exporter router avec module.exports

