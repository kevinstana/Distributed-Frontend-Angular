import { Component } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthorizedUser } from '../../_helpers/auth-user';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css'],
})
export class IdentificationComponent {
  constructor(private storageService: StorageService) {}

  username: string = '';
  strRoles: string = '';

  ngOnInit(): void {
    const user: AuthorizedUser = this.storageService.getUser();
    this.username = user.username;;
    this.strRoles = user.roles.join(', ');
  }
}

