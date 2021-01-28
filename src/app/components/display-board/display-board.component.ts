import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IIssue } from 'src/app/interfaces/issue';
import { TableSelection } from 'src/app/interfaces/tableSelection';
import { GitApiService } from "../../services/git-api.service";

@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.css']
})
export class DisplayBoardComponent implements OnInit {
  displayedColumns: string[] = ['state', 'title'];
  dataSource: MatTableDataSource<IIssue>;
  tableSelection: TableSelection;
  dataIssue: Array<IIssue> = [];


  owner       : string  = "oblador";
  repository  : string  = "hush";
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;
  
  constructor(private _apiService : GitApiService) { }

  ngOnInit(): void {
  }

  public retrieveData(owner, repository){
    this.dataIssue = [];
    this._apiService.setOwner(owner);
    this._apiService.setRepository(repository);
    this._apiService.getIssues().subscribe(
      data => {
        this.fillIssues(data);
      }
    )
  }

  fillIssues(data){
    data.forEach(issue => {
      this.dataIssue.push({ 
        state: issue.state, 
        title: issue.title, 
        body: issue.body 
      });
    });
    this.dataSource = new MatTableDataSource<IIssue>(this.dataIssue);
    this.resultsLength = this.dataIssue.length;
    this.isLoadingResults =false;
  }
}
