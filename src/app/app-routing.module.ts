import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartydirectoryComponent } from './partydirectory/partydirectory.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MycharactersComponent } from './mycharacters/mycharacters.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'partydirectory', component: PartydirectoryComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'mycharacters', component: MycharactersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
