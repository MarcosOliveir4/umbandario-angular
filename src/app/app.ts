import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './core/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
