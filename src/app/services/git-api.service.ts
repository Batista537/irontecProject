import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'; 
import { Observable, of } from 'rxjs';
import { IIssue } from '../interfaces/issue';


@Injectable({
  providedIn: 'root'
})
export class GitApiService {
  public API : string = "https://api.github.com/"
  private owner       : string = ""
  private repository  : string = ""

  constructor(private http: HttpClient) {  }

  /**
   * Set arepository owner.
   * @param owner 
   */
    public setOwner(owner : string): void{
     this.owner = owner.trim();
   }

   /**
    * GET repository owner name.
    */
   public getOwner(): string{
     return this.owner;
   }

   /**
    * Set a repository name.
    * @param repository 
    */
   public setRepository(repository : string): void {
    this.repository = repository.trim();
   }

   /**
    * Get Repository name.
    */
   public getRepository(): string{
    return this.repository;
   }

  /**
   * Get issues from the input of the owner of a given repository
   * @returns Observable
   */
   public getIssues(): Observable<IIssue[]>{
     return this.http.get<IIssue[]>(`${this.API}repos/${this.owner}/${this.repository}/issues`).pipe(
       catchError(this.handleError)
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
