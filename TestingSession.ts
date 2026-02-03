const TestingSessionSchema = new Schema(
  {
    /* -------------------------
       Core Identity
    -------------------------- */
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    coverImage: {
      type: String,
    },

    /* -------------------------
       Ownership & Context
    -------------------------- */
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    triggeredBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },

    createdByRoleContext: {
      type: String,
      enum: ['program_manager', 'team_lead'],
    },

    /* -------------------------
       Scope Definition
    -------------------------- */
    scope: {
      inScope: {
        type: [String],
        default: [],
      },
      outOfScope: {
        type: [String],
        default: [],
      },
    },

    /* -------------------------
       Time & Duration
    -------------------------- */
    startedAt: {
      type: Date,
      required: true,
    },

    endedAt: {
      type: Date,
    },

    duration: {
      from: { type: String },
      to: { type: String },
    },

    /* -------------------------
       Session Status
    -------------------------- */
    status: {
      type: String,
      enum: ['planned', 'active', 'completed', 'archived'],
      default: 'planned',
    },

    /* -------------------------
       Target Platforms
    -------------------------- */
    targetPlatforms: {
      type: [String],
      enum: ['android', 'ios', 'windows', 'macOS'],
      default: [],
    },

    /* -------------------------
       Build Details
    -------------------------- */
    builds: [
      {
        platform: {
          type: String,
          enum: ['android', 'ios', 'web'],
          required: true,
        },

        buildNumber: {
          type: String,
          required: true,
        },

        buildUrl: {
          type: String,
          required: true,
        },

        qrCodeUrl: {
          type: String,
        },
      },
    ],

    /* -------------------------
       Team Member Selection
    -------------------------- */
    participantMode: {
      type: String,
      enum: ['all', 'custom'],
      default: 'all',
    },

    /* -------------------------
       Archival
    -------------------------- */
    archivedAt: {
      type: Date,
    },
  },
  { timestamps: true },
)

// Active sessions per team
TestingSessionSchema.index({ teamId: 1, status: 1 })

// Product analytics
TestingSessionSchema.index({ productId: 1, startedAt: -1 })

// Archival filter
TestingSessionSchema.index({ archivedAt: 1 })
