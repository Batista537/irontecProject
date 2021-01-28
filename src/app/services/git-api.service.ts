import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'; 
import { Observable, of } from 'rxjs';

const API : string = "https://api.github.com/"

// Set the http options
const httpJsonOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

@Injectable({
  providedIn: 'root'
})
export class GitApiService {
  issuesResponse : JSON;
  private owner       : string = ""
  private repository  : string = ""

  constructor(private http: HttpClient) {  }

  /**
   * Set arepository owner
   * @param owner 
   */
    public setOwner(owner : string): void{
     this.owner = owner.trim();
   }

   /**
    * Set a repository name
    * @param repository 
    */
   public setRepository(repository : string): void {
    this.repository = repository.trim();
   }

  /**
   * Function to extract the data when the server return something
   *
   * @param res
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /**
   * Get issues from the input of the owner of a given repository
   * @returns Observable
   */
   getIssues(): Observable<any>{
     return this.http.get(`${API}repos/${this.owner}/${this.repository}/issues`, httpJsonOptions).pipe(
       map(this.extractData),catchError(this.handleError)
     )
   }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T){
    return (error : any): Observable<T> =>{
      
      // TODO: send the error to remote loggin infrastructure
      console.error(error);// log to console instead

      // Let the app keep running by returnin an empty result.
      return of(result as T);
    }
  }

   
}
