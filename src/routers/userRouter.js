const express = require('express')
const User = require('../models/userModel')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users/add', async (req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.username,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/users/logout',auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(err) {
        res.status(500).send()
    }
}) 

router.get('/users', auth, async (req,res)=>{
    try {
        const users = await User.find({ _id: { $ne: req.query.id}})
        if (!users) {
            return res.status(400).send({error: 'couldnt find'})
        }
        res.send(users)
    } catch (err) {
        res.status(400).send({error: 'bad request'})
    }
})

module.exports = router;