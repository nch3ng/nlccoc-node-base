import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProfileComponent } from './home/profile/profile.component';

import { Routes, RouterModule  } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { AuthGuardService as AuthGuard } from './service/auth.guard.service';
import { JwtHelper } from 'angular2-jwt';

import { CustomFormsModule } from 'ng2-validation'
import { AppRouting } from './app.routes';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HeaderComponent } from './home/header/header.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { UsersComponent } from './home/users/users.component';
import { UserComponent } from './home/user/user.component';
import { MediaComponent } from './home/media/media.component';
import { EventsComponent } from './home/events/events.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    UsersComponent,
    UserComponent,
    MediaComponent,
    EventsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CustomFormsModule,
    AppRouting  //Routes
  ],
  providers: [AuthService, AuthGuard, JwtHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
