module.exports = {
    testEnvironment: 'node',
    testMatch: [
      "**/tests/**/*.[jt]s?(x)", // Include your tests folder
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    // Other configurations...
  };
  