import mongoose, { Schema } from "mongoose";

const Post = new Schema({
    source: {
        id: { type: Schema.Types.Mixed, default: null },
        name: { type: String, required: true }
      },
      author: { type: String },
      title: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String, required: true,unique:true},
      urlToImage: { type: String, required: true,unique:true },
      publishedAt: { type: Date, required: true },
      content: {type:String}
})

const PostData = mongoose.model("Post",Post)
export default PostData;