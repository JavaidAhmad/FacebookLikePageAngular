import { Component,ChangeDetectorRef } from '@angular/core';
import { OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import {FacebookInitService} from './facebook-init.service'

declare var FB;
declare var window;
declare var userID;
// declare const myPageName= "Ne0wtowordpress";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  appId:string ='893613067486252'
  pageId:string = '1742888795932825'
  flag:Boolean=false;
  access_Tokenn:string;
  configUrl:string;
  myPageName:string= "Newtowordpress";
  Url = "https://graph.facebook.com/v2.12/me?fields=address%2Cid%2Clikes.limit(1000)&access_token=";
  constructor(private facebookService:FacebookInitService,private http:HttpClient,private _changeDetectorRef:ChangeDetectorRef){}
  ngOnInit(){
    this.facebookService.isUserLiked(this.appId,this.pageId);
  }
  // onSubmit(){
  //   this.facebookService.isUserLiked(this.appId,this.pageId);
  // }
 
 

}
