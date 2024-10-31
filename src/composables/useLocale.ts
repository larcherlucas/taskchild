// gestion de la langue de l'application, changeLocale pour changer la langue, initLocale pour initialiser la langue sauvegardée dans le local storage et t pour traduire les textes
import { useI18n } from 'vue-i18n';

export function useLocale() {
  const { locale, t } = useI18n();

  const changeLocale = (newLocale: string) => {
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
  };

  const initLocale = () => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      locale.value = savedLocale;
    }
  };

  return {
    changeLocale,
    initLocale,
    t,
  };
}
