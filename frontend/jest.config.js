// module.exports = {
//     transform: {
//         '^.+\\.(js|jsx)$': 'babel-jest', // Assuming you're using Babel
//       },
//     transformIgnorePatterns: [
//         "/node_modules/"
//       ],
//     moduleFileExtensions: ["js", "jsx", "ts", "tsx",'json', 'node'],
//     testEnvironment: "jsdom"
//   };
  
module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|other-package-to-transform)/)"
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy" // If you have CSS imports in your components
  },
}