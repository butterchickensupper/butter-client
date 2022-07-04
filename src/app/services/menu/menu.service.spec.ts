import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';
import { TestBed } from '@angular/core/testing';

describe('MenuService', () => {
    let service: MenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj('HttpClient', ['']),
                },
            ],
        });
        service = TestBed.inject(MenuService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
