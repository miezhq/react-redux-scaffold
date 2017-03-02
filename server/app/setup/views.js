const Nunjucks = require('express-nunjucks');

function initViews(app) {
  app.set('view engine', 'html');
  app.set('views', `${app.get('root')}/app/templates`);

  Nunjucks(app, {
    // (default: true) controls if output with dangerous characters are escaped automatically.
    autoescape: true,
    // (default: false) throw errors when outputting a null/undefined value.
    throwOnUndefined: false,
    // (default: false) automatically remove trailing newlines from a block/tag.
    trimBlocks: false,
    // (default: false) automatically remove leading whitespace from a block/tag.
    lstripBlocks: false,
    // (default: false) if true, the system will automatically update templates when they are changed on the filesystem.
    watch: true,
    // (default: false) if true, the system will avoid using a cache and templates will be recompiled every single time.
    noCache: true,
    // (default: see Nunjucks syntax) defines the syntax for Nunjucks tags.
    tags: {},
  });
}

module.exports.init = initViews;
