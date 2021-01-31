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

  /**
   * Store a message to display on the UI.
   * @param message 
   */
  public setBodyMessage(message : string):void{
    try{
      this.body = message;
    }catch(error){
      console.error("setBodyMessage ERROR. " + error);
    }
  }

  /**
   * Get a message that was stored before.
   * @returns string
   */
  public getBodyMessage():string{
    return this.body;
  }
}
