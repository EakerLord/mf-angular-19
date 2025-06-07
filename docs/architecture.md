# Microfrontends Architecture

This application is designed following the microfrontends paradigm. Each functional domain is implemented as an independent microfrontend, using [Module Federation](https://webpack.js.org/concepts/module-federation/) for dynamic integration of Angular modules.

## Key Features

- **Remote module loading** (Remote Module Federation)
- **Independent deployment** for each microfrontend
- **Communication between microfrontends** via custom events and shared services
- **Integration with Nx**

## Structure

- `/mf-angular-shell`: Main microfrontend (host)
- `/mf-angular-19`: Functional microfrontend with Angular 19
- `/mf-angular-16`: Functional microfrontend with Angular 16

## Configuration files

- `/src/webpack.config.js`: Configuration of the routes that this remote app will show.
- `/src/decl.d.ts`: Declaration the host service module to be imported into the dependency injection.
- `/src/shared/mf-wrapper-test.ts`: Dedicated wrapper to test the service loaded from the host app.
- `/src/shared/remote-services.registry.ts`: Specifically register the service by giving it an instance type.
