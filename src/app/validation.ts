import { FormControl } from "@angular/forms";

export function vdate(control:FormControl)
{
    let date = new Date();
    let value = new Date(control.value)
    if(date.getFullYear()-value.getFullYear()<18)
    {
        return {'invalid': true}
    }
    return null
}