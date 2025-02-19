
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId, // Usamos el clientId desde environment
      authority: environment.msalConfig.auth.authority, // Usamos authority desde environment
      redirectUri: 'https://duochospital.ddns.net', // Este valor puedes mantenerlo fijo o configurarlo también en environment
      knownAuthorities: ['mattiduoc.b2clogin.com'],
    },
  });
}
