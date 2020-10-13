import { Component } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  showTemplate = false;
  public shared: SharedService;

  constructor(private userService: UserService){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    );
  }

  showContentWrapper(){
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }
  }

}
