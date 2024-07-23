import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Note } from "../models/note.model.js" // 'User' who is talking to the database
import { ApiResponse } from "../utils/ApiResponse.js";
import conf from "../conf/conf.js";


// Add New Note
export const addNote = asyncHandler(async (req, res) => {
    const { title, description, tag } = req.body

    const newNote = await Note.create({
        owner: req.user?._id,
        title,
        description,
        tag,
    })

    if (!newNote) {
        throw new ApiError(401, "Failed to create a new note")
    }

    return res.status(201).json(
        new ApiResponse(200, newNote, "New note has been created!",)
    )

})


// Update Note
export const updateNote = asyncHandler(async (req, res) => {
    const { title, description, tag } = req.body;
    const { id } = req.params;

    const note = await Note.findById(id)

    if (!note) {
        throw new ApiError(404, "The note with given ID was not found.")
    }

    if (note.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You do not have permission to edit this note.");
    }


    // Fields to be updated
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        {
            $set: {
                title,
                description,
                tag,
                // modifiedAt: Date.now()
            },

        },
        { new: true }
    )

    if (!updatedNote) {
        throw new ApiError(401, "Failed to update the note")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedNote, "Note updated successfully")
    )

})


// Delete Note
export const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the note to be deleted
    const note = await Note.findById(id)

    if (!note) {
        throw new ApiError(404, "The note with given ID was not found.")
    }

    // Allow deletion only if users owns the Note
    if (note.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You do not have permission to edit this note.");
    }

    // Remove the note from database
    const deleteNote = await Note.findByIdAndDelete({ _id: note._id })

    if (!deleteNote) {
        throw new ApiError(401, "Failed to delete the note");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Note deleted successfully")
    )


})

// Get All Notes
export const getNotes = asyncHandler(async (req, res) => {
    const id = req.user?._id;
    const notes = await Note.find({ owner: id })

    return res.status(200).json(
        new ApiResponse(200, notes, " Successfully retrieved all your notes",)
    )
})


// Get Note
export const getNote = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const note = await Note.findOne({ _id: id, owner: req.user?._id })

    if (!note) {
        throw new ApiError(404, "No such note exists!");
    }

    return res.status(200).json(
        new ApiResponse(200, note, 'Successfully got the note')
    )
});
