import { TestBed } from '@angular/core/testing';
import { CommandParserService } from '@app/GameLogic/commands/command-parser/command-parser.service';
import { Message, MessageType } from '@app/GameLogic/messages/message.interface';

describe('CommandParser', () => {
    let service: CommandParserService;
    let message: Message;
    const syntaxError1 = 'mot ou emplacement manquant';
    const syntaxError2 = 'erreur de syntax: ligne hors champ';
    const syntaxError3 = 'erreur de syntax: mot invalide';
    const syntaxError4 = 'erreur de syntax: colonne hors champ';
    const syntaxError5 = 'erreur de syntax: direction invalide';
    const syntaxError6 = 'erreur de syntax: les paramètres sont invalide';
    const syntaxError7 = 'erreur de syntax: colonne invalide';
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CommandParserService);
        message = { content: '!placer a1v allo', from: 'player', type: MessageType.Player1 };
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    /// TODO: À revoir et bonifier
    it('should be falalala', () => {
        expect(service.parsedCommand$).toBeTruthy();
    });

    /// //////////////// CREATE COMMAND /////////////////////////
    it('should return false as it is not a command', () => {
        message.content = 'Hier fut une bien belle journée';
        expect(service.parse(message.content)).toBe(false);
    });
    /// ////////////////     Parse      /////////////////////////
    // passer une fausse commande
    it('should throw !manger est une commande invalide', () => {
        message.content = '!manger duGateau';
        expect(() => {
            service.parse(message.content);
        }).toThrowError('!manger est une commande invalide');
    });

    // passer une vrai commande
    it('should be return true', () => {
        expect(service.parse(message.content)).toBeTruthy();
    });
    it('should be return true', () => {
        message.content = '!debug';
        expect(service.parse(message.content)).toBe(true);
    });
    // passer une commande en majuscule
    it('should throw !PLACER est une commande invalide', () => {
        message.content = '!PLACER a1v bob';
        expect(() => {
            service.parse(message.content);
        }).toThrowError('!PLACER est une commande invalide');
    });
    // passer un espace pour placer lettre
    it('should throw ' + syntaxError1, () => {
        message.content = '!placer a1v  ';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError1);
    });

    it('should throw ' + syntaxError3, () => {
        expect(() => {
            service.placeLetterFormatter(['a1v', ' ']);
        }).toThrowError(syntaxError3);
    });

    // passer plusieurs espace pour placer lettre//////////////////////////////////
    it('should throw ' + syntaxError3, () => {
        expect(() => {
            service.placeLetterFormatter(['a1v', '   ']);
        }).toThrowError(syntaxError3);
    });

    it('should throw ' + syntaxError1, () => {
        message.content = '!placer a1v    ';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError1);
    });
    // mettre 1 lettre
    it('should throw ' + syntaxError3, () => {
        message.content = '!placer a1v a';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError3);
    });
    // mettre 16 lettre
    it('should throw ' + syntaxError3, () => {
        message.content = '!placer a1v abcdefghijklmnop';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError3);
    });
    // mettre coordonné negative
    it('should throw ' + syntaxError7, () => {
        message.content = '!placer a-1v abc';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError7);
    });
    // mettre coordonné depassant 15
    it('should throw ' + syntaxError4, () => {
        message.content = '!placer a16v abc';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError4);
    });
    // pas de lettres
    it('should throw ' + syntaxError1, () => {
        message.content = '!placer a1V';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError1);
    });
    // coordonné en majuscule
    it('should throw ' + syntaxError2, () => {
        message.content = '!placer A1v allo';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError2);
    });

    it('should throw ' + syntaxError5, () => {
        message.content = '!placer a1V allo';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError5);
    });

    it('should throw ' + syntaxError6, () => {
        message.content = '!placer a12vv allo';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError6);
    });

    it('should throw ' + syntaxError6, () => {
        message.content = '!placer a1 allo';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError6);
    });

    it('should throw ' + syntaxError7, () => {
        message.content = '!placer abh allo';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError7);
    });

    it('should throw ' + syntaxError7, () => {
        message.content = '!placer a1bh allo';
        expect(() => {
            service.parse(message.content);
        }).toThrowError(syntaxError7);
    });
    // bonne coordonné
    it('should be return true', () => {
        message.content = '!placer a1v allo';
        expect(service.parse(message.content)).toBeTruthy();
    });
});
