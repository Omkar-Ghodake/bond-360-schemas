const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    domainID: {
      type: String,
      required: true,
      unique: true,
    },

    employeeCode: {
      type: Number,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    deviceDetails: [
      {
        brand: {
          type: String,
          required: true,
        },
        model: {
          type: String,
          required: true,
        },
        os: {
          type: String,
          required: true,
        },
        osVersion: {
          type: String,
          required: true,
        },
      },
    ],

    image: {
      type: String, // profile image URL / key
    },

    archivedAt: {
      type: Date, // soft archive
    },
  },
  { timestamps: true },
)

// Unique username (login identity)
EmployeeSchema.index({ username: 1 }, { unique: true })

// Unique email if present (optional but enforced when exists)
EmployeeSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true } },
  },
)

// Fast filtering of active employees
EmployeeSchema.index({ archivedAt: 1 })
