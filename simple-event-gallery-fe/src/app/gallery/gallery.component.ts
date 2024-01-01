import {Component, Input} from '@angular/core';
import {GalleryItemInterface} from "../interfaces/galleryinterfaces";
import {GalleryItemComponentComponent} from "../gallery-item-component/gallery-item-component.component";
import {NgForOf} from "@angular/common";
import {GallerizeDirective} from "ng-gallery/lightbox";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    GalleryItemComponentComponent,
    NgForOf,
    GallerizeDirective
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent {
  readonly baseUrl = '../assets/gallery-data/';
  galleryData: GalleryItemInterface[] = [
    {
      path: `${this.baseUrl}1.jpeg`,
      alt: "image alt text"
    },
    {
      path: `${this.baseUrl}2.jpeg`,
      alt: "image alt text"
    },
    {
      path: `${this.baseUrl}3.jpeg`,
      alt: "image alt text"
    },
    {
      path: `${this.baseUrl}4.jpeg`,
      alt: "image alt text"
    }
  ];

  examplePhoto: GalleryItemInterface = {
    path: `${this.baseUrl}1.jpeg`,
    alt: "manual image"
  };

  constructor() {}

  ngOnInit(): void {
    this.galleryData.push(this.examplePhoto);
  }
}
