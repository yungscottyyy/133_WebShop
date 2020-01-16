import { Component, OnInit } from '@angular/core';
import { product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  listOfProducts: { name: string, path: string}[] = [
    { "name": "Converse", "path": "shoe-1" },
    { "name": "Nike", "path": "shoe-2" },
    { "name": "Nike", "path": "shoe-3" },
    { "name": "Nike", "path": "shoe-4" },
    { "name": "Vans", "path": "shoe-5" },
    { "name": "Vans", "path": "shoe-6" },
    { "name": "Dr. Martens", "path": "shoe-7" },
    { "name": "Dr. Martens", "path": "shoe-8" },
  ];

  ngOnInit() {

  }
}

