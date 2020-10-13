import { ResponseApi } from './../../shared/models/response-api';
import { UserService } from './../../shared/services/user.service';
import { SharedService } from './../../shared/services/shared.service';
import { User } from './../../shared/models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  user = new User();
  shared: SharedService;
  message: {};
  classCss: {};

  roles: User[];
  selectedRole: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();

    this.roles = [
      { id: null, profile: 'ROLE_ADMIN', email: null, password: null },
      { id: '', profile: 'ROLE_CUSTOMER', email: '', password: '' },
      { id: '', profile: 'ROLE_TECHNICIAN', email: '', password: '' },
    ];
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params.id;
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.user = responseApi.data;
      this.user.password = '';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors[0]
      });
    });
  }

  register() {
    this.message = {};
    this.userService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi) => {
      this.user = new User();
      const userRet: User = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${userRet.email} successfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors[0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
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
    };
    this.classCss['alert-' + type] = true;
  }

}
