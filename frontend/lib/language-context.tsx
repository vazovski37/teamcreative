'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n' // Import initialization

type Language = 'en' | 'ge'

interface LanguageContextType {
    language: Language
    changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('ge')

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language
        if (saved) {
            setLanguage(saved)
            i18n.changeLanguage(saved)
        } else {
            // Default is ge, ensure i18n matches
            i18n.changeLanguage('ge')
        }
    }, [])

    const changeLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
        i18n.changeLanguage(lang)
    }

    return (
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ language, changeLanguage }}>
                {children}
            </LanguageContext.Provider>
        </I18nextProvider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
    return context
}

// Re-export useTranslation from react-i18next for convenience, 
// ensuring components import from here or directly from package. 
// Ideally components should now import from 'react-i18next', 
// but keeping this named export helps backward compatibility if used elsewhere.
// Re-export useTranslation for convenience
export { useTranslation, I18nextProvider } from 'react-i18next'
