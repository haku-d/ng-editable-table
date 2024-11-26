import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview'
import { TableCellType, TableColumn } from '../types';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-2d',
  templateUrl: './2d.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabViewModule,
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class TwoDComponent implements OnInit {
  cellType = TableCellType;
  cols: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      editable: true,
      cellType: TableCellType.Input,
    },
    {
      header: 'Width',
      field: 'width',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
      align: 'right',
    },
    {
      header: 'Height',
      field: 'height',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
      align: 'right',
    },
    {
      header: 'Quantity',
      field: 'quantity',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
      align: 'right',
    },
    {
      header: 'Priority',
      field: 'priority',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
      align: 'right',
    },
    {
      header: 'Active',
      field: 'active',
      cellType: TableCellType.Checkbox,
      width: '100px',
      align: 'center',
    },
    {
      header: '',
      field: 'code',
      cellType: TableCellType.Icon,
      iconClass: 'pi pi-trash text-red-500',
      width: '35px',
    },
  ];

  cols2: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      editable: true,
      cellType: TableCellType.Input,
    },
    {
      header: 'Width',
      field: 'width',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
      align: 'right',
    },
    {
      header: 'Height',
      field: 'height',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
      align: 'right',
    },
    {
      header: 'Quantity',
      field: 'quantity',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
      align: 'right',
    },
    {
      header: '',
      field: 'code',
      cellType: TableCellType.Icon,
      iconClass: 'pi pi-trash text-red-500',
      width: '35px',
    },
  ];

  formGroup = new FormGroup({
    id: new FormControl(),
    code: new FormControl(),
    name: new FormControl(),
    active: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    quantity: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}
}
