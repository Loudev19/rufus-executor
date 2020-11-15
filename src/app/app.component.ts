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
        this.response = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  onTab(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.code += "  ";
    }
  }
}
