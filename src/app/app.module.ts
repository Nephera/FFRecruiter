import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup} from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatGridListModule
} from '@angular/material';

import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import {
  HeaderComponent,
  HeaderHelpDialog
} from './header/header.component';
import { ControlpanelComponent } from './header/controlpanel/controlpanel.component';

import {
  PartycardComponent,
  PartycardDescriptionDialog,
  PartycardScheduleDialog,
  PartycardJoinDialog,
  PartycardMessageDialog,
  PartycardDismissDialog
} from './partycard/partycard.component';

import { BannerComponent } from './banner/banner.component';
import { PartydirectoryComponent } from './partydirectory/partydirectory.component';

import {
  PrimarynavComponent,
  PrimarynavMessagesDialog
} from './primarynav/primarynav.component';

import { LoginformComponent } from './auth/loginform/loginform.component';
import { RegisterformComponent } from './auth/registerform/registerform.component';

import { ControlpanelService } from './header/controlpanel/controlpanel.service';
import { WelcomeComponent } from './welcome/welcome.component';
import {
  MypartiesComponent,
  MypartiesCreatepartyDialog
} from './myparties/myparties.component';

import { MycharactersComponent, 
  MycharactersAddcharacterDialog
} from './mycharacters/mycharacters.component';

import { MycharactersService } from './mycharacters/mycharacters.service';

import { PartycompositionComponent,
  PartycompositionJoinDialog,
  PartycompositionPlayerDetailsDialog 
} from './partycomposition/partycomposition.component';

import {MatStepperModule} from '@angular/material/stepper';

import { PartyscheduleComponent } from './partyschedule/partyschedule.component';
import { PartydescriptionComponent } from './partydescription/partydescription.component';
import { FooterComponent } from './footer/footer.component';
import { RecoveryformComponent } from './recoveryform/recoveryform.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { apiref } from './ref/str/apiref';
import { datacenters } from './ref/str/datacenters';
import { CharactercardComponent } from './charactercard/charactercard.component';
import { ErrorInterceptor } from './error-interceptor';

import { ErrorDialog } from './dialog/error-dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ControlpanelComponent,
    PartycardComponent,
    BannerComponent,
    PartydirectoryComponent,
    PrimarynavComponent,
    LoginformComponent,
    RegisterformComponent,
    WelcomeComponent,
    MypartiesComponent,
    MycharactersComponent,
    PartycompositionComponent,
    PartyscheduleComponent,
    PartydescriptionComponent,
    FooterComponent,
    PartycardDescriptionDialog,
    PartycardScheduleDialog,
    PartycardJoinDialog,
    PartycardMessageDialog,
    PartycardDismissDialog,
    MypartiesCreatepartyDialog,
    HeaderHelpDialog,
    PrimarynavMessagesDialog,
    RecoveryformComponent,
    PartycompositionJoinDialog,
    PartycompositionPlayerDetailsDialog,
    MycharactersAddcharacterDialog,
    CharactercardComponent,
    ErrorDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatStepperModule
  ],
  providers: [
    ControlpanelService,
    MycharactersService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    apiref,
    datacenters
  ],
  bootstrap: [AppComponent],
  entryComponents: [MycharactersAddcharacterDialog,
    PartycardComponent,
    MypartiesCreatepartyDialog,
    PartycardDescriptionDialog,
    PartycardScheduleDialog,
    PartycardJoinDialog,
    PartycardMessageDialog,
    PartycardDismissDialog,
    HeaderHelpDialog,
    PrimarynavMessagesDialog,
    PartycompositionJoinDialog,
    PartycompositionPlayerDetailsDialog,
    ErrorDialog
  ]
})
export class AppModule { }
