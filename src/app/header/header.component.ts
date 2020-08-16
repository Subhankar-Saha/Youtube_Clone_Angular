import { Component, OnInit, ChangeDetectorRef,AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MediaObserver, MediaChange} from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit,OnDestroy {

  private mediasub : Subscription;
  deviceXs:boolean;
  deviceSm:boolean;
  deviceLarge:boolean;
  deviceLg : boolean;
  deviceMd : boolean;
  visit:boolean;
  ismenuopen = true;
  isover = false;
  content_margin = 85;
  mc = "";

  constructor(
    private cdref : ChangeDetectorRef,
    private mediaobserver: MediaObserver, 
  ) { }

  ngOnInit(): void {
    this.mediasub = this.mediaobserver.media$.subscribe(
      (change:MediaChange)=>{
        this.deviceXs = change.mqAlias ==='xs' ? true :false;
        this.deviceSm = change.mqAlias ==='sm' ? true :false;
        this.deviceLg = change.mqAlias ==='lg' ? true :false;
        this.deviceMd = change.mqAlias ==='md' ? true :false;
        this.mc = change.mqAlias;
        if (this.deviceLg === false ){
          this.ismenuopen = false;
        }
        else{
          this.ismenuopen = true;
        }

        if (this.deviceLg === false){
          this.isover= true;
        }
        else{
          this.isover= false;
        }
        console.log(change.mqAlias);  // like md , sm, xs
      }
    )

  }
  ngAfterViewInit(){

  }
  ngOnDestroy(){
    if (this.mediasub){
      this.mediasub.unsubscribe();
    }
  }
  toolbar_toggle(){
    console.log("toolbar toogle ",this.ismenuopen);
    this.ismenuopen = !this.ismenuopen;
    if(!this.ismenuopen){
      this.content_margin=5;
    }
    else{
      this.content_margin=1;
    }
    console.log(this.content_margin);
     
  }

  search()
  {

  }


}
