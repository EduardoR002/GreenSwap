const models = require('../models')

function createUser(req, res){
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        photo: req.body.photo
    }

        // Verificar se o email e o telefone são únicos
        models.user.findOne({ 
            where: {
                [models.Sequelize.Op.or]: [
                    { email: req.body.email },
                    { phone: req.body.phone }
                ]
            }
        }).then(existingUser => {
            if (existingUser) {
                // Se o email já existir, retornar erro 409 (conflito)
                if (existingUser.email === req.body.email) {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                }
                // Se o telefone já existir, retornar erro 409 (conflito)
                else if (existingUser.phone === req.body.phone) {
                    return res.status(409).json({
                        message: "Phone number already exists"
                    });
                }
            } else {
                // Se não existir, criar o novo usuário
                models.user.create(user).then(result => {
                    res.status(201).json({
                        message: "User created successfully",
                        user: result
                    });
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    });
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    createUser: createUser
}