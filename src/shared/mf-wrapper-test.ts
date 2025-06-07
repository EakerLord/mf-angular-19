import { loadRemoteModule as realLoadRemoteModule } from '@angular-architects/module-federation';

export const mfWrapperForTesting = { loadRemoteModule: realLoadRemoteModule };
