import { Route } from '@angular/router';
import { EditableTableComponent } from './table/editable.component';
import { TwoDComponent } from './2d/2d.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: EditableTableComponent,
  },
  {
    path: '2d',
    component: TwoDComponent,
  },
];
