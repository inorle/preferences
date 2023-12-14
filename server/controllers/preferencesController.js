const db = require('../dbmodel.js')

const preferencesController = {};


preferencesController.addPlayer = async (req, res, next) => {
    const { name, game_id } = req.body;
    const addPlayerQuery = "INSERT INTO players (player, game_id) VALUES ($1, $2)"
    try {
        const result = await db.query(addPlayerQuery, [name, game_id])
        return next()
    }
    catch (err) {
        return next({err: 'Problem creating player', err})
    }
}

preferencesController.addPreferences = async (req, res, next) => {
    const { game_id, preferences } = req.body;
    const addPreferencesQuery = "INSERT INTO preferences (preference, game_id) VALUES ($1, $2)"

    try {
        for (el of preferences) {
            let result = await db.query(addPreferencesQuery, [el, game_id])
        }
        res.locals.game_id = game_id
        return next()
    }
    catch (error) {
        return next({err: 'Problem adding Preferences', err})
    }
}

module.exports = preferencesController;