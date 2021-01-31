import { Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IIssue } from 'src/app/interfaces/issue';
import { DialogComponent } from "../dialog/dialog.component";

import { IconService } from 'src/app/services/icon.service';
import { GitApiService } from "../../services/git-api.service";
import { PassDataService } from "../../services/pass-data.service";
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.css']
})
export class DisplayBoardComponent implements OnInit {
  public owner       : string  = "oblador";
  public repository  : string  = "hush";

  public displayedColumns: string[] = ['state', 'title'];
  public dataSource: MatTableDataSource<IIssue>;
  public dataIssue: Array<IIssue>;
  
  public openIssues     : number;
  public closeIssues    : number;
  public resultsLength  : number;
  public pageSlice      : Array<IIssue>;

  constructor(
    private _apiService   : GitApiService,
    private iconService   : IconService,
    private passData      : PassDataService,
    private dialog        : MatDialog
    ) { }

  ngOnInit(): void {
    //We must to register all our icons before use them
    this.initVars();
    this.iconService.registerIcons();
  }

  /**
   * Initialize the main variables to be used through the application.
   * @returns void
   */
  private initVars():void{
    try {
      this.dataIssue = [];
      this.openIssues = 0;
      this.closeIssues = 0;
      this.resultsLength = 0;
    } catch (error) {
      console.error("initVars ERROR. " + error);
    }
  }

  /**
   * Get the data from the UI, sends it to the API Service 
   * and retrieve the data to work with.
   * @param owner 
   * @param repository 
   * @returns void
   */
  public retrieveData(owner, repository) : void{
    try {
      this.initVars();
      this._apiService.setOwner(owner);
      this._apiService.setRepository(repository);
      this._apiService.getIssues().subscribe(
        data => {
          this.fillIssues(data);
        }
      )
    } catch (error) {
      console.error("retrieveData ERROR. " + error);
    }
  }

  /**
   * Fills the Issues into an array to store into the dataSource of the Table
   * and give usefull information to other variables that works with it.
   * @param data 
   * @returns void
   */
  private fillIssues(data): void{
    try {
      data.forEach(issue => {
        this.dataIssue.push(issue); 
      });
      this.dataSource = new MatTableDataSource<IIssue>(this.dataIssue);
      this.pageSlice =  this.dataIssue.slice(0,5)
      this.resultsLength = this.dataIssue.length;
      this.getNumberOfIssues(this.dataIssue);
    } catch (error) {
      console.error("fillIssues ERROR. " + error);
    } 
  }

  /**
   * Save the number of open and closed issues.
   * @param issuesArray 
   * @returns void
   */
  private getNumberOfIssues(issuesArray :  Array<IIssue>):void{
    try {
      issuesArray.forEach(element => {
        if(element.state == "open")
          this.openIssues = this.openIssues+1;
        else
          this.closeIssues = this.closeIssues+1;
      });
    } catch (error) {
      console.error("getNumberOfIssues ERROR. " + error);
    }
  }

  /**
   * Open a dialog and set into the body the given message to show to the user.
   * @param message 
   */
  private openDialog(message : string): void{
    try {
      this.passData.setBodyMessage(message);
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '70%',
        data: {body: this.passData.getBodyMessage()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialogo cerrado")
      });
    } catch (error) {
      console.error("openDialog ERROR. " + error);
    }
  }

  /**
   * Receive a fired event when the page was changed and do the logic to,
   * perform the pagination in the correct order on the table.
   * @param event 
   * @returns void
   */
  private OnPageChange(event: PageEvent):void{
    try {
      console.log(event);
      const startIndex = event.pageIndex * event.pageSize;
      var endIndex = startIndex + event.pageSize; 
      if(endIndex > this.resultsLength){
        endIndex = this.resultsLength;
      }
      this.pageSlice = this.dataIssue.slice(startIndex, endIndex);
    } catch (error) {
      console.error("OnPageChange ERROR. " + error);
    }
  }
}
