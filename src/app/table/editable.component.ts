import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableEditCompleteEvent, TableEditInitEvent, TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { pick } from 'lodash';

enum TableCellType {
  Input = 'input',
  InputNumber = 'inputNumber',
  Checkbox = 'checkbox',
  Dropdown = 'dropdown',
  Icon = 'icon',
  Date = 'date',
  Link = 'link',
}
type TableColumn = {
  header: string;
  field: string;
  cellType?: TableCellType;
  width?: string;
  editable?: boolean;
  align?: 'left' | 'right' | 'center';
};

@Component({
  standalone: true,
  selector: 'app-editable-table',
  templateUrl: './editable.component.html',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
})
export class EditableTableComponent implements OnInit {
  products!: any[];
  cellType = TableCellType;
  categories = ['Accessories', 'Fitness', 'Clothing'].map((label) => ({
    label,
  }));
  cols: TableColumn[] = [
    {
      header: 'Code',
      field: 'code',
      editable: true,
      cellType: TableCellType.Input,
      width: '100px',
    },
    {
      header: 'Name',
      field: 'name',
      editable: true,
      cellType: TableCellType.Input,
    },
    {
      header: 'Price',
      field: 'price',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
    },
    {
      header: 'Category',
      field: 'category',
      cellType: TableCellType.Dropdown,
      width: '200px',
    },
    {
      header: 'Quantity',
      field: 'quantity',
      editable: true,
      cellType: TableCellType.InputNumber,
      width: '150px',
    },
    {
      header: 'Active',
      field: 'active',
      cellType: TableCellType.Checkbox,
      width: '150px',
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

  onEditInit(event: TableEditInitEvent) {
    const entity = this.products[event.index];
    this.formGroup.setValue(
      pick(entity, [
        'id',
        'code',
        'name',
        'active',
        'price',
        'category',
        'quantity',
      ]),
      {
        emitEvent: false,
      }
    );
  }

  onEditComplete(event: TableEditCompleteEvent) {
    if (this.formGroup.dirty && event.index) {
      this.products = [
        ...this.products.slice(0, event.index),
        this.formGroup.value,
        ...this.products.slice(event.index + 1),
      ];
      this.formGroup.markAsPristine();
    }
  }

  ngOnInit() {
    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        active: true,
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
        active: true,
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        active: true,
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        active: true,
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        active: true,
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
        active: true,
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Chakra Bracelet',
        description: 'Product Description',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Accessories',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        active: true,
      },
    ];
  }
}
