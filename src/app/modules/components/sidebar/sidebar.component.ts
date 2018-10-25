import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import {JsonUserData} from '../../../shared/models/JsonUserData';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    showMenu: string = '';
    currentUser: JsonUserData;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
