const RoleAssignment = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },

    /**
     * Role type
     */
    role: {
      type: String,
      enum: ['program_manager', 'product_manager'],
      required: true,
    },

    /**
     * Scope of authority
     * - program_manager → team
     * - product_manager → product
     */
    scopeType: {
      type: String,
      enum: ['team', 'product'],
      required: true,
    },

    /**
     * teamId or productId (based on scopeType)
     */
    scopeId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    /**
     * Permission set (data-driven, changeable)
     * Example:
     * ['change_severity', 'change_priority', 'comment_bug']
     */
    permissions: {
      type: [String],
      default: [],
    },

    /**
     * Temporal boundaries (history)
     */
    assignedAt: {
      type: Date,
      default: Date.now,
    },

    revokedAt: {
      type: Date,
      default: null, // null = active role
    },
  },
  { timestamps: true },
)

// Only ONE active Program Manager per Team
RoleAssignment.index(
  { role: 1, scopeType: 1, scopeId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: 'program_manager',
      scopeType: 'team',
      revokedAt: null,
    },
  },
)

// Fast authorization checks
RoleAssignment.index({
  employeeId: 1,
  role: 1,
  scopeType: 1,
  scopeId: 1,
  revokedAt: 1,
})

// History queries
RoleAssignment.index({ scopeType: 1, scopeId: 1, assignedAt: -1 })
