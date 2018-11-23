import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import { JsonUserData } from 'src/app/shared/models/JsonUserData';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-handler',
  templateUrl: './profile-handler.component.html',
  styleUrls: ['./profile-handler.component.scss']
})
export class ProfileHandlerComponent implements OnInit {

    currentUser: JsonUserData;
    profileEmail: String;

    constructor(private authService: AuthService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.checkLoggedUser();
    }

    checkLoggedUser() {
        this.currentUser = this.authService.getCurrentUser();
        this.route.paramMap.subscribe(params => {
            this.profileEmail = params.get('email');
        });
        console.log(this.currentUser.email);
        console.log(this.profileEmail);
        console.log(this.currentUser.email === this.profileEmail);
    }

}