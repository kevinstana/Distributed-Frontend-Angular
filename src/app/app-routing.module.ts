import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { CreateContractComponent } from './create-contract/create-contract.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { ViewMyContractComponent } from './view-my-contract/view-my-contract.component';
import { ViewContractNotaryComponent } from './view-contract-notary/view-contract-notary.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'contracts', component: ContractListComponent },
  { path: 'create-contract', component: CreateContractComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'my-profile', component: ViewMyProfileComponent },
  { path: 'my-contract', component: ViewMyContractComponent },
  { path: 'view-contract', component: ViewContractNotaryComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
