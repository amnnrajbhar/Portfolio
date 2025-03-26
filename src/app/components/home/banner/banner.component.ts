import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('bannerTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BannerComponent implements OnInit, AfterViewInit {
  @ViewChild('typedText') typedText: ElementRef;

  private currentText = '';
  private fullText = ['Aman Rajbhar', 'अमन राजभर'];
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingSpeed = 150; // Speed in milliseconds

  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.startTyping();
  }

  private startTyping(): void {
    const currentFullText = this.fullText[this.currentTextIndex];

    if (this.isDeleting) {
      this.currentText = currentFullText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.currentText = currentFullText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    if (this.typedText) {
      this.typedText.nativeElement.textContent = this.currentText;
    }

    let typeSpeed = this.typingSpeed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.currentText === currentFullText) {
      typeSpeed = 2000; // Pause at the end
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.fullText.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.startTyping(), typeSpeed);
  }
}
