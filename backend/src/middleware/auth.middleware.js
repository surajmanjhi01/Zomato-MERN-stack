const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

const USER_TOKEN_COOKIE = 'user_token';
const FOOD_PARTNER_TOKEN_COOKIE = 'food_partner_token';
const LEGACY_TOKEN_COOKIE = 'token';

function getTokenFromRequest(req, primaryCookieName) {
    const cookieToken = req.cookies[primaryCookieName] || req.cookies[LEGACY_TOKEN_COOKIE];
    if (cookieToken) {
        return cookieToken;
    }

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || typeof authHeader !== 'string') {
        return '';
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
        return '';
    }

    return token;
}


async function authFoodPartnerMiddleware(req, res, next) {

    const token = getTokenFromRequest(req, FOOD_PARTNER_TOKEN_COOKIE);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.foodPartner = foodPartner

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

async function authUserMiddleware(req, res, next) {
    

    const token = getTokenFromRequest(req, USER_TOKEN_COOKIE);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

module.exports = {
    authFoodPartnerMiddleware,
      authUserMiddleware
}