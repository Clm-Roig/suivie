import { useAppSelector } from '../app/hooks';
import AppLogoImg from '../assets/images/app-logo.png';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';

// Filter generated using https://codepen.io/sosuke/pen/Pjoqqp
const filterToLightBlueColor =
  'invert(62%) sepia(49%) saturate(295%) hue-rotate(177deg) brightness(84%) contrast(84%)';

const AppLogo = () => {
  const themeMode = useAppSelector(selectThemeMode);
  return (
    <img
      style={{
        filter: themeMode === ThemeMode.DARK ? filterToLightBlueColor : 'invert(1)'
      }}
      height="40px"
      src={AppLogoImg}
      alt="App logo"
    />
  );
};

export default AppLogo;
