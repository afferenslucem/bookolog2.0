import { Injectable, signal } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TitleNode } from '../components/title/title.component';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  public title = signal<TitleNode>({});
    public searchEnabled = signal(false);

  constructor(private router: Router) {
    this.router.events.pipe(
        filter(e => e instanceof ActivationEnd),
        filter((e: any) => e.snapshot.data['title']),
    ).subscribe((e: ActivationEnd) => {
      this.title.set(e.snapshot.data['title']);
    });

      this.router.events.pipe(
          filter(e => e instanceof ActivationEnd),
          filter((e: any) => e.snapshot.data['searchEnabled'] != null),
      ).subscribe((e: ActivationEnd) => {
          this.searchEnabled.set(e.snapshot.data['searchEnabled'] ?? false);
      });
  }
}
