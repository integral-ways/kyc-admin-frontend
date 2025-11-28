import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApplicationListComponent } from './pages/application-list/application-list.component';
import { ApplicationDetailComponent } from './pages/application-detail/application-detail.component';
import { UsersComponent } from './pages/users/users.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { NafathSimulatorComponent } from './pages/nafath-simulator/nafath-simulator.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ApplicationListComponent,
    ApplicationDetailComponent,
    UsersComponent,
    StatisticsComponent,
    NafathSimulatorComponent,
    LayoutComponent,
    SearchBarComponent,
    NotificationComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
