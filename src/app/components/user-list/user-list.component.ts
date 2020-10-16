import { UserService } from './../../shared/services/user.service';
import { ResponseApi } from './../../shared/models/response-api';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  page = 0;
  count = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUser: User[] = [];

  users: User[];

  cols: any[];

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.userService.findAll(page, count)
    .subscribe(
      (responseApi: ResponseApi) => {
      this.listUser = responseApi.data.content;
      this.pages = new Array(responseApi.data.totalPages);

      this.cols = [
        { field: 'email', header: 'Email' },
        { field: 'profile', header: 'Profile' },
      ];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors[0]
      });
    });
  }

  edit(id: string): void {
    this.router.navigate(['/user-new', id]);
  }

  delete(id: string): void {
    this.dialogService.confirm('Do you want to delete the email ?')
      .then((candelete: boolean) => {
        if (candelete) {
          this.message = {};
          this.userService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: `Record deleted`
            });
            this.findAll(this.page, this.count);
          }, err => {
            this.showMessage({
              type: 'error',
              text: err.error.errors[0]
            });
          });
        }
      });
  }

  setNextPage(event: any): void {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event: any): void {
    event.preventDefault();
    if (this.page > 0) {
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event: any): void {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page, this.count);
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      alert: true
    },
      this.classCss['alert-' + type] = true;
  }

}
