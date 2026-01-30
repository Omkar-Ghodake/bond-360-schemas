const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    long_name: {
      type: String,
    },

    short_name: {
      type: String,
    },

    cover_image_url: {
      type: String,
    },

    code: {
      type: String, // human-readable unique identifier
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

// Unique team code (if used)
TeamSchema.index(
  { code: 1 },
  {
    unique: true,
    partialFilterExpression: { code: { $exists: true } },
  },
)

// Fast filtering of active teams
TeamSchema.index({ archivedAt: 1 })

// Optional: fast lookup by name (non-unique)
TeamSchema.index({ name: 1 })
