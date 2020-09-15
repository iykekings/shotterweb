import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() isValid: boolean;
  @Input() isInValid: boolean;
  @Input() src: string;
  @Input() errorMsg: string;
  constructor() { }

  ngOnInit(): void {
  }

}
