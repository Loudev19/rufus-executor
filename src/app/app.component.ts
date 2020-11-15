import { Component, ViewChild, ElementRef } from '@angular/core';
import { ExecService } from "./exec.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rufus-executor';

  @ViewChild('r', { read: ElementRef, static: false }) r: ElementRef;

  response: String = "";
  code: String = "";
  pythonError: boolean = false;

  constructor(private _exec: ExecService,) { }

  execute() {
    console.log(this.code);
    this._exec.executeCode(this.code).subscribe(
      res => {
        this.response = res;
        if (res.includes("PROGRAM FAILED: ")) this.pythonError = true;
        else this.pythonError = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  onTab(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.click("\t");
    }
  }

  click(e) {
    var startPos = this.r.nativeElement.selectionStart;
    this.r.nativeElement.focus();
    this.r.nativeElement.value = this.r.nativeElement.value.substr(0, this.r.nativeElement.selectionStart) + e + this.r.nativeElement.value.substr(this.r.nativeElement.selectionStart, this.r.nativeElement.value.length);
    this.code = this.r.nativeElement.value;
    this.r.nativeElement.selectionStart = startPos;
    this.r.nativeElement.focus();
  }
}
