import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { NoauthGuard } from './noauth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [NoauthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NoauthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [NoauthGuard] },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
