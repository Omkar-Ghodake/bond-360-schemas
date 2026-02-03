const MediaSchema = new Schema(
  {
    url: {
      type: String,
      required: true, // actual file URL (S3, Cloudinary, etc.)
    },

    storageKey: {
      type: String, // internal key if using cloud storage
    },

    type: {
      type: String,
      enum: ['image', 'video', 'document', 'other'],
      default: 'other',
    },

    mimeType: {
      type: String, // image/png, video/mp4, application/pdf
    },

    size: {
      type: Number, // file size in bytes
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },

    archivedAt: {
      type: Date,
    },
  },
  { timestamps: true },
)

// Fetch media uploaded by a user
MediaSchema.index({ uploadedBy: 1, createdAt: -1 })

// Archive filtering
MediaSchema.index({ archivedAt: 1 })
