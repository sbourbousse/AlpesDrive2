import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  NgModule,
  Inject
} from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NbContextMenuModule } from "@nebular/theme";
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

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
  constructor(
    private nbMenuService: NbMenuService, 
    @Inject(NB_WINDOW) private window, 
    private authService: AuthService
  ) {}
  
  isAuth: boolean;
  items = [];
  contextItems = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
    if (this.isAuth) {
      if (this.authService.userType == "producteur") {
        this.items = [
          {
            title: "Mes produits",
            icon: "cube-outline",
            link: ["/producteur/mes-produits"]
          },
          {
            title: "Ajouter un produit",
            icon: "plus-circle-outline",
            link: ["/producteur/ajouter-un-produit"]
          },
          {
            title: "Mon compte",
            icon: "person-outline",
            children: [
              {
                title: "Mes points relais",
                icon: "home-outline",
                link: ["/producteur/mes-points-relais"]
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
            title: "Boutique",
            icon: "shopping-bag-outline",
            link: ["/client/boutique"]
          },
          {
            title: "Mon panier",
            icon: "shopping-cart-outline",
            link: ["/client/panier"]
          },
          {
            title: "Mes commandes",
            icon: "car-outline",
            link: ["/client/mes-commandes"]
          },
          {
            title: "Mon compte",
            icon: "person-outline",
            children: [
              {
                title: "Mes points relais",
                icon: "home-outline",
                link: ["/client/mes-points-relais"]
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
                link: ["/point-relais/mes-producteurs"]
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

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.window.alert(`${title} was clicked!`));
  }
}
