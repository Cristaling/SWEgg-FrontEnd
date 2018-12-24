import {Component, OnInit} from '@angular/core';
import {UserProfileService} from '../../../modules/user-profile/user-profile.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {JsonUserData} from '../../models/JsonUserData';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/authentication/auth.service';

@Component({
    selector: 'app-search-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

    private waitSearchTitle;
    searchedUserCtrl = new FormControl();
    filteredUsers: Observable<JsonUserData[]>;

    constructor(private userProfileService: UserProfileService,
                private router: Router,
                public authService: AuthService) {
    }

    ngOnInit() {
    }


    searchForUsers() {
        clearTimeout(this.waitSearchTitle);
        this.waitSearchTitle = setTimeout(() => {
            this.userProfileService.searchForUser(this.searchedUserCtrl.value).subscribe(users => {
                this.filteredUsers = users;
            });
        }, 500);

    }

    goToProfile(email: string) {
        this.router.navigate([`/user-profile/${email}`]);
    }
}
