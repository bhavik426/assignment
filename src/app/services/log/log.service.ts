import { Injectable } from '@angular/core';
import { Student } from 'src/app/studentdetails/studentdetails.component';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  added(data:Student)
  {
    console.log(`New Data Added: ${JSON.stringify(data.id)}`)
  }

  deleted(data:Student)
  {
    console.log(`Data Deleted: ${JSON.stringify(data.id)}`)
  }

  updated(data:Student)
  {
    console.log(`Data Updated: ${JSON.stringify(data.id)}`)
  }
}
