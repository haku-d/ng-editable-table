import { AnyFunc } from "simplytyped";

export enum TableCellType {
  Input = 'input',
  InputNumber = 'inputNumber',
  Checkbox = 'checkbox',
  Dropdown = 'dropdown',
  Icon = 'icon',
  Date = 'date',
  Link = 'link',
}

export type TableColumn = {
  header: string;
  field: string;
  cellType?: TableCellType;
  width?: string;
  editable?: boolean;
  align?: 'left' | 'right' | 'center';
  iconClass?: string;
  iconOnClick?: AnyFunc;
};
