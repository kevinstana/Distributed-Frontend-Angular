import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css'],
})
export class IdentificationComponent {
  roles?: string[] = [];
  rolesToOneString = '';
  username?: string;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.roles = this.storageService.getUser().roles;
    this.rolesToOneString = this.getRoles(this.roles!);
  }

  getRoles(roles: string[]): string {
    let rolesToOneString = roles.join(', ');
    return rolesToOneString;
  }
}
