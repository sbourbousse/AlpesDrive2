import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  NbIconModule,
  NbUserModule,
  NbButtonModule,
  NbBadgeModule,
  NbThemeModule,
  NbSelectModule,
  NbCardModule,
  NbLayoutModule,
  NbContextMenuModule,
  NbActionsModule,
  NbDialogModule,
  NbMenuModule,
  NbDatepickerModule,
  NbSidebarModule,
  NbStepperModule,
  NbInputModule
} from "@nebular/theme";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ProducteurComponent } from "./auth/signup/producteur/producteur.component";
import { PointRelaisComponent } from "./auth/signup/point-relais/point-relais.component";
import { ClientComponent } from "./auth/signup/client/client.component";
import { FourOhFourComponent } from "./four-oh-four/four-oh-four.component";
import { EntrepriseComponent } from "./auth/signup/entreprise/entreprise.component";
import { MailComponent } from "./auth/signup/mail/mail.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { HeaderComponent } from "./header/header.component";
import { PointRelaisListComponent } from './producteur/point-relais-list/point-relais-list.component';
import { ProduitAddComponent } from './producteur/produit-add/produit-add.component';
import { CategorieChooseComponent } from './producteur/categorie-choose/categorie-choose.component';
import { ProduitChooseComponent } from './producteur/produit-choose/produit-choose.component';
import { VarieteChooseComponent } from './producteur/variete-choose/variete-choose.component';
import { VenteListComponent } from './producteur/vente-list/vente-list.component';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: "accueil", component: HomeComponent },
  { path: "connexion", component: SigninComponent },
  { path: "inscription", component: SignupComponent },
  { path: "inscription/producteur", component: ProducteurComponent },
  { path: "inscription/point-relais", component: PointRelaisComponent },
  { path: "inscription/client", component: ClientComponent },
  { path: "inscription/mail", component: MailComponent },
  { path: "producteur/mes-points-relais", canActivate: [AuthGuardService], component: PointRelaisListComponent, data: {role: ['producteur']} },
  { path: "producteur/ajouter-un-produit", canActivate: [AuthGuardService], component: ProduitAddComponent, data: {role: ['producteur']} },
  { path: "producteur/mes-produits", canActivate: [AuthGuardService], component: VenteListComponent, data: {role: ['producteur']} },
  { path: "", redirectTo: "/accueil", pathMatch: "full" },
  { path: "**", component: FourOhFourComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProducteurComponent,
    PointRelaisComponent,
    ClientComponent,
    FourOhFourComponent,
    EntrepriseComponent,
    MailComponent,
    HeaderComponent,
    PointRelaisListComponent,
    ProduitAddComponent,
    CategorieChooseComponent,
    ProduitChooseComponent,
    VarieteChooseComponent,
    VenteListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbActionsModule,
    NbCardModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbStepperModule,
    NbInputModule,
    NbSelectModule,
    NbContextMenuModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CategorieChooseComponent
  ]
})
export class AppModule {}
