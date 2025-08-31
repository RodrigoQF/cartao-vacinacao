import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './service/loader.service';
import { LoaderComponent } from './shared/components/loader-component/loader-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('cartao-vacinacao');

  loader: boolean = true;
  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    this.loaderService.loaderState$.subscribe((state) =>{
      this.loader = state;
      this.cdr.detectChanges();
    })
  }
}
