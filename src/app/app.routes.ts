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

export const routes: Routes = [
  {path:'', component:GuestHomeComponent},
  {path:'login', component:LoginComponent},
  {path:'**', redirectTo:'404'},
  {path:'sign-up', component:SignUpComponent},
  {path:'my-business', component:MyBusinessComponent},
  {path:'business-view/:id', component:BusinessViewComponent},
  {path:'create-business', component:CreateBusinessComponent},
  {path:'edit-business/:id', component:EditBusinessComponent},
  { path: "busqueda/:texto", component: BusquedaComponent }
];
