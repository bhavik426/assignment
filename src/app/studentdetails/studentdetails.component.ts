import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud/crud.service';
import { vdate } from '../validation';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent {

  studentform:FormGroup
  data: Array<Student>=[]
  title='Submit'
  constructor(private fb:FormBuilder,private ser:CrudService){

    this.studentform= this.fb.group({
  
      name:this.fb.group({
        first:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[^0-9]+")]],
        middle:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[^0-9]+")]],
        last:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[^0-9]+")]]
      }),
      email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),Validators.minLength(10)]],
      dob:['',[Validators.required,vdate]],
      age:[{value:'', disabled: true}],
      gender:['',[Validators.required]],
      address:this.fb.group({
        flat:['',[Validators.required,Validators.pattern("^[0-9]+$")]],
        building:['',[Validators.required,Validators.pattern("^[^0-9]+"),Validators.minLength(3)]],
        city:['',[Validators.required,Validators.pattern("^[^0-9]+"),Validators.minLength(3)]],
        state:['',[Validators.required,Validators.pattern("^[^0-9]+"),Validators.minLength(5)]],
        pin:['',[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{2}[0-9]{3}$")]]
      })
    })

    this.data = this.ser.getdata()
  }


  get name()
  {
    return this.studentform.get('name')
  }

  get first()
  {
    return this.name?.get('first')
  }

  get middle()
  {
    return this.name?.get('middle')
  }

  get last()
  {
    return this.name?.get('last')
  }

  get email()
  {
    return this.studentform.get('email')
  }

  get dob()
  {
    return this.studentform.get('dob')
  }

  get age()
  {
    return this.studentform.get('age')
  }

  get gender()
  {
    return this.studentform.get('gender')
  }

  get address()
  {
    return this.studentform.get('address')
  }

  get flat()
  {
    return this.address?.get('flat')
  }

  get building()
  {
    return this.address?.get('building')
  }

  get city()
  {
    return this.address?.get('city')
  }

  get state()
  {
    return this.address?.get('state')
  }

  get pin()
  {
    return this.address?.get('pin')
  }
  
  ID=''

  newdata()
  {
    let first = this.first?.value
    let middle = this.middle?.value
    let last = this.last?.value
    let email = this.email?.value
    let dob = this.dob?.value
    // let age = this.age?.value
    let gender = this.gender?.value
    let flat= this.flat?.value
    let building = this.building?.value
    let city = this.city?.value
    let pin = this.pin?.value
    let state = this.state?.value

    let name = {first: first, middle: middle, last: last}
    let address={flat: flat, building: building, city: city,pin:pin, state: state}
    let fulldata={id:this.ID,name:name,email:email,dob:dob,gender:gender,age:this.calculateage(),address:address}

    if(this.title=='Update')
    {
      let v = this.data.findIndex(d=>d.id==fulldata.id)
      this.data[v]=fulldata
      console.log(fulldata.id,this.data)
      this.title = 'Submit'
    }
    else
    {
      this.ser.adddata(fulldata)
    }
  }

  calculateage()
  {
    let date= new Date()
    let year= date.getFullYear()
    let date1=new Date(this.studentform.get('dob')?.value)
    let year1= date1.getFullYear()
    let total= year-year1
    this.studentform.get('age')?.patchValue(total)
    return total
  }


  del(info: Student) {
    this.ser.delete(info)
  }


  upd(info: Student) {
    this.title = 'Update'
    if(this.ser.update(info)==info)
    {
      this.studentform.patchValue(this.ser.update(info))
      this.ID=info.id
      console.log(this.ID,info.id)
    }
  }
  
}


export interface Student{
  id: string;
  name:Fullname;
  email:string;
  dob:string;
  age?:number;
  gender:string;
  address:Address;
}
export interface Address{
  flat:string;
  building:string;
  city:string;
  state:string;
  pin:string
}

export interface Fullname{
  first:string;
  middle:string;
  last:string;
}