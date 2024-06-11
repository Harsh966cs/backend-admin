import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  source: {
    id: { type: Schema.Types.Mixed, default: null }
  },
  author: { type: String },
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String, required: [true, "Description is required"] },
  url: { type: String, required: [true, "URL is required"], unique: [true, "URL must be unique"] },
  urlToImage: { type: String, required: [true, "URL to image is required"], unique: [true, "URL to image must be unique"] },
  publishedAt: { type: Date, default: Date.now  },
  content: { type: String }
});

const PostData = mongoose.model("Post", postSchema);

export default PostData;
