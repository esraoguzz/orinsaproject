import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { FormsModule } from "@angular/forms";
import {MatCheckboxModule} from "@angular/material";
import {MatRadioModule} from "@angular/material/radio";
import { FileSelectDirective } from 'ng2-file-upload';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 

@NgModule({
  declarations: [AppComponent, UserComponent,FileSelectDirective, LoginComponent, HomepageComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule,MatCheckboxModule,MatRadioModule,MatDialogModule,RouterModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
