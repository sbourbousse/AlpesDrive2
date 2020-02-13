import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { BehaviorSubject } from "rxjs";
import { NbIconConfig, NbContextMenuModule } from "@nebular/theme";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
@NgModule({
  imports: [NbContextMenuModule]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isAuth: boolean;
  items = [{ title: "Profile" }, { title: "Log out" }];

  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }

  logOut() {
    this.authService.signoutUser();
  }
}
