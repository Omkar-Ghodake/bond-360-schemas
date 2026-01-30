const SessionParticipationSchema = new Schema(
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

    teamMemberId: {
      type: Schema.Types.ObjectId,
      ref: 'TeamMember',
      required: true,
    },

    joinedAt: {
      type: Date,
      required: true,
    },

    leftAt: {
      type: Date,
      default: null, // null = currently participating
    },
  },
  { timestamps: true },
)

SessionParticipationSchema.index(
  { teamMemberId: 1 },
  {
    unique: true,
    partialFilterExpression: { leftAt: null },
  },
)
