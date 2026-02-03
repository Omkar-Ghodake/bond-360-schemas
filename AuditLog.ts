const AuditLogSchema = new Schema(
  {
    actorId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },

    action: {
      type: String,
      required: true,
      // examples:
      // 'SESSION_STARTED'
      // 'SESSION_ENDED'
      // 'BUG_SEVERITY_CHANGED'
      // 'BUG_STATUS_CHANGED'
      // 'ROLE_ASSIGNED'
      // 'ROLE_REVOKED'
      // 'TEAM_MEMBER_ADDED'
      // 'TEAM_MEMBER_REMOVED'
    },

    resourceType: {
      type: String,
      required: true,
      // examples:
      // 'TestingSession'
      // 'Bug'
      // 'RoleAssignment'
      // 'TeamMember'
      // 'Team'
    },

    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    /**
     * Optional structured context
     * (before/after values, reason, metadata)
     */
    context: {
      type: Schema.Types.Mixed,
      default: {},
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // immutable log
  },
)

// Fetch logs for a resource (most common)
AuditLogSchema.index({ resourceType: 1, resourceId: 1, createdAt: -1 })

// Fetch logs by actor
AuditLogSchema.index({ actorId: 1, createdAt: -1 })

// TTL: auto-delete old logs (example: 90 days)
AuditLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 },
)
