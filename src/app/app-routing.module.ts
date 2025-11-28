import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApplicationListComponent } from './pages/application-list/application-list.component';
import { ApplicationDetailComponent } from './pages/application-detail/application-detail.component';
import { UsersComponent } from './pages/users/users.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { NafathSimulatorComponent } from './pages/nafath-simulator/nafath-simulator.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'applications', component: ApplicationListComponent },
      { path: 'applications/:id', component: ApplicationDetailComponent },
      { path: 'users', component: UsersComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'nafath-simulator', component: NafathSimulatorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
