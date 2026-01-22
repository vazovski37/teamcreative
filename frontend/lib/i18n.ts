import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en/translation.json';
import ge from '@/locales/ge/translation.json';

const resources = {
    en: {
        translation: en,
    },
    ge: {
        translation: ge,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ge', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false, // Prevents loading issues with SSR
        }
    });

export default i18n;
