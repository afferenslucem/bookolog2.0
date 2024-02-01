import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

declare global {
    type nil = null | undefined;
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
