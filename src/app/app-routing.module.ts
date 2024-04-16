import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ViewMyProfileComponent } from './components/view-my-profile/view-my-profile.component';
import { ViewContractClientComponent } from './components/view-contract-client/view-contract-client.component';
import { ViewContractNotaryComponent } from './components/view-contract-notary/view-contract-notary.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard]},
  { path: 'contracts', component: ContractListComponent, canActivate: [AuthGuard]},
  { path: 'contract/:id', component: ViewContractNotaryComponent, canActivate: [AuthGuard]},
  { path: 'create-contract', component: CreateContractComponent, canActivate: [AuthGuard] },
  { path: 'my-contract/:id', component: ViewContractClientComponent, canActivate: [AuthGuard] },
  { path: 'my-profile/:id', component: ViewMyProfileComponent, canActivate: [AuthGuard] },
  { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  // { path: 'my-contract', component: ViewMyContractComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
