import { Routes } from '@angular/router';
import { LogoUpdateComponent } from './logo-update/logo-update.component';

export const routes: Routes = [
    {
        path: ':id',
        component: LogoUpdateComponent,
    },
    { path: '**', redirectTo: '/Test_WELL_PLATFORM' }
];
