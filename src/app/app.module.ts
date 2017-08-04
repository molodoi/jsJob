/**
 * Puisque nous construisons une application pour le navigateur, le module racine devra importer BrowserModule.
 * Configure une application basée sur le navigateur pour passer d'une application fournie par le serveur, 
 * si elle est présente sur la page. Les paramètres spécifiés doivent inclure un identifiant d'application, 
 * qui doit correspondre entre les applications client et serveur.
 */
import { BrowserModule } from '@angular/platform-browser';
/**
 * Import toutes les directives 
 */
import { NgModule } from '@angular/core';
/**
 * FormsModule contient les directives pour gérer les formulaires de façon "pilotée par le template". 
 * Nous verrons plus tard qu’il existe un autre module, ReactiveFormsModule, dans le même package @angular/forms, qui est nécessaire
 * pour la façon "pilotée par le code".
 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';

import { JobService } from './services/job.service';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';
import { DaysAgoPipe } from './pipes/days-ago.pipe';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AboutComponent } from './about/about.component';
import { ToShortDatePipe } from './pipes/to-short-date.pipe';
import { ToMoneySymbolPipe } from './pipes/to-money-symbol.pipe';
import { SearchResultComponent } from './search-result/search-result.component';
import { AuthService } from './services/auth.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Les routes de l'appli
 */
const routes = [
  { path: '', component: HomeComponent},
  { path: 'jobs/add', component: JobAddFormComponent},
  { path: 'jobs/:id', component: JobDetailsComponent},
  { path: 'jobs', component: JobListComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: AuthenticationComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: UserProfileComponent},
]

@NgModule({
  /**
   * Déclarons ci dessous les composants qui appartiennent à notre module racine
   * dans l’attribut declarations.
   */
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddFormComponent,
    DaysAgoPipe,
    HomeComponent,
    JobDetailsComponent,
    AboutComponent,
    ToShortDatePipe,
    ToMoneySymbolPipe,
    SearchResultComponent,
    AuthenticationComponent,
    RegisterComponent,
    UserProfileComponent,
    TruncatePipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,    
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [JobService, AuthService],
  /**
   * indiquer à Angular quel composant est le composant racine, 
   * c’est à dire le composant que nous devons instancier quand l’application démarre.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
