import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { IdentificationComponent } from './identification/identification.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { CreateContractComponent } from './create-contract/create-contract.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { ViewMyContractComponent } from './view-my-contract/view-my-contract.component';
import { ViewContractNotaryComponent } from './view-contract-notary/view-contract-notary.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    ViewMyContractComponent,
    ViewContractNotaryComponent,
    NotFoundComponent,
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
