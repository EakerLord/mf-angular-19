// Installation prompt -> ng add @angular-architects/module-federation --project mf-angular-19 --port 4201 --type remote

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-angular-19',

  exposes: {
    "./AppComponent": "./src/app/app.component.ts",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
