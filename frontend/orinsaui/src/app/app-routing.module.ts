

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserComponent } from "./components/user/user.component";

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '', 
    component: HomepageComponent 
  },
  { 
    path: 'register',
    component: UserComponent 
  }
 /*{ 
    path: '',
    redirectTo: '/customers-us',
    pathMatch: 'full'
  },*/
  
  /* { 
    path: '**',
    component: PageNotFoundComponent 
  }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }