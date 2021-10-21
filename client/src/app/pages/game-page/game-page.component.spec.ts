// eslint-disable-next-line max-classes-per-file
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { ActionValidatorService } from '@app/GameLogic/actions/action-validator.service';
import { UIInputControllerService } from '@app/GameLogic/actions/ui-actions/ui-input-controller.service';
import { GameManagerService } from '@app/GameLogic/game/games/game-manager.service';
import { InputType, UIInput } from '@app/GameLogic/interface/ui-input';
import { of } from 'rxjs';
import { GamePageComponent } from './game-page.component';

describe('GamePageComponent', () => {
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;
    let gameManagerServiceSpy: jasmine.SpyObj<GameManagerService>;
    let cdRefSpy: jasmine.SpyObj<ChangeDetectorRef>;
    let uiInput: UIInput;
    class ActionValidatorServiceMock {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        sendAction() {}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    }
    class UIInputControllerServiceMock {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        receive() {}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        confirm() {}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        cancel() {}
    }
    class MatDialogMock {
        open() {
            return {
                afterClosed: () => of({}),
            };
        }
    }
    beforeEach(() => {
        cdRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GamePageComponent, SidebarComponent],
            imports: [RouterTestingModule, MatDialogModule, BrowserAnimationsModule],
            providers: [
                { provide: GameManagerService, useValue: gameManagerServiceSpy },
                { provide: ActionValidatorService, useClass: ActionValidatorServiceMock },
                { provide: ChangeDetectorRef, useValue: cdRefSpy },
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: UIInputControllerService, useClass: UIInputControllerServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GamePageComponent);
        uiInput = { type: InputType.LeftClick };
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('A keypress should call receive', () => {
        // eslint-disable-next-line dot-notation
        const inputControllerSpy = spyOn(component['inputController'], 'receive');
        const keyEvent = new KeyboardEvent('keydown', { code: 'KeyA' });
        component.keypressEvent(keyEvent);
        expect(inputControllerSpy).toBeTruthy();
    });

    it('An input should call receive', () => {
        // eslint-disable-next-line dot-notation
        const inputControllerSpy = spyOn(component['inputController'], 'receive');
        component.receiveInput(uiInput);
        expect(inputControllerSpy).toBeTruthy();
    });

    it('confirming to abandon should call method stopgame', () => {
        const gameManagerSpy = spyOn(component.matDialog, 'open');
        component.abandon();
        expect(gameManagerSpy).toHaveBeenCalled();
    });

    it('should call function sendAction if button "Passer" is pressed', () => {
        // eslint-disable-next-line dot-notation
        const actionValidatorSpy = spyOn(component['avs'], 'sendAction');
        component.pass();
        expect(actionValidatorSpy).toHaveBeenCalled();
    });

    it('should call confirm', () => {
        // eslint-disable-next-line dot-notation
        const inputControllerSpy = spyOn(component['inputController'], 'confirm');
        component.confirm();
        expect(inputControllerSpy).toBeTruthy();
    });

    it('should call cancel', () => {
        // eslint-disable-next-line dot-notation
        const inputControllerSpy = spyOn(component['inputController'], 'cancel');
        component.cancel();
        expect(inputControllerSpy).toBeTruthy();
    });
});
