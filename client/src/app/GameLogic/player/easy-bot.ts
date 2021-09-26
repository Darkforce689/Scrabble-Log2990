import { Action } from '@app/GameLogic/actions/action';
import { ExchangeLetter } from '@app/GameLogic/actions/exchange-letter';
import { PassTurn } from '@app/GameLogic/actions/pass-turn';
import { PlaceLetter, PlacementSetting } from '@app/GameLogic/actions/place-letter';
import { LetterBag } from '@app/GameLogic/game/letter-bag';
import { ValidWord } from '@app/GameLogic/player/valid-word';
import { Bot } from './bot';

export class EasyBot extends Bot {
    static actionProbabibility = { play: 0.8, exchange: 0.1, pass: 0.1 };
    static placementProbability = { sixOrLess: 0.4, sevenToTwelve: 0.3, other: 0.3 };
    static botPointSetting = {
        sixOrLess: {
            prob: 0.4,
            value: 6,
        },
        sevenToTwelve: {
            prob: 0.3,
            value: 12,
        },
        other: {
            prob: 0.3,
            value: 18,
        },
    };

    setActive(): Action {
        this.startTimerAction();
        // TODO: Start computation for picking actions
        const action = this.randomActionPicker();
        this.chooseAction(action);
        console.log(action);
        return action;

    }
    // TODO change behavior of play
    randomActionPicker(): Action {
        const randomValue = Math.random();
        if (randomValue <= EasyBot.actionProbabibility.play) {
            let action = this.playAction();
            if (action === undefined) {
                action = this.exchangeAction();
            }
            return action;
        } else if (randomValue <= EasyBot.actionProbabibility.play + EasyBot.actionProbabibility.exchange) {
            return this.exchangeAction();
        } else {
            return this.passAction();
        }
    }

    randomWordPicker(): ValidWord {
        const randomValue = Math.random();
        // TODO assign validWordList with the calculated wordList from the algorithm
        const validWordList: ValidWord[] = this.validWordList;
        const wordP6: ValidWord[] = [];
        const wordP7to12: ValidWord[] = [];
        const wordP13To18: ValidWord[] = [];
        // Create subs arrays for valid word base on point
        validWordList.forEach((word) => {
            if (word.value <= EasyBot.botPointSetting.sixOrLess.value) {
                wordP6.push(word);
            } else if (word.value > EasyBot.botPointSetting.sixOrLess.value && word.value <= EasyBot.botPointSetting.sevenToTwelve.value) {
                wordP7to12.push(word);
            } else if (word.value > EasyBot.botPointSetting.sevenToTwelve.value && word.value <= EasyBot.botPointSetting.other.value) {
                wordP13To18.push(word);
            }
        });
        let wordPicked: ValidWord;
        if (randomValue <= EasyBot.botPointSetting.sixOrLess.prob) {
            wordPicked = this.wordPicker(wordP6);
            if (wordPicked !== undefined) {
                return wordPicked;
            }
        } else if (randomValue <= EasyBot.botPointSetting.sevenToTwelve.prob + EasyBot.botPointSetting.other.prob) {
            wordPicked = this.wordPicker(wordP7to12);
            if (wordPicked !== undefined) {
                return wordPicked;
            }
        } else {
            wordPicked = this.wordPicker(wordP13To18);
            if (wordPicked !== undefined) {
                return wordPicked;
            }
        }
        wordPicked = this.wordPicker(validWordList);
        return wordPicked;
    }

    playAction(): Action {
        this.bruteForceStart();
        const pickedWord: ValidWord = this.randomWordPicker();
        if (pickedWord !== undefined) {
            const placeSetting: PlacementSetting = {
                x: pickedWord.startingTileX,
                y: pickedWord.startingTileY,
                direction: pickedWord.isVertical ? 'V' : 'H',
            };
            const action = new PlaceLetter(this, pickedWord.word, placeSetting, this.pointCalculatorService, this.wordValidator);
            // this.chooseAction(action);
            return action;
        } else {
            const action = new PassTurn(this);
            // this.chooseAction(action);
            return action
        }
    }

    exchangeAction(): Action {
        const numberOfLettersToExchange = this.getRandomInt(LetterBag.playerLetterCount, 1);
        let lettersToExchangeIndex;
        const lettersToExchange = [];
        const indexArray = [];
        let randomInt;
        for (let i = 0; i < LetterBag.playerLetterCount; i++) {
            indexArray.push(i);
        }
        for (let i = 0; i < numberOfLettersToExchange; i++) {
            randomInt = this.getRandomInt(indexArray.length);
            lettersToExchangeIndex = indexArray[randomInt];
            indexArray.splice(randomInt, 1);
            lettersToExchange.push(this.letterRack[lettersToExchangeIndex]);
        }
        const action = new ExchangeLetter(this, lettersToExchange);
        // this.chooseAction(action);
        return action;
    }

    passAction(): Action {
        const action = new PassTurn(this)
        // this.chooseAction(action);
        return action;
    }

    private randomInInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private wordPicker(list: ValidWord[]): ValidWord {
        const randomPicker = this.randomInInterval(0, list.length);
        return list[randomPicker];
    }
}
