import { Injectable } from '@angular/core';
import { concat } from 'rxjs';
import { Student, StudentdetailsComponent } from 'src/app/studentdetails/studentdetails.component';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  studentdata:Array<Student>=[]
id=1
constructor(private log:LogService)
{

}
pre='student'
  adddata(obj:Student)
  {

      obj.id=this.pre+this.id
      this.studentdata.push(obj)
      this.id++
      this.log.added(obj)

  }

  getdata()
  {
    return this.studentdata
  }

  delete(data:Student)
  {
    let variable = this.studentdata.findIndex(obj => obj.id==data.id)

    this.studentdata.splice(variable,1)
    this.log.deleted(data)
  }

  update(data:Student)
  {
    this.log.updated(data)
    let v = this.studentdata.indexOf(data)
    return this.studentdata[v]
  }
}
