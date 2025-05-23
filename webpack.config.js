// Installation prompt -> ng add @angular-architects/module-federation --project mf-angular-19 --port 4201 --type remote

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-angular-19',

  exposes: {
    './Routes': './src/app/app.routes.ts' // When using router we need to export the routes insted the main component.
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: false }),
  },
});
