import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const UserAtom = atom(undefined);
export const SpanNumAtom = atom(6);
export const WebThemeAtom = atom('light');
export const LanguageAtom = atom(Cookies.get("language") || "zh")