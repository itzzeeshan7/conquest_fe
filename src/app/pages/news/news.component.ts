import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user/user.service';
import news from '../../../assets/files/news.json';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class NewsComponent implements OnInit {
  constructor(private userService: UserService) {}

  public news: any = news;
  public defaultImg: string = './assets/img/not-available-img.png';

  ngOnInit(): void {
    // this.getNews();
  }

  getNews() {
    this.userService.getNews().subscribe((news) => {
      this.news = news.sort((a: any, b: any) => +b.id - +a.id);
    });
  }
}
