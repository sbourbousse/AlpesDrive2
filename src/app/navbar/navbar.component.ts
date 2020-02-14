import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  NgModule
} from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NbContextMenuModule } from "@nebular/theme";

@Component({
  selector: "app-navbar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
@NgModule({
  imports: [NbContextMenuModule]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isAuth: boolean;
  items = [
    {
      title: "Mon panier",
      icon: "shopping-cart-outline",
      link: ["/"]
    },
    {
      title: "Mon Compte",
      icon: "person-outline",
      link: ["/"]
    },
    {
      title: "Change Password",
      icon: "lock-outline",
      link: ["/"]
    }
  ];

  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }
}
