import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Container } from './2d.model';

@Component({
  selector: 'app-d3',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  host: {
    style: 'display: block; width: 800px',
  },
})
export class D3Component implements OnChanges {
  svg: any;
  view: any;
  @Input() data: Container[] = [];

  constructor(readonly elementRef: ElementRef<HTMLDivElement>) {}

  ngOnChanges(): void {
    this.draw();
  }

  // zoomed(transform: any) {
  //   if (this.view) {
  //     this.view.attr('transform', transform);
  //   }
  // }

  draw(): void {
    const width = 800;
    const height = 600;

    d3.select(this.elementRef.nativeElement).selectAll('*').remove();

    this.svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('heigth', height)
      .attr('viewBox', [0, 0, width, height]);

    // grid lines
    const x = d3
      .scaleLinear()
      .domain([-1, width + 1])
      .range([-1, width + 1]);

    const y = d3
      .scaleLinear()
      .domain([-1, height + 1])
      .range([-1, height + 1]);

    const xAxis = d3
      .axisBottom(x)
      .ticks(((width + 2) / (height + 2)) * 10)
      .tickSize(height)
      .tickPadding(8 - height);

    const yAxis = d3
      .axisRight(y)
      .ticks(10)
      .tickSize(width)
      .tickPadding(8 - width);

    const gX = this.svg.append('g').attr('class', 'axis axis--x').call(xAxis);
    const gY = this.svg.append('g').attr('class', 'axis axis--y').call(yAxis);

    const view = this.svg
      .append('g')
      .attr('width', width)
      .attr('height', height);
    // .attr('transform', `translate(0, 0, ${width}, ${height}) scale(1)`);

    const zoomed = ({ transform }: any) => {
      view.attr('transform', transform);
      gX.call(xAxis.scale(transform.rescaleX(x)));
      gY.call(yAxis.scale(transform.rescaleY(y)));
    };

    const zoom = d3
      .zoom()
      .scaleExtent([1, 40])
      .translateExtent([
        [-100, -100],
        [width + 90, height + 100],
      ])
      .on('zoom', zoomed);

    this.svg.call(zoom);

    this.data.forEach((container, idx) => {
      const offsetX = (idx % 3) * 100 + 50;
      const offsetY = Math.floor(idx / 3) * 100 + 50;

      const containerGroup = view
        .append('g')
        .attr('transform', `translate(${offsetX}, ${offsetY})`);

      containerGroup
        .append('rect')
        .attr('width', container.width)
        .attr('height', container.height)
        .attr('fill', '#cbcbcb')
        .attr('stroke', '#cbcbcb')
        .attr('stroke-width', 1);

      container.placedRectangles.forEach((rect) => {
        containerGroup
          .append('rect')
          .attr('x', rect.x)
          .attr('y', rect.y)
          .attr('width', rect.width)
          .attr('height', rect.height)
          .attr('fill', 'steelblue')
          .attr('stroke', 'black');
      });
    });
  }
}
