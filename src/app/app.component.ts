import { Component } from '@angular/core';
import { ExecService } from "./exec.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rufus-executor';

  response: String = "";
  code: String = "";

  constructor(private _exec: ExecService,) { }

  execute() {
    this._exec.executeCode(this.code).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }
}
