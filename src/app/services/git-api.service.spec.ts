import { TestBed } from '@angular/core/testing';

import { GitApiService } from './git-api.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { IIssue } from '../interfaces/issue';
describe('GitApiService', () => {
  var gitApiService: GitApiService; //Instance of the service to call it
  var httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //We must to set inside the configuration object
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GitApiService
      ]
    });
    gitApiService = TestBed.inject(GitApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should insert into owner the given string', () => {
    const OWNER : string = "Batista537";
    gitApiService.setOwner(OWNER);
    expect(gitApiService.getOwner()).toEqual(OWNER);
  });

  it('Should insert into repository the given string', () => {
    const REPOSITORY : string = "irontecProject";
    gitApiService.setOwner(REPOSITORY);
    expect(gitApiService.getOwner()).toEqual(REPOSITORY);
  });

  it('Should retrieve an Observable from the API via GET', () => {
    const MOCK_ISSUES: IIssue[] = [
      {
        url: "https://api.github.com/repos/oblador/hush/issues/49",
        repository_url: "https://api.github.com/repos/oblador/hush",
        labels_url: "https://api.github.com/repos/oblador/hush/issues/49/labels{/name}",
        comments_url: "https://api.github.com/repos/oblador/hush/issues/49/comments",
        events_url: "https://api.github.com/repos/oblador/hush/issues/49/events",
        html_url: "https://github.com/oblador/hush/issues/49",
        id: 797382962,
        node_id: "MDU6SXNzdWU3OTczODI5NjI=",
        number: 49,
        title: "The extension breaks wykop.pl",
        user: {
          login: "quiris11",
          id: 1252060,
          node_id: "MDQ6VXNlcjEyNTIwNjA=",
          avatar_url: "https://avatars.githubusercontent.com/u/1252060?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/quiris11",
          html_url: "https://github.com/quiris11",
          followers_url: "https://api.github.com/users/quiris11/followers",
          following_url: "https://api.github.com/users/quiris11/following{/other_user}",
          gists_url: "https://api.github.com/users/quiris11/gists{/gist_id}",
          starred_url: "https://api.github.com/users/quiris11/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/quiris11/subscriptions",
          organizations_url: "https://api.github.com/users/quiris11/orgs",
          repos_url: "https://api.github.com/users/quiris11/repos",
          events_url: "https://api.github.com/users/quiris11/events{/privacy}",
          received_events_url: "https://api.github.com/users/quiris11/received_events",
          type: "User",
          site_admin: false
        },
        labels: [
    
        ],
        state: "open",
        locked: false,
        assignee: null,
        assignees: [
    
        ],
        milestone: null,
        comments: 0,
        created_at: "2021-01-30T10:11:51Z",
        updated_at: "2021-01-30T10:11:51Z",
        closed_at: null,
        author_association: "NONE",
        active_lock_reason: null,
        body: "The extension blocks the appearance of the cookie overlay window in such a way that it blocks the entire http://wykop.pl site. You cannot click anything on this page. ",
        performed_via_github_app: null
      },
      {
        url: "https://api.github.com/repos/oblador/hush/issues/48",
        repository_url: "https://api.github.com/repos/oblador/hush",
        labels_url: "https://api.github.com/repos/oblador/hush/issues/48/labels{/name}",
        comments_url: "https://api.github.com/repos/oblador/hush/issues/48/comments",
        events_url: "https://api.github.com/repos/oblador/hush/issues/48/events",
        html_url: "https://github.com/oblador/hush/issues/48",
        id: 797374243,
        node_id: "MDU6SXNzdWU3OTczNzQyNDM=",
        number: 48,
        title: "other browser ?",
        user: {
          login: "thorin31",
          id: 50087926,
          node_id: "MDQ6VXNlcjUwMDg3OTI2",
          avatar_url: "https://avatars.githubusercontent.com/u/50087926?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/thorin31",
          html_url: "https://github.com/thorin31",
          followers_url: "https://api.github.com/users/thorin31/followers",
          following_url: "https://api.github.com/users/thorin31/following{/other_user}",
          gists_url: "https://api.github.com/users/thorin31/gists{/gist_id}",
          starred_url: "https://api.github.com/users/thorin31/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/thorin31/subscriptions",
          organizations_url: "https://api.github.com/users/thorin31/orgs",
          repos_url: "https://api.github.com/users/thorin31/repos",
          events_url: "https://api.github.com/users/thorin31/events{/privacy}",
          received_events_url: "https://api.github.com/users/thorin31/received_events",
          type: "User",
          site_admin: false
        },
        labels: [
    
        ],
        state: "open",
        locked: false,
        assignee: null,
        assignees: [
    
        ],
        milestone: null,
        comments: 0,
        created_at: "2021-01-30T09:19:33Z",
        updated_at: "2021-01-30T09:19:33Z",
        closed_at: null,
        author_association: "NONE",
        active_lock_reason: null,
        body: "It'w be very interesting to port this amazing module on other browser like Firefox ;)",
        performed_via_github_app: null
      },
    ]

    gitApiService.getIssues().subscribe((issue) => {
      expect(MOCK_ISSUES).toBe(issue, 'should check mock data')
    });
    const OWNER       : string = "oblador"
    const REPOSITORY  : string = "hush"
    const request = httpTestingController.expectOne({method: 'GET'});
    
    expect(request.cancelled).toBeFalsy();
    expect(request.request.responseType).toEqual('json');
    
    request.flush(MOCK_ISSUES);
  })
});
