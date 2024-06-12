const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { validationResult } = require('express-validator');
const Blogs = require("../models/Blogs");

//ROUTE 1 : Fetch all Blogs: GET "/api/blog/fetchallnote. Doesent requrie Auth No login requrire
router.get('/fetchallblogs', fetchuser, async (req, res) => {
    try {
        const blog = await Blogs.find({ user: req.user.id })
        res.json(blog);
    } catch (error) {
        console.error(error.message);
    }
})

//ROUTE 2 : Add a new Blog:POST "/api/blog/allnote. Doesent requrie Auth No login requrire
router.post('/addblog', fetchuser, [
    // body('title', 'Enter the valid title').isLength({ min: 3 }),
    // body('description', 'Description must be atleast 5 character').isLength({ min: 5 })
    // body('description', 'Please upload vild Image type').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, image } = req.body;
        // If therer are error return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const note = new Blogs({
            title, description, image, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})
//ROUTE 3 : Update a  BLogs:POST "/api/blog/updatenote. requrie Auth login requrire
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, image } = req.body;
    try {
        // Create newNote object

        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (image) { newNote.image = image }

        // Check User login or check user update only there note not others's
        let note = await Blogs.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // Find the note to be updated or update it 
        note = await Blogs.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//ROUTE 4 : Delete a  Blogs: DELETE "/api/blog/deletenote. requrie Auth login requrire
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, image } = req.body;
    try {
        // Check User login or check user update only there note not others's
        let note = await Blogs.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // Find the note to be delete or delete it 
        note = await Blogs.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been delete successfully", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})
// ROUTE 5: Fetch a single Blog by ID: GET "/api/blog/getBlog/:id". Requires auth
router.post('/getBlog/:id', fetchuser, async (req, res) => {
    try {
        // Find the blog by ID
        const blog = await Blogs.findById(req.params.id);

        // If the blog is not found, return 404
        if (!blog) {
            return res.status(404).send("Not Found");
        }

        // Check if the user is authorized to view the blog
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Return the blog in the response
        res.json(blog);
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ message: err.message });
    }
});


module.exports = router