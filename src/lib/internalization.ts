import { register, init, getLocaleFromNavigator} from 'svelte-i18n';
  

export const i18n = () => {
  // Lokalizace
  register('en', () => import('../languages/en.json'));
  register('en-US', () => import('../languages/en-US.json'));
  // Initialize localization
  init({
    initialLocale: getLocaleFromNavigator(),
    fallbackLocale: 'en'
  });
  
}