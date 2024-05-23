import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { GuestHomeComponent } from './guest-home/guest-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyBusinessComponent } from './my-business/my-business.component';
import { BusinessViewComponent } from './business-view/business-view.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { EditBusinessComponent } from './edit-business/edit-business.component';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { LoginGuard } from '../services/permiso.service';
import { RolesGuard } from '../services/roles.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DenounceComponent } from './denounce/denounce.component';
import { BusinessViewAdminComponent } from './business-view-admin/business-view-admin.component';
import { DenounceViewComponent } from './denounce-view/denounce-view.component';
import { DenounceAdminComponent } from './denounce-admin/denounce-admin.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FavoritesViewComponent } from './favorites-view/favorites-view.component';

export const routes: Routes = [
  {path:'', component:GuestHomeComponent},
  {path:'login', component:LoginComponent, canActivate:[LoginGuard]},
  {path:'login-admin', component:LoginAdminComponent, canActivate:[LoginGuard]},
  {path:'**', redirectTo:'404'},
  {path:'sign-up', component:SignUpComponent, canActivate:[LoginGuard]},
  {path:'my-business', component:MyBusinessComponent, canActivate:[RolesGuard], data: {expectedRole: ['CLIENTE']}},
  {path:'business-view/:id', component:BusinessViewComponent},
  {path:'create-business', component:CreateBusinessComponent, canActivate:[RolesGuard], data: {expectedRole: ['CLIENTE']}},
  {path:'edit-business/:id', component:EditBusinessComponent, canActivate:[RolesGuard], data: {expectedRole: ['CLIENTE']}},
  {path:'edit-profile', component:EditProfileComponent, canActivate:[RolesGuard], data: {expectedRole: ['CLIENTE']}},
  {path: "busqueda/:texto", component: BusquedaComponent },
  {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[RolesGuard], data: {expectedRole: ['MODERADOR']}},
  {path:'denounces-admin', component:DenounceAdminComponent, canActivate:[RolesGuard], data: {expectedRole: ['MODERADOR']}},
  {path:'business-view-admin/:id', component:BusinessViewAdminComponent, canActivate:[RolesGuard], data: {expectedRole: ['MODERADOR']}},
  {path:'denounce-view/:id', component:DenounceViewComponent, canActivate:[RolesGuard], data: {expectedRole: ['MODERADOR']}},
  {path:'my-profile', component:MyProfileComponent, canActivate:[RolesGuard], data: {expectedRole: ['CLIENTE']}},
  {path:'denounce-business/:id', component:DenounceComponent, canActivate:[RolesGuard], data: {expectedRole: ['CLIENTE']}},
  {path:'favorites', component:FavoritesViewComponent, canActivate:[RolesGuard], data: {expectedRole: ['CLIENTE']}},
  {path:'recuperar-contrasenia/:id', component:ChangePasswordComponent},
  {path:'reset-password', component:ResetPasswordComponent},
  

];
