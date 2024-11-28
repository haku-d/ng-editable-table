export interface Stock {
  id: string;
  quantity: number;
  name: string;
  active: boolean;
  width: number;
  height: number;
  priority: number;
}

export interface Part {
  id: string;
  name: string;
  width: number;
  height: number;
  quantity: number;
}

export interface Rectangle {
  id: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
  rotated?: boolean; // Track if rotated
}

export interface Container {
  id: string;
  width: number;
  height: number;
  quantity: number; // Number of available containers of this type
  placedRectangles: Rectangle[];
  waste: number;
  used: boolean; // Track if container is currently used
}