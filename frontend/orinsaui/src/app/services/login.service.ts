import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}
  path = environment.path;

  getToken(username: String, password: String) {

    this.http
      .post(this.path + "/token",{username : username,password:password})
      .subscribe(
      err => {
          console.log("basarısız");
          console.log(err)
        },
        () => {
          console.log("basarılı");
        }

        
      );
  }
}
