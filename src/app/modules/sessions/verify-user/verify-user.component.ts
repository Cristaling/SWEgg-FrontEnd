import {Component, OnDestroy, OnInit} from '@angular/core';
import {VerifyUserService} from './verify-user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed


    constructor(private verifyUserService: VerifyUserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
         const token = params['token'];
         if (token == null || token === '') {
             this.router.navigate(['sessions/login']);
         }
         this.verifyUserService.verifyUserByToken(token).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            setTimeout(() => {
                this.router.navigate(['sessions/login']);
            }, 3000);
         },error1 => {
             this.router.navigate(['sessions/login']);
         });
      });
  }

    ngOnDestroy(): void {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }



}
