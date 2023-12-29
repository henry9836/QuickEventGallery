import { Component } from '@angular/core';
import {GalleryItemInterface} from "../interfaces/galleryinterfaces";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent {

  readonly baseUrl = '../assets/gallery-data/';
  galleryData: GalleryItemInterface[] = [];

  examplePhoto: GalleryItemInterface = {
    path: "1.jpeg",
    alt: "image"
  };

  constructor() {}

  ngOnInit(): void {
    this.galleryData.push(this.examplePhoto);
  }
}
