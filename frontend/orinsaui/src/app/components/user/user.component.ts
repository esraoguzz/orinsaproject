import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "./user";
import { element } from "@angular/core/src/render3/instructions";
import { by } from "protractor";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: any = {};

  ngOnInit() {}

  createUsers(user: User) {
    this.userService.createUsers(user);
  }

  showhiddendiv(option: number) {
    console.log("sayı" + option);

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
