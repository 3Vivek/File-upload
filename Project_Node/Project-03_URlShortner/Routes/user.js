const express=require("express");
const {handleUserSignUp,handleUserLogin}=require("../Controllers/user");
const router=express.Router();


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */

router.post('/',handleUserSignUp)
router.post('/login',handleUserLogin)

module.exports=router;