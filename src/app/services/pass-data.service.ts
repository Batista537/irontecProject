import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private body : string = "";

  constructor() { }

ngOnInit(): void {
  this.body=""
}

  public setBodyMessage(message : string):void{
    try{
      this.body = message;
    }catch(error){
      console.error("setBodyMessage ERROR. " + error);
    }
  }

  public getBodyMessage():string{
    return this.body;
  }
}
