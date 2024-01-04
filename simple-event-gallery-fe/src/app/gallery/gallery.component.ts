import {Component, Input} from '@angular/core';
import {GalleryItemInterface} from "../interfaces/galleryinterfaces";
import {GalleryItemComponentComponent} from "../gallery-item-component/gallery-item-component.component";
import {NgForOf} from "@angular/common";
import {GallerizeDirective} from "ng-gallery/lightbox";
import {HttpClient} from "@angular/common/http";

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
  constructor(private http: HttpClient) {}

  readonly baseUrl = 'http://scuttlinglizard.ddns.net:8001/tmp';
  galleryData: GalleryItemInterface[] = [];

  async downloadGalleryData() {
    let result = this.http.get("http://scuttlinglizard.ddns.net:8001/api/gallery", {
      params: {"offset": 0}
    }).subscribe(data =>{
      console.log("got results from db...");
      console.log(data);
      // Clear existing data in galleryData array before adding new data
      this.galleryData = [];

      // Iterate through the array and push each item to the galleryData array
      // Check if data is an array, then iterate and push each item
      if (Array.isArray(data)) {
        for (const item of data) {
          this.galleryData.push({
            path: `${this.baseUrl}/${item.filename}`,
            alt: "data"
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.downloadGalleryData();
  }
}
