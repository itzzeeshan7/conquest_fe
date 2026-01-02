import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-history',
  templateUrl: './listing-history.component.html',
  styleUrls: ['./listing-history.component.scss'],
  standalone: false,
})
export class ListingHistoryComponent implements OnInit {
  public datas = [
    {
      title: 'Listed with Realty Collective',
      info: [
        {
          time: '8-6-20',
          check: true,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
      ],
    },
    {
      title: 'Listed with Corcoran',
      info: [
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Permanently Off Market',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Temporarily Off Market',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Active',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Permanently Off Market',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
      ],
    },
    {
      title: 'Listed with Corcoran',
      info: [
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
        {
          time: '8-6-20',
          check: false,
          subtitle: 'Listed with realty Collective',
          price: '$1,495,000',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  firstElement(index: number): boolean {
    return index === 0;
  }

  lastElement(index: number, length: number) {
    return index === length - 1;
  }

  searchDotedLineTop(index: number, dataIndex: number): boolean {
    return dataIndex !== 0 && index === 0;
  }

  searchDotedLine(index: number, length: number, dataIndex: number, dataLength: number) {
    return dataIndex !== dataLength - 1 && index === length - 1;
  }
}
