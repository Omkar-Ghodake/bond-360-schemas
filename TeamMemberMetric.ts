const TeamMemberMetricSchema = new Schema(
  {
    teamMemberId: {
      type: Schema.Types.ObjectId,
      ref: 'TeamMember',
      required: true,
    },

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

    /**
     * Flexible performance metrics
     * Example:
     * {
     *   "minor_bugs": 12,
     *   "critical_bugs": 3,
     *   "test_cases_executed": 243,
     *   "issue_score": 87
     * }
     */
    metrics: {
      type: Map,
      of: Number,
      default: {},
    },

    /**
     * Optional derived score snapshot
     * (can be recomputed if needed)
     */
    score: {
      type: Number,
    },

    /**
     * Lock metrics after session completion
     */
    isFinalized: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

TeamMemberMetricSchema.index(
  { teamMemberId: 1, sessionId: 1 },
  { unique: true },
)
