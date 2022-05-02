import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  developers = [
    {
      gitHubLink: 'https://github.com/Ilya758',
      name: 'Ilya758',
      icon: 'engineering',
    },
    {
      gitHubLink: 'https://github.com/shadowinhaze',
      name: 'John Pol',
      icon: 'psychology',
    },
    {
      gitHubLink: 'https://github.com/VladimirParmon',
      name: 'Vladimir Parmon',
      icon: 'hiking',
    },
  ];
}
