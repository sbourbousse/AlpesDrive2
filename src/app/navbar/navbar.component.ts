import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isAuth: boolean;

  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }

  logOut() {
    this.authService.signoutUser();
  }
}
