import { Router } from 'express';
import User from '../model/User';
import Token from '../model/Token';
import generateToken from '../utils/generateToken';

const router = Router();

// GET /api/v1/user
router.get('/user', async (req, res) => {
    // console.log(User)
    const user = await User.find({});
    res.json(user);
});

// DELETE /api/v1/user/5bd708bfd279eb34d088bc69
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.remove({ _id: id });
        const token = await Token.remove({ _userId: id });
        res.json({ user, token });
    } catch (e) {
        res.json(e);
    }
});

router.post('/user/requestedPlayer', async (req, res, next) => {
    const { user } = req;
    const { name } = req.body;
    user.requestedPlayerName = name;
    user.token = generateToken()
    await user.save().catch(e => next(e))
    return res.json({successe: 'Please click ingame at "get token" in cnc-eco menu'})


})

router.post('/user/addPlayer', async (req, res, next) => {
    // name is player name given from user
    const { name, worldId, token } = req.body;
    // TODO worldName comes also from where user choose world later
    console.log({ name, worldId });

    // PROTECT HACK: Find User first check if user _id from client is same like from auth
    const user = req.user;
    if (!user) {
        console.log(user);
        return next(new Error('Cannot add Player: Users id invalid'));
    }

    // player should enter the token get ingame
    if(user.token !== token) return next(new Error('Wrong or missing token'));

    // Test id user is allowed to add a player again
    if (user.playerAdded) {
        const time = user.playerAdded - new Date();
        console.log(time);
        if (time < 7 && false) return next(new Error('Cannot add Player: Users id invalid'));
    }

    // Test if the player doesn't used from other account
    const userWhoOwnsPlayer = await User.findOne({ player: name });
    if (userWhoOwnsPlayer) {
        return next(new Error('Cannot add Player: Player owns somebody else already'));
    }

    // Test if player exists on the world
    const collection = req.db.collection(`players_${worldId}`);
    if (!collection) {
        // should not happen because user cannot add any world
        return next(new Error("Cannot add Player: World doesn't exist in db"));
    }

    // find player
    const player = await collection.findOne({ name });
    if (!player) {
        console.log('no player found');
        console.log(player);
        return next(
            new Error('Cannot add Player: Player name not found - please update data ingame')
        );
    }

    // console.log(player)

    // Test if player is updated in last 2 min
    if (player._updated) {
        const minutes = (player._updated - new Date()) / 1000 / 60;
        console.log({ minutes });
        if (minutes > -3) {
            // add player to user
            // TODO test if the world is not allready inside

            user.player = name;
            user.token = ''
            user.playerAdded = new Date();

            user.worlds.push({
                worldId,
                worldName: player.serverName,
                player_id: player._id,
            });
            // const r = await collection.update({_id: player._id}, player)
            user.save((err, doc) => {
                if (err) return next(err);
                return res.json(doc);
            });
        }
    } else {
        return next(
            new Error('Cannot add Player: Player has never updated - please update data ingame')
        );
    }

    // add player to user and time
});

router.post('/user/addWorld', async (req, res, next) => {
    // name is player name given from user
    const { name, worldId } = req.body;
    // TODO worldName comes also from where user choose world later
    console.log({ name, worldId });
    if (!name) return next(new Error('Player name missing'));
    if (!worldId) return next(new Error('World missing'));

    const user = req.user;
    // TODO that schould never happen
    if (!user) {
        console.log(user);
        return next(new Error('Cannot add Player: User in not Logged in valid'));
    }

    // ANTI HACK Test if the player really is in User saved already
    if (user.player !== name) {
        return next(new Error("Cannot add Player: Player doesn't belong to this Account"));
    }

    // Test if player exists on the world
    const collection = req.db.collection(`players_${worldId}`);
    if (!collection) {
        // should not happen because user cannot add any world
        return next(new Error("Cannot add Player: World doesn't exist in db"));
    }

    // find player
    const player = await collection.findOne({ name });
    if (!player) {
        // TODO rework error - this route should not be accessible without existing player name
        console.log('no player found');
        console.log(player);
        return next(
            new Error('Cannot add World: Player name not found - please update data ingame')
        );
    }

    // Test if world not added already
    // UI protect this situation - raise higher error lvl for logging potential ui bugs
    if (user.worlds.some(e => +e.worldId === +worldId))
        return next(new Error('Cannot add World: World is already added to your user'));

    // console.log(player)

    // Test if player is updated in last 2 min
    if (player._updated) {
        user.worlds.push({
            worldId,
            worldName: player.serverName,
            player_id: player._id,
        });
        // const r = await collection.update({_id: player._id}, player)
        user.save((err, doc) => {
            if (err) return next(err);
            console.log(
                `Player ${player.name} added world  ${player.serverName} to user ${user.local.email}`
            );
            return res.json(doc);
        });
    } else {
        return next(
            new Error('Cannot add Player: Player has never updated - please update data ingame')
        );
    }

    // add player to user and time
});
router.post('/user/removeWorld', async (req, res, next) => {
    // name is player name given from user
    const { worldId } = req.body;
    // TODO worldName comes also from where user choose world later
    console.log(req.body);
    //if (!name) return next(new Error('Player name missing'));
    if (!worldId) return next(new Error('World missing'));

    const user = req.user;
    if (!user.player) {
        console.log(user);
        return next(new Error('Cannot remove World: Player name is missing'));
    }

    // Test if player exists on the world
    const collection = req.db.collection(`players_${worldId}`);
    if (!collection) {
        // should not happen because user cannot add any world
        return next(new Error("Cannot add Player: World doesn't exist in db"));
    }

    // find player
    /* const player = await collection.findOne({ name });
    if (!player) {
        // TODO rework error - this route should not be accessible without existing player name
        return next(
            // TODO REPORT THIS ISSUE to LOGGING!
            new Error('Cannot remove World: loggin player not found')
        );
    }*/

    // Test if world not added already
    // UI protect this situation - raise higher error lvl for logging potential ui bugs
    if (!user.worlds.some(e => +e.worldId === +worldId)) {
        // TODO record issue cause of ui bug potential
        return next(new Error('Cannot remove World: World is not in List'));
    }
    // console.log(player)

    // Test if player is updated in last 2 min
    try {
        user.worlds = user.worlds.filter(o => o.worldId !== worldId);
        // const r = await collection.update({_id: player._id}, player)
        user.save((err, doc) => {
            if (err) return next(err);
            //console.log(`Player ${player.name} from ${player.serverName} remove world ${worldId}`);
            return res.json(doc);
        });
    } catch (e) {
        return next(e);
    }

    // add player to user and time
});

export default router;
