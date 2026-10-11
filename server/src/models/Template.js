const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    category: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

// expose "id" in JSON responses to match the spec (id, name, description, thumbnail_url, category)
templateSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model('Template', templateSchema);
