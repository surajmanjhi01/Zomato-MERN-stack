const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  videoUrl: String,
  caption: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
}, { timestamps: true });