const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      unique: true, // e.g. wallet_app
    },

    description: {
      type: String,
    },

    archivedAt: {
      type: Date,
    },
  },
  { timestamps: true },
)
