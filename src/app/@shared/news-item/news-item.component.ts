import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class NewsItemComponent implements OnInit {
  @Input()
  public image: string;

  @Input()
  public title: string;

  @Input()
  public description: string;
  public defaultImg: string = './assets/img/not-available-img.png';

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  goToNews() {
    this.router.navigate(['/news']);
  }

  composeDescription(description: string) {
    return `${description}...<b>Read more.</b>`;
  }
}
