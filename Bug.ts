const BugSchema = new Schema(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'TestingSession',
      required: true,
    },

    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    severity: {
      type: String,
      enum: ['minor', 'normal', 'major', 'critical', 'blocker', 'na'],
      required: true,
    },

    issue_type: {
      type: String, // UI, API, Security, etc.
    },

    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed', 'rejected'],
      default: 'open',
    },

    environment: {
      type: String,
    },

    /**
     * Media evidence attached to the bug
     * (screenshots, videos, logs, etc.)
     */
    mediaIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media',
      },
    ],

    /**
     * Embedded comments (discussion & audit)
     */
    comments: [
      {
        authorId: {
          type: Schema.Types.ObjectId,
          ref: 'Employee',
          required: true,
        },

        comment: {
          type: String,
          required: true,
        },

        /**
         * Users tagged in the comment (for notifications)
         */
        mentions: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
          },
        ],

        /**
         * Snapshot of role at the time of commenting
         */
        roleContext: {
          type: String,
          enum: [
            'team_member',
            'team_lead',
            'product_manager',
            'program_manager',
          ],
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },

    archivedAt: {
      type: Date,
    },
  },
  { timestamps: true },
)

// ⚡ Fast session-level analytics
BugSchema.index({ sessionId: 1, severity: 1 })

// ⚡ Member-level performance queries
BugSchema.index({ createdBy: 1, sessionId: 1 })

// ⚡ Team-level dashboards
BugSchema.index({ teamId: 1, createdAt: -1 })

// ⚡ Active bugs filtering
BugSchema.index({ archivedAt: 1 })

// ⚡ Severity trend analysis
BugSchema.index({ severity: 1, createdAt: -1 })
