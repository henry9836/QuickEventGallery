import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-floatingupload',
  standalone: true,
  imports: [
    FaIconComponent,
    MatButtonModule
  ],
  templateUrl: './floatingupload.component.html',
  styleUrl: './floatingupload.component.css'
})
export class FloatinguploadComponent {

  protected readonly faCloudArrowUp = faCloudArrowUp;
}
