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
  checked= true;

  ngOnInit() {
    
  }

  createUsers(user: User) {
    this.userService.createUsers(user);
  }
}
