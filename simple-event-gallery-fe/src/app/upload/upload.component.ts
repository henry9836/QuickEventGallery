import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClient, HttpEventType, HttpRequest} from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {finalize, Subscription} from 'rxjs';
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    FaIconComponent
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})

export class UploadComponent {

  @Input()
  requiredFileType: string = "image/*, video/*";

  baseApiUrl: string = "http://scuttlinglizard.ddns.net:8001/api";
  activeFileName: string = "";

  constructor(private http: HttpClient) {
  }

  uploadSub: Subscription | null = null;
  uploadProgress: number | null = 0.0;

  onFileSelected(event: Event) {
    console.log("clicked!");
    console.log(event);

    if (event.target == null) {
      return;
    }

    const files: FileList | null = (event.target as HTMLInputElement).files;
    if (files == null) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      console.log(files[i].name);
      this.uploadFile(files[i]);
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const upload$ = this.http.post(`${(this.baseApiUrl)}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      finalize(() => this.reset())
    );
    upload$.subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.activeFileName = file.name;
        if (event.total)
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      }
    })
  }

  cancelUpload() {
    this.reset();
  }

  reset() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }
    this.uploadProgress = null;
    this.uploadSub = null;
    this.activeFileName = "";
  }

  protected readonly faCloudArrowUp = faCloudArrowUp;
}
