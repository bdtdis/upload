import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  files = [];

  endpointBaseUrl = 'https://bdtdis-watermarking.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getFiles().subscribe((files) => { // @ts-ignore
      this.files = files;
    });
  }

  videoUpload(event: any) {
    this.postFile(event.target.files.item(0)).pipe(switchMap(() => this.getFiles())).subscribe((files) => { // @ts-ignore
      this.files = files;
    });
  }

  postFile(fileToUpload: File) {
    const fd: FormData = new FormData();
    fd.append('video', fileToUpload);
    return this.httpClient.post(`${this.endpointBaseUrl}/upload`, fd);
  }

  getFiles() {
    return this.httpClient.get<string[]>(`${this.endpointBaseUrl}/uploads`);
  }
}
