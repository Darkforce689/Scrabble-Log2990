export const RACK_LETTER_COUNT = 7;
export const BOARD_DIMENSION = 15;
export const BOARD_MIN_POSITION = 0;
export const BOARD_MAX_POSITION = BOARD_DIMENSION - 1;
export const JOKER_CHAR = '*';
export const EMPTY_CHAR = ' ';
export const CHARACTER_V = 'v'.charCodeAt(0);
export const CHARACTER_H = 'h'.charCodeAt(0);
export const MIN_PLACE_LETTER_ARG_SIZE = 3;
export const MAX_PLACE_LETTER_ARG_SIZE = 4;
export const TIME_FOR_REVERT = 3000;
export const DEFAULT_TIME_PER_TURN = 60000;
export const MAX_NAME_LENGTH = 50;
export const MIN_NAME_LENGTH = 3;
export const MAX_CONSECUTIVE_PASS = 6;
export const START_OF_STRING = 0;
export const NOT_FOUND = -1;
export const RESET = 0;
export const ARRAY_BEGIN = 0;
export const FIRST_LETTER_INDEX = 0;
export const MAX_WORD_LENGTH = 15;
export const TIME_BEFORE_PICKING_ACTION = 3000;
export const TIME_BEFORE_PASS = 20000;
export const MIDDLE_OF_BOARD = 7;
export const DEBUG_ALTERNATIVE_WORDS_COUNT = 3;
export const BINGO_MESSAGE = 'Bingo! (50)';
export const BINGO_VALUE = 50;
export const END_LINE = '\\n';
export const TIME_BUFFER_BEFORE_ACTION = 200;
export const MIN_TIME_PER_TURN = 30000;
export const MAX_TIME_PER_TURN = 300000;
export const STEP_TIME_PER_TURN = 30000;
export const DEBUG_MESSAGE_ACTIVATED = 'affichages de débogage activés';
export const DEBUG_MESSAGE_DEACTIVATED = 'affichages de débogage désactivés';
export const RESERVE_NOT_ACCESSIBLE = 'la commande de reserve est uniquement disponible en mode de débogage';
export const HELP =
    '\\n #-Actions-# \\n #!placer <ligne><colonne>(h|v) <mot># \\n Place un mot sur le plateau de jeu.\\n' +
    '#!échanger <x><x><x># où x est une lettre du chevalet à échanger avec la réserve. \\n' +
    '#!passer# \\n Passe le tour. \\n #-Autres-# \\n #!debug# pour activer le mode débogage.\\n' +
    'Affiche les mots alternatifs que le joueur virtuel aurait pu placer.\\n' +
    '#!réserve# (!debug doit être activé)\\n Affiche la fréquence des lettres restantes de la réserve. \\n' +
    '#!aide# \\n Affiche la liste des commandes disponibles.';
export const ASCII_CODE = 65;
export const TIMER_STEP = 100;
export const BACKSPACE = 'Backspace';
export const SPACE = ' ';
export const ESCAPE = 'Escape';
export const ENTER = 'Enter';
export const ARROWRIGHT = 'ArrowRight';
export const ARROWLEFT = 'ArrowLeft';
export const SHIFT = 'Shift';
export const N_CORNERS = 4;
export const PRIVATE_OBJECTIVE_COUNT = 1;
export const PUBLIC_OBJECTIVE_COUNT = 2;
export const TOTAL_OBJECTIVE_COUNT = 8;
export const FOUR_CORNERS_POINTS = 30;
export const TRIPLE_BONUS_POINTS = 50;
export const PALINDROME_POINTS = 20;
export const TEN_WORDS_POINTS = 20;
export const NINE_LETTERS_WORD_POINTS = 40;
export const HALF_ALPHABET_POINTS = 30;
export const SAME_WORD_TWICE_POINTS = 30;
export const THREE_SAME_LETTERS_POINTS = 40;
export const N_LETTERS_IN_ALPHABET = 26;
export const HALF_ALPHABET_COMPLETION_PERCENTAGE = 0.5;
export const NINE_LETTERS_WORD_NUMBER_OF_LETTERS_REQUIRED = 9;
export const TEN_WORDS_NUMBER_OF_WORDS_TO_PLACE = 10;
export const THREE_SAME_LETTERS_NUMBER_OF_OCCURENCES = 3;
export const TRIPLE_BONUS_NUMBER_OF_BONUS = 3;
