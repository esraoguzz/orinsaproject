import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "./user";
import { element } from "@angular/core/src/render3/instructions";
import { by } from "protractor";
import {
  FileUploader,
  FileSelectDirective
} from "ng2-file-upload/ng2-file-upload";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: any = {};
  typeMemberId: number = 1;

  public uploader: FileUploader = new FileUploader({
    url: environment.path + "/upload",
    itemAlias: "photo"
  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      console.log("dosya eklenmesi");
      console.log(file);
      this.uploader.uploadItem(file);
      console.log(this.uploader.isUploading);
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("ImageUpload:uploaded:", item, status, response, headers);
      alert("File uploaded successfully");
    };
  }
  createUsers(user: User) {
    user.typeMemberId = this.typeMemberId;
    this.userService.createUsers(user);
  }

  showhiddendiv(option: number) {
    console.log("sayı" + option);
    this.typeMemberId = option;

    if (option == 1) {
      document.getElementById("extra_info").hidden = true;
      console.log("1.ci basıldı");
    } else if (option == 2) {
      document.getElementById("extra_info").hidden = false;
      console.log("2.ci basıldı");
    } else if (option == 3) {
      document.getElementById("extra_info").hidden = false;
      console.log("3.ci basıldı");
    }
  }
}
