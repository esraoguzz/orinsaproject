import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "./user";
import { element } from "@angular/core/src/render3/instructions";
import { by } from "protractor";
import {
  FileUploader,
  FileSelectDirective,
  FileItem
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
  file1:FileItem;

  file2:FileItem;

  public uploader1: FileUploader = new FileUploader({
    url: environment.path + "/upload/sicilLevhasi",
    itemAlias: "photo"
  });
  public uploader2: FileUploader = new FileUploader({
    url: environment.path + "/upload/vergiLevhasi",
    itemAlias: "photo"
  });

  ngOnInit() {
    this.uploader1.onAfterAddingFile = file=> {
      this.file1 = file;
      file.withCredentials = false;
    };
    this.uploader2.onAfterAddingFile = file=> {
      this.file2 = file;
      file.withCredentials = false;
    };
  }
  createUsers(user: User) {

    user.typeMemberId = this.typeMemberId;
    this.uploader1.uploadItem(this.file1);
    this.uploader2.uploadItem(this.file2);

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
