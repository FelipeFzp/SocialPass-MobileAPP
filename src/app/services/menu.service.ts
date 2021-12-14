import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    public toggleMenuEmitter: EventEmitter<void> = new EventEmitter();

    public menuToggle(): void {
        this.toggleMenuEmitter.emit();
    }
}