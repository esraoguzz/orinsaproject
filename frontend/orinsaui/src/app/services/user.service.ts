import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../components/user/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  path = environment.path;

  /*createUser(user: User) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.http.post(this.path + "/createUser", user, {headers: headers}).subscribe(); })
    });
  }*/
  /* getUser(){
    let headers = new HttpHeaders()
    headers = headers.append("Content-Type","application/json")
    this.http.get(this.path+'/getUsers',{headers:headers}).subscribe
  }*/

  createUsers(user: User) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    this.http
      .post(this.path + "/createUser", user, { headers: headers })
      .subscribe(
        err => {
          console.log("basarısız");
        },
        () => {
          console.log("basarılı");
        }
      );
  }


  postFile(fileToUpload:File) {

    const endpoint = "http://localhost:8080/upload";
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
     this.http.post(endpoint, formData).subscribe(err => {
      console.log("file yüklenmedi");
    },
    () => {
      console.log("file yüklendi");
    });
  }
}
