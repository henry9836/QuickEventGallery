import {Component, Input} from '@angular/core';
import {GalleryItemInterface} from "../interfaces/galleryinterfaces";
import {GalleryItemComponentComponent} from "../gallery-item-component/gallery-item-component.component";
import {NgForOf} from "@angular/common";
import {GallerizeDirective} from "ng-gallery/lightbox";
import {HttpClient} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    GalleryItemComponentComponent,
    NgForOf,
    GallerizeDirective,
    MatIconModule
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent {
  constructor(private http: HttpClient) {}

  readonly baseUrl = 'http://scuttlinglizard.ddns.net:8001/tmp';
  galleryData: GalleryItemInterface[] = [];

  currentOffset : number = 0;
  //Limited to 20 on backend
  dbGroupSize : number = 20;

  async downloadGalleryData() {
    console.log(`Download with offset: ${this.currentOffset}`)
    let result = this.http.get("http://scuttlinglizard.ddns.net:8001/api/gallery", {
      params: {"offset": this.currentOffset}
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

  travelOnePage(bIsForward : boolean){
    if (bIsForward) {
      this.currentOffset += this.dbGroupSize;
    }
    else {
      this.currentOffset -= this.dbGroupSize;
      if (this.currentOffset < 0){
        this.currentOffset = 0;
      }
    }

    // Clear the array
    this.galleryData = [];

    // Download and populate a new one
    this.downloadGalleryData();
  }

  ngOnInit(): void {
    this.downloadGalleryData();
  }
}
