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
  public dataIssue: Array<IIssue> = [];
  
  public openIssues     : number = 0;
  public closeIssues    : number = 0;
  public resultsLength  : number = 0;
  public pageSlice      : Array<IIssue>;

  constructor(
    private _apiService   : GitApiService,
    private iconService   : IconService,
    private passData      : PassDataService,
    private dialog        : MatDialog
    ) { }

  ngOnInit(): void {
    //We must to register all our icons before use them
    this.iconService.registerIcons();
  }

  private initVars(){
    this.dataIssue = [];
    this.openIssues = 0;
    this.closeIssues = 0;
    this.resultsLength = 0;
  }

  public retrieveData(owner, repository) : void{
    this.initVars();

    this._apiService.setOwner(owner);
    this._apiService.setRepository(repository);
    this._apiService.getIssues().subscribe(
      data => {
        this.fillIssues(data);
      }
    )
  }

  private fillIssues(data){
    data.forEach(issue => {
      console.log(issue);
      this.dataIssue.push(issue); 
    });
    this.dataSource = new MatTableDataSource<IIssue>(this.dataIssue);
    this.pageSlice =  this.dataIssue.slice(0,5)
    this.resultsLength = this.dataIssue.length;
    this.getNumberofIssues(this.dataIssue);
  }

  private getNumberofIssues(issuesArray){
    issuesArray.forEach(element => {
      if(element.state == "open")
        this.openIssues = this.openIssues+1;
      else
        this.closeIssues = this.closeIssues+1;
    });
  }

  private openDialog(message){
    this.passData.setBodyMessage(message);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '70%',
      data: {body: this.passData.getBodyMessage()}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was ckised")
    });
  }

  private OnPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    var endIndex = startIndex + event.pageSize; 
    if(endIndex > this.resultsLength){
      endIndex = this.resultsLength;
    }
    this.pageSlice = this.dataIssue.slice(startIndex, endIndex);
  }
}
