import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditableTableComponent } from './table/editable.component';

@Component({
  standalone: true,
  imports: [RouterModule, EditableTableComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ng-prime';
}
