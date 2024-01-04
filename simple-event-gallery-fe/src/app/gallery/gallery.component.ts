import {Component, Input} from '@angular/core';
import {GalleryItemInterface} from "../interfaces/galleryinterfaces";
import {GalleryItemComponentComponent} from "../gallery-item-component/gallery-item-component.component";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {UploadComponent} from "../upload/upload.component";
import {faCloudArrowUp, faLeftLong, faRightLong} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {UploadService} from "../upload.service";


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    GalleryItemComponentComponent,
    NgForOf,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    UploadComponent,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent {
  constructor(private http: HttpClient, private uploadService: UploadService) {}

  readonly baseUrl = 'http://scuttlinglizard.ddns.net:8001/tmp';
  galleryData: GalleryItemInterface[] = [];

  currentEventId : number = -1;
  currentOffset : number = 0;
  //Limited to 20 on backend
  dbGroupSize : number = 14;

  async downloadGalleryData() {

    if (this.currentEventId < 0){
      return;
    }

    console.log(`Download with offset: ${this.currentOffset}`)
    console.log(`Download with eventId: ${this.currentEventId}`)

    let result = this.http.get("http://scuttlinglizard.ddns.net:8001/api/gallery", {
      params: {"offset": this.currentOffset,
              "eventId": this.currentEventId}
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

  refreshGallery(){
    this.downloadGalleryData();
  }

  changeEvent(newEventId : number){
    this.currentEventId = newEventId;
    this.currentOffset = 0;

    // Download and populate a new one
    this.downloadGalleryData();
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

    // Download and populate a new one
    this.downloadGalleryData();
  }

  ngOnInit(): void {
    this.downloadGalleryData();

    // When uploading is done
    this.uploadService.triggerMe$.subscribe(() => {
      this.downloadGalleryData();
    });
  }

  protected readonly faCloudArrowUp = faCloudArrowUp;
  protected readonly faRightLong = faRightLong;
  protected readonly faLeftLong = faLeftLong;
}
