import { TestBed } from '@angular/core/testing';
import { Action } from '@app/game-logic/actions/action';
import { HALF_ALPHABET_COMPLETION_PERCENTAGE, N_LETTERS_IN_ALPHABET } from '@app/game-logic/constants';
import { Letter } from '@app/game-logic/game/board/letter.interface';
import { ObjectiveNotifierService } from '@app/game-logic/game/objectives/objective-notifier/objective-notifier.service';
import { HalfAlphabet } from '@app/game-logic/game/objectives/objectives/half-alphabet/half-alphabet';
import { ObjectiveUpdateParams } from '@app/game-logic/game/objectives/objectives/objective-update-params.interface';

describe('HalfAlphabet', () => {
    let objective: HalfAlphabet;
    let action: Action;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        objective = new HalfAlphabet(TestBed.inject(ObjectiveNotifierService));
        action = jasmine.createSpyObj(Action, ['execute']);
    });

    it('should be created', () => {
        expect(objective).toBeTruthy();
    });

    it('should update progression properly', () => {
        const lettersToPlace = [
            { char: 'A', value: 0 },
            { char: 'A', value: 0 },
            { char: 'B', value: 0 },
            { char: 'C', value: 0 },
            { char: 'D', value: 0 },
            { char: '*', value: 0 },
            { char: 'E', value: 0 },
        ] as Letter[];
        const params: ObjectiveUpdateParams = {
            previousGrid: [],
            currentGrid: [],
            lettersToPlace,
            formedWords: [],
        };
        objective.updateProgression(action, params);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const expectedProgression = 5 / N_LETTERS_IN_ALPHABET / HALF_ALPHABET_COMPLETION_PERCENTAGE;
        expect(objective.progression).toBe(expectedProgression);

        const lettersToPlace2 = [
            { char: 'F', value: 0 },
            { char: 'G', value: 0 },
            { char: 'H', value: 0 },
            { char: 'I', value: 0 },
            { char: 'J', value: 0 },
            { char: 'K', value: 0 },
            { char: 'L', value: 0 },
            { char: 'M', value: 0 },
        ] as Letter[];
        const params2: ObjectiveUpdateParams = {
            previousGrid: [],
            currentGrid: [],
            lettersToPlace: lettersToPlace2,
            formedWords: [],
        };
        objective.updateProgression(action, params2);
        expect(objective.progression).toBe(1);
    });
});
