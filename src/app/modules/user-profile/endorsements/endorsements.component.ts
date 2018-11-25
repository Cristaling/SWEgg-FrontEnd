import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-endorsements',
  templateUrl: './endorsements.component.html',
  styleUrls: ['./endorsements.component.scss']
})
export class EndorsementsComponent implements OnInit {

    @Input() userEmail: string;

    constructor() { }

    ngOnInit() {
        this.loadUserEndorsements();
    }

    loadUserEndorsements() {

    }

}
