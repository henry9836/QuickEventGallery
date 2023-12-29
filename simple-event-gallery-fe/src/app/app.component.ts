import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FloatinguploadComponent } from "./floatingupload/floatingupload.component";
import { GalleryItemInterface } from "./interfaces/galleryinterfaces";
import { GalleryComponent } from "./gallery/gallery.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FloatinguploadComponent, GalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simple-event-gallery-fe';
}
