// src/models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  _id: String,
  itemRowID: Number,
  itemID: Number,
  itemRev: Number,
  collectionID: Number,
  itemSearch: String,
  itemUpdated: Date,
  itemUpdatedBy: String,
  title: String,
  _title: String,
  slug: String,
  title_slug: String,
  legacy_slug: String,
  dateTime: String,
  status: String,
  categories: [String],
  image: {
    assetID: String,
    title: String,
    _default: String,
    bucket: String,
    path: String,
    size: Number,
    w: Number,
    h: Number,
    mime: String,
    sizes: {
      thumb: {
        w: Number,
        h: Number,
        target_w: Number,
        target_h: Number,
        density: Number,
        path: String,
        size: Number,
        mime: String,
        assetID: String,
      },
    },
  },
  image_alt: String,
  meta_title: String,
  meta_desc: {
    _flang: String,
    raw: String,
    processed: String,
  },
  og_image: String,
  excerpt: {
    _flang: String,
    raw: String,
    processed: String,
  },
  desc: {
    _flang: String,
    raw: String,
    processed: String,
  },
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);