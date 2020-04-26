export const SET_TEXT = 'SET_TEXT';

export function setReadText(readText: string) {
    return {
        type: SET_TEXT,
        readText,
    };
}