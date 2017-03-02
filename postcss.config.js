const cssnano = require('cssnano');

module.exports = {
  plugins: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions'],
      },
      discardComments: {
        removeAll: true,
      },
      orderedValues: true,
      safe: true,
      sourcemap: true,
    }),
  ],
};
