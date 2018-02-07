import { Injectable } from '@angular/core';
import { Component, ChangeDetectorRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';


declare var FB;
declare var window;
declare var userID;
declare const myPageName = "Newtowordpress";

@Injectable()
export class FacebookInitService {

  flag: Boolean = false;
  app_id: any;
  page_id: any;
  access_Tokenn: string;
  configUrl: string;
  Url = "https://graph.facebook.com/v2.12/me?fields=address%2Cid%2Clikes.limit(1000)&access_token=";
  constructor(private http: HttpClient) { }
  isUserLiked(appId?: string, pageId?: string, callback?: any) {
    this.app_id = appId;
    this.page_id = pageId;
    return this.initFacebook();
  }
  initFacebook() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: this.app_id,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.12',
        oauth: true
      });

      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          // FB.login(
          // function(response) {
          // console.log(response);
          // },
          // {
          // scope: 'user_likes',
          // auth_type: 'rerequest'
          // }
          // );   
         
          console.log('beforeshoconfig', this);
          this.showConfig(response.authResponse.accessToken);
        }
        else {
          FB.login(function (response) {
            if (response.status === 'connected') {
              console.log('Logged in.');
            } else {
              console.log("you are not logged in");
            }
          });
        }
      }, {
        scope: 'user_likes',
          return_scopes: true
        })
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // this.liked=true;      
  }
  getConfig() {
    console.log("logcheck", "i am in get config");
    return this.http.get(this.configUrl)
  }

  showConfig(access_Token) {
    let self: any = this;
    this.configUrl = this.Url + access_Token;
    this.getConfig()
      .subscribe(response => {
        console.log(response);
        let jsonResponse = JSON.stringify(response);
        let objResponse = JSON.parse(jsonResponse);
        let i = objResponse.likes.data;
        let j = 0;
        while (j < 100) {
          if (i[j].id === self.page_id) {
            console.log("Flag before," + (self.flag));
            self.checkFlag();
            alert('User Already Liked Your Page!');
            break;
          }
          j++;
        }
        if (j === i.length && !this.flag) {
          console.log("Url Found");
          this.showNext100(objResponse.likes.paging.next);
        }
      });
  }
  checkFlag() {
    this.flag = true;
    // this._changeDetectorRef.detectChanges();
    console.log("Flag after," + (this.flag));
  }
  showNext100(uri) {
    let self: any = this;
    this.configUrl = uri;
    this.getConfig()
      .subscribe((response) => {

        console.log(response);
        let jsonResponse = JSON.stringify(response);
        let objResponse = JSON.parse(jsonResponse);
        let i = objResponse.data;
        //console.log(`next Url is:${objResponse.paging.next}`)
        let j = 0;

        while (j < i.length) {
          if (i[j].name === self.myPageName) {
            console.log("Flag before," + (self.flag));
            self.checkFlag();
            break;
          }
          j++;
        }
        if (j === i.length && !this.flag && i.length !== 0) {
          console.log("Url Found");
          this.showNext100(objResponse.paging.next);
        }
      });
  }


}
