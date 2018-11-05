import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { FormsModule } from "@angular/forms";
import {MatCheckboxModule} from "@angular/material";
import {MatRadioModule} from "@angular/material/radio";
import { FileSelectDirective } from 'ng2-file-upload';


@NgModule({
  declarations: [AppComponent, UserComponent,FileSelectDirective],
  imports: [BrowserModule, HttpClientModule, FormsModule,MatCheckboxModule,MatRadioModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
