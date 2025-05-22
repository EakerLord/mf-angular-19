import type { PlacesService } from 'host/PlacesService';
export const RemoteServicesRegistry: {
  placesService?: InstanceType<typeof PlacesService>;
} = {};

/*
RemoteServicesRegistry is a variable stored in the "remote-service.registry.ts" file which ensures that the same instance
is used in the host and in the remote service. Because microfrontends are used, instances can be different.
*/
