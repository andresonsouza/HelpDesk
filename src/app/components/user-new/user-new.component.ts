import { ResponseApi } from './../../shared/models/response-api';
import { UserService } from './../../shared/services/user.service';
import { SharedService } from './../../shared/services/shared.service';
import { User } from './../../shared/models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  roles: any[];
  selectedRole: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();

    this.roles = [
      { label: 'ADMIN', value: 'ROLE_ADMIN' },
      { label: 'CUSTOMER', value: 'ROLE_CUSTOMER' },
      { label: 'TECHNICIAN', value: 'ROLE_TECHNICIAN' }
    ];
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    if (id !== undefined) {
      this.findById(id);
    }
  }

  findById(id: string): void {
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

  register(): void {
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

  showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  buildClasses(type: string): void {
    this.classCss = {
      alert: true
    };
    this.classCss['alert-' + type] = true;
  }

}
