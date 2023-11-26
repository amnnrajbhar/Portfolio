import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from "src/app/services/language/language.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AmanRajbhar-portfolio';
  
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService,
    private location: Location,
    private languageService: LanguageService
    ){
    }
  ngOnInit(): void{
    
    this.languageService.initLanguage()


    this.titleService.setTitle( "Aman Rajbhar | Software Developer" );

    this.metaService.addTags([
      {name: 'keywords', content: 'web, software, developer'},
      {name: 'description', content: 'With 1 years of experience developing systems, interfaces and technological solutions to make the web a better place. In my work I like to lead, propose and execute ideas, write and refactor clean code, reutilizable and scalable.'},
    ]);
    
    
    AOS.init(); 

  }
}
