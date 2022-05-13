import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ma-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
  public formValues = {
    title: '',
    description: '',
    status: '',
    priority: '',
    deadline: '',
  };

  constructor() {}

  ngOnInit(): void {}

  filterPastDays = (d: Date | null): boolean => {
    const date = d || new Date();
    const currentDate = new Date();
    const comparison =
      date.getFullYear() >= currentDate.getFullYear() &&
      date.getMonth() >= currentDate.getMonth() &&
      date.getDate() >= currentDate.getDate();
    return comparison;
  };
}
