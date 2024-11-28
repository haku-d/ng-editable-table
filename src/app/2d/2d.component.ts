import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview'
import { TableCellType, TableColumn } from '../types';
import { CommonModule } from '@angular/common';
import { TableEditCompleteEvent, TableEditInitEvent, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TwoDStore } from './2d.store';
import { Container, Part, Rectangle, Stock } from './2d.model';
import { placeBannersWithDifferentContainers } from './layout';
import { D3Component } from './d3.component';
import { SplitterModule } from 'primeng/splitter';

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
    D3Component,
    SplitterModule,
  ],
})
export class TwoDComponent implements OnInit {
  cellType = TableCellType;
  cols: TableColumn[] = [
    {
      header: 'ID',
      field: 'id',
    },
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
      header: 'ID',
      field: 'id',
    },
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
    quantity: new FormControl(),
    name: new FormControl(),
    active: new FormControl(),
    width: new FormControl(),
    height: new FormControl(),
    priority: new FormControl(),
  });

  formGroup2 = new FormGroup({
    id: new FormControl(),
    quantity: new FormControl(),
    name: new FormControl(),
    width: new FormControl(),
    height: new FormControl(),
  });

  readonly store = inject(TwoDStore);

  $stocks = this.store.stocks;
  $parts = this.store.parts;
  $data = computed(() => {
    const stocks = this.$stocks().map(this.stock2Container);
    const parts = this.$parts().map(this.part2Rectangle);
    return placeBannersWithDifferentContainers(stocks, parts);
  });

  constructor() {}

  ngOnInit(): void {}

  addStock() {
    this.store.addStock();
  }

  generateStocks() {
    this.store.generateStocks(3);
  }
  
  generateParts() {
    this.store.generateParts(5)
  }

  addPart() {
    this.store.addPart();
  }

  onEditStockInit(event: TableEditInitEvent) {
    const entity = this.$stocks()[event.index];
    this.formGroup.setValue(entity, {
      emitEvent: false,
    });
  }

  onEditStockComplete(event: TableEditCompleteEvent) {
    if (!event.field || event.index === null || event.index === undefined)
      return;
    if (this.formGroup.get(event.field)?.dirty) {
      this.store.updateStock(this.formGroup.value as Stock);
    }
  }

  onEditPartInit(event: TableEditInitEvent) {
    const entity = this.$parts()[event.index];
    this.formGroup2.setValue(entity, {
      emitEvent: false,
    });
  }

  onEditPartComplete(event: TableEditCompleteEvent) {
    if (!event.field || event.index === null || event.index === undefined)
      return;
    if (this.formGroup2.get(event.field)?.dirty) {
      this.store.updatePart(this.formGroup2.value as Part);
    }
  }

  private stock2Container(stock: Stock): Container {
    return {
      id: stock.id,
      width: stock.width,
      height: stock.height,
      quantity: stock.quantity,
      placedRectangles: [],
      waste: 0,
      used: false,
    };
  }

  private part2Rectangle(part: Part): Rectangle {
    return {
      id: part.id,
      width: part.width,
      height: part.height,
    };
  }
}
