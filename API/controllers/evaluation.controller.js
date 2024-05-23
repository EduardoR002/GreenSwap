const models = require('../models');

async function doEvaluation(req, res){
    const { userId, idproduct, evaluation } = req.body;
    try {
        const existEvaluation = await models.evaluation.findOne({ 
            where: {userId: userId, idproduct: idproduct}});
        if (existEvaluation) {
            existEvaluation.evaluation = evaluation;
            await existEvaluation.save();
            res.status(200).json({
                message: "Evaluation made successfully",
                evaluation: existEvaluation
            });
        }
        else{
            const evaluation = {
                userId,
                idproduct,
                evaluation
            }
            const createEvaluation = await models.evaluation.create(evaluation);
            return res.status(200).json({
                message: "Evaluation made successfully",
                evaluation: createEvaluation
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function removeEvaluation(req, res){
    const { idevaluation } = req.body;
    try {
        const existEvaluation = await models.evaluation.findByPk(idevaluation);
        if (existEvaluation) {
            await existEvaluation.destroy();
            return res.status(200).json({
                message: "Evaluation successfully removed"
            });
        }
        else{
            return res.status(404).json({
                message: "Favorite not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    doEvaluation: doEvaluation,
    removeEvaluation: removeEvaluation
}