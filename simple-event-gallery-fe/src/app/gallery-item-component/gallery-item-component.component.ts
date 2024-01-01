import {Component, Input} from '@angular/core';
import {GalleryItemInterface} from "../interfaces/galleryinterfaces";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-gallery-item-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-item-component.component.html',
  styleUrl: './gallery-item-component.component.css'
})

export class GalleryItemComponentComponent {
  @Input() galleryItemInput! : GalleryItemInterface;
}
