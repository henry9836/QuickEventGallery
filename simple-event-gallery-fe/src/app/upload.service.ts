import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private triggerMeSource = new Subject<void>();

  triggerMe$ = this.triggerMeSource.asObservable();

  triggerMe() {
    this.triggerMeSource.next();
  }
}
