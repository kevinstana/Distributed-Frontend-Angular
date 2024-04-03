import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { IdentificationComponent } from './components/identification/identification.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ViewMyProfileComponent } from './components/view-my-profile/view-my-profile.component';
import { ViewContractClientComponent } from './components/view-contract-client/view-contract-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewContractNotaryComponent } from './components/view-contract-notary/view-contract-notary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    IdentificationComponent,
    ContractListComponent,
    CreateContractComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ViewMyProfileComponent,
    ViewContractClientComponent,
    NotFoundComponent,
    NavbarComponent,
    ViewContractNotaryComponent,
    ViewContractNotaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
