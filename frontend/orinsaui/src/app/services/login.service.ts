import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "../../../node_modules/@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient,public router: Router) {}
  path = environment.path;

  getToken(username: String, password: String) {

    this.http
      .post(this.path + "/token",{username : username,password:password})
      .subscribe(
       (data) => {
          console.log("basarılı");
          console.log(data)
          this.router.navigate([''])
        },
        (err) => {
          console.log("basarısiz");
          console.log(err)
          alert("Kullanıcı adı veya şifre yanlış")
        }  
      );
  }
}
