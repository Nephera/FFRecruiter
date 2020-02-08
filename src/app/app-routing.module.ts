import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartydirectoryComponent } from './partydirectory/partydirectory.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MycharactersComponent } from './mycharacters/mycharacters.component';
import { AuthGuard } from './auth/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { StaticdirectoryComponent} from './staticdirectory/staticdirectory.component';
import { ActivationComponent } from './activation/activation.component';
import { PatreonComponent } from './patreon/patreon.component';

const routes: Routes = [
  { path: 'partydirectory', component: PartydirectoryComponent },
  { path: 'partydirectory/:id', component: PartydirectoryComponent },
  { path: 'staticdirectory', component: StaticdirectoryComponent },
  { path: 'staticdirectory/:id', component: StaticdirectoryComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'mycharacters', component: MycharactersComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'activation', component: ActivationComponent },
  { path: 'patreon', component: PatreonComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
