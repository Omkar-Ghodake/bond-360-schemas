const TeamMemberSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },

    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },

    roleInTeam: {
      type: String,
      enum: ['member', 'lead'],
      default: 'member',
    },

    joinedAt: {
      type: Date,
      required: true,
    },

    leftAt: {
      type: Date,
      default: null, // null = currently active
    },

    reason: {
      type: String,
    },
  },
  { timestamps: true },
)

// 🔒 One active team per employee
TeamMemberSchema.index(
  { employeeId: 1 },
  { unique: true, partialFilterExpression: { leftAt: null } },
)

// ⚡ Fast lookup of active members of a team
TeamMemberSchema.index({ teamId: 1, leftAt: 1 })

// ⚡ Employee membership history
TeamMemberSchema.index({ employeeId: 1, joinedAt: 1 })
