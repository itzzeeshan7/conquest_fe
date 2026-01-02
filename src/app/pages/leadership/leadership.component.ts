import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-leadership-component',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.scss'],
  animations: [
    trigger('slideInOut', [
      // Note the trigger name
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ height: '0', overflow: 'hidden' }),
        animate(500, style({ height: '*' })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ height: 0, overflow: 'hidden' })),
      ]),
    ]),
  ],
  standalone: false,
})
export class LeadershiComponent implements OnInit {
  showManager: boolean = false;
  managerName = `JAF GLAZER / MANAGING DIRECTOR`;
  managerDescription = `As Managing Director of Conquest Advisors, Jaf Glazer oversees a full range of brokerage and advisory
  services,
  spanning acquisitions, sales, debt, and equity transactions in both residential and commercial markets. Over
  recent years, Glazer and his team have conducted upwards of $500 million in transactions. Whether working on a
  comprehensive development project or on a singular property, Glazer provides personal attention and custom,
  scalable strategies for each of his clients. A born entrepreneur, Jaf applies his sales and negotiating
  skills,
  designing and executing profit driven models to represent his client’s interests shrewdly and energetically.
  Born and raised in New York, Glazer knows the city intimately, having witnessed neighborhoods transform and
  repurpose from commercial to residential and back again. His precise knowledge of the city’s neighborhoods
  provides his clients opportunities to stay ahead of the curve and maximize value. Prior to Conquest, Glazer
  was
  instrumental in bringing cutting-edge biometric technologies to both security and consumer markets, earning
  him
  relevant experience in business development and entrepreneurship. Glazer received his B.S. in Finance from the
  University of Wisconsin’s Granger School of Business.`;

  showLuxury: boolean = false;
  luxuryName = `MARSHALL WADE LUXURY SALES / INVESTMENTS`;
  luxuryDescription = ` Marshall's interest in real estate first started in 2009 while working for Brooklyn based Aptsandlofts.
  Marshall was responsible for shadowing the Principal while managing a portion of the firms online rental
  platform. In 2011 as his interest in real estate continued to grow, Marshall accepted a position at Boston
  based Progressive Asset Management. Working within the Real Estate department, his focus was working with
  clients on deferred sales trusts and other real estate related tax-deferral strategies. Marshall joined
  Conquest Advisors in October 2015 as a Real Estate Investment Associate licensed as a Real Estate Salesperson
  by the New York Department of State. Relying on his fundamental understanding of the New York market, Marshall
  relentlessly helps the firm's clients achieve their real estate objectives.`;

  investments: boolean = false;
  investmentsName = `KATY HUI FOREIGN INVESTMENTS`;
  investmentsDescription = `With a fresh knowledge of New York City Real Estate, Katy’s goal is to find her clients that “perfect place”
  to live. New York is one of the most fast paced and diverse cities in America. Katy was born and raised in New
  York and has vast knowledge of rental and sales pricing throughout various neighborhoods. She has built great
  relationships with property managers through all five boroughs. Katy can help you find the perfect apartment,
  co-op, condo, or house. You need someone who understands the price ranges in different neighborhoods and
  someone who will listen to you and understand exactly how to get you the best value and maximize your budget.
  Katy can help your rental, purchase, or sales transaction run smoothly and save you from headache. Katy is
  easily accessible and can be reached anytime for consultations and property viewings.`;
  constructor() {}

  ngOnInit() {}
}
