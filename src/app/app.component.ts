import { Component, NgModule, OnInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private sidebarService: NbSidebarService,
    private authService: AuthService
  ) {}
  
  title = "Alpes Drive";
  isAuth: boolean;

  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }
}
