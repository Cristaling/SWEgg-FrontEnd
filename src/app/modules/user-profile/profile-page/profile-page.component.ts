import { FlexLayoutModule } from '@angular/flex-layout';
import { JsonUserData } from './../../../shared/models/JsonUserData';
import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import {takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    @Input() userEmail: string;
    user: JsonUserData;
    profilePicture: any;

    constructor(private authService: AuthService,
        private profileService: ProfileService) { }

    ngOnInit() {
        if (this.userEmail) {
            this.loadUserData();
        }
    }

    loadUserData() {
        this.profileService.getProfile(this.userEmail)
        .pipe(takeUntil(this.navigateToOtherComponent))
        .subscribe((userResponse: JsonUserData) => {
            this.user = userResponse;
        }, (error) => {
        });
    }

    getProfilePicture(email: string) {
        return this.authService.getProfilePicture(email);
    }

}
