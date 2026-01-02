import { Component, Input, OnInit } from '@angular/core';

export interface IUIFact {
  value: string | number;
  caption: string;
}

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss'],
  standalone: false,
})
export class FactsComponent implements OnInit {
  @Input()
  public facts: IUIFact[];

  constructor() {}

  ngOnInit(): void {}
}
