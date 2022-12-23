import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private titleSubject = new BehaviorSubject<string>('');
  public titleAction$ = this.titleSubject.asObservable();

  constructor() { }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }
}
