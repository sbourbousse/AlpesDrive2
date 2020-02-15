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
  items = [];

  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
    if (this.isAuth) {
      if (this.authService.userType == "producteur") {
        this.items = [
          {
            title: "Mes produits",
            icon: "cube-outline",
            link: ["/"]
          },
          {
            title: "Ajouter un produit",
            icon: "plus-circle-outline",
            link: ["/"]
          },
          {
            title: "Mon compte",
            icon: "person-outline",
            children: [
              {
                title: "Mes points relais",
                icon: "home-outline",
                link: ["/"]
              },
              {
                title: "Mes informations",
                icon: "options-2-outline",
                link: ["/"]
              }        
            ]
          }
        ];
      } else if (this.authService.userType == "client") {
        this.items = [
          {
            title: "Mon panier",
            icon: "shopping-cart-outline",
            link: ["/"]
          },
          {
            title: "Mes commandes",
            icon: "car-outline",
            link: ["/"]
          },
          {
            title: "Mon compte",
            icon: "person-outline",
            children: [
              {
                title: "Mes points relais",
                icon: "home-outline",
                link: ["/"]
              },
              {
                title: "Mes informations",
                icon: "options-2-outline",
                link: ["/"]
              }        
            ]
          }
        ];
      } else if (this.authService.userType == "point_relais") {
        this.items = [
          {
            title: "Mes commandes",
            icon: "car-outline",
            link: ["/"]
          },
          {
            title: "Mon entreprise",
            icon: "person-outline",
            children: [
              {
                title: "Producteurs",
                icon: "people-outline",
                link: ["/"]
              },
              {
                title: "Mes informations",
                icon: "options-2-outline",
                link: ["/"]
              }        
            ]
          }
        ];
      }
    }
  }
}
