

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('ngsw-worker.js')
  .then(function(swReg) {})
  .catch(function(error) {console.error('Service Worker Error', error);});
} 
else {
  console.warn('Push messaging is not supported');
}

document.addEventListener('DOMContentLoaded', () => {
     platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
   });
