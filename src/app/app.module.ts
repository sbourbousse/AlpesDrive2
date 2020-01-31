import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

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

const appRoutes: Routes = [
  { path: "accueil", component: HomeComponent },
  { path: "connexion", component: SigninComponent },
  { path: "inscription", component: SignupComponent },
  { path: "inscription/producteur", component: ProducteurComponent },
  { path: "inscription/point-relais", component: PointRelaisComponent },
  { path: "inscription/client", component: ClientComponent },
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
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
