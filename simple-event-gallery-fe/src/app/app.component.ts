import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { GalleryItemInterface } from "./interfaces/galleryinterfaces";
import { GalleryComponent } from "./gallery/gallery.component";
import {UploadComponent} from "./upload/upload.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import * as bcrypt from 'bcryptjs';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, GalleryComponent, UploadComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  password : string = "";
  title = 'simple-event-gallery-fe';


hashCalc(input : string) : Observable<string> {
  return new Observable((observer) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        observer.error(err);
        return;
      }

      bcrypt.hash(input, "$2a$10$HHG.7spztBaSBHB4x3BluO", (hashErr, hash) => {
        if (hashErr) {
          observer.error(hashErr);
          return;
        }
        observer.next(hash);
        observer.complete();
      });
    });
  });
  }

  onSubmit(){
    let value = (<HTMLInputElement>document.getElementById("passwordField")).value;
    console.error(`Error: ${value}`);
    this.hashCalc(value)
      .subscribe(
        (hash) => {
          this.password = hash;
          console.error(`Error: ${hash}`);
        },
        (error) => {
          console.error(`Error: ${error}`);
        }
      );
  }
}
