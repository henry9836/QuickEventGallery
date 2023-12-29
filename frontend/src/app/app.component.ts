import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import {GalleryComponent} from "ng-gallery";
import {GallerizeDirective, LightboxDirective} from "ng-gallery/lightbox";

interface galleryImage{
      src: string;
      thumb: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, FontAwesomeModule, GalleryComponent, GallerizeDirective, LightboxDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'frontend';
  faCloudArrowUp = faCloudArrowUp;

  galleryImages: galleryImage[] = [];

  constructor() {
    this.initializeGalleryImages();
  }

  initializeGalleryImages() {
    // Add your image paths
    const imagePaths = ['../assets/imgs/1.jpeg', '../assets/imgs/2.jpeg', '../assets/imgs/3.jpeg', '../assets/imgs/4.jpeg'];

    // Populate the galleryImages array
    imagePaths.forEach((path, index) => {
      this.galleryImages.push({
        src: path,
        thumb: path,
      });
    });
  }
}

