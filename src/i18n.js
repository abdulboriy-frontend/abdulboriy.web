import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import uz from "./locales/uz/translation.json";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";

const resources = {
  uz: { translation: uz },
  en: { translation: en },
  ru: { translation: ru }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "uz",
    fallbackLng: "uz",
    supportedLngs: ["uz", "en", "ru"],

    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng"
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;