import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";


@Component({
  selector: 'app-codebar',
  template:  `
  <h2>Try using your keyboard.</h2>
  <h1>Last pressed: {{lastPressed}} </h1>
  <h1>Word: {{word}} </h1>

`,
  styleUrls: ['./codebar.component.css']
})
export class CodebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  lastPressed = 'nothing';
  word = '';
  @HostListener('window:keydown', ['$event.key'])
  next(key: string) {
    this.lastPressed = key;
    this.word =this.word + key;
  }
}

