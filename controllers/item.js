const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

//Create Item
router.post('/create', async (req,res) => {
  try {
 const {name, quantity} = req.body
 const newItem = new Item({name, quantity})
 await newItem.save()
 res.status(201).json({new_item: newItem,})
} catch(err) {
    res.status(500).json({message: 'Failed to create item', error: err.message})
}
})

//Get Item
router.get('/get', async (req,res) => {
    try {
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({message: 'Failed to connect item', error: err.message})
    }
})

//Update Item
router.put('/update', async (req,res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.body.id, req.body, {new: true, runValidators: true,})
        if(!updatedItem) {
            return res.status(404).json({message: "Item not found"})
        }
        res.status(404).json(updatedItem)
    } catch (error) {
        res.status(500).json({message: 'Failed to update item', error: error.message})
    }
})

//Delete Item
router.delete('/delete', async (req,res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.body.id)
        if(!deletedItem) {
            return res.status(404).json({message: 'Item not found'})
        }
        res.status(200).json({message: 'Item deleted'})
    } catch (error) {
        res.status(500).json({message: 'Failed to delete item', error: err.message})
    }
})

module.exports = router