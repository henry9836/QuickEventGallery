import {Component, Input} from '@angular/core';
import {GalleryItemInterface} from "../interfaces/galleryinterfaces";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-gallery-item-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './gallery-item-component.component.html',
  styleUrl: './gallery-item-component.component.css'
})

export class GalleryItemComponentComponent {
  @Input() galleryItemInput! : GalleryItemInterface;

  isImage(filePath: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'heif']; // Add more if needed
    const extension = filePath.split('.').pop()?.toLowerCase() || '';
    return imageExtensions.includes(extension);
  }

  isVideo(filePath: string): boolean {
    const videoExtensions = ['mp4', 'webm', 'avi', 'mov']; // Add more if needed
    const extension = filePath.split('.').pop()?.toLowerCase() || '';
    return videoExtensions.includes(extension);
  }

  isUnsupported(filePath: string): boolean {
    return (!this.isImage(filePath)) && (!this.isVideo(filePath));
  }
}
