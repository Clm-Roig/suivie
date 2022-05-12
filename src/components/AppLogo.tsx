import { FC } from 'react';

import { useAppSelector } from '../app/hooks';
import AppLogoImg from '../assets/images/app-logo.png';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';

// Filter generated using https://codepen.io/sosuke/pen/Pjoqqp
const filterToLightBlueColor =
  'invert(62%) sepia(49%) saturate(295%) hue-rotate(177deg) brightness(84%) contrast(84%)';

interface Props {
  color?: 'themeDefault' | 'lightBlue' | 'black' | 'white';
  height?: string;
  width?: string;
}
const AppLogo: FC<Props> = ({ height, width, color = 'themeDefault' }) => {
  const themeMode = useAppSelector(selectThemeMode);
  let filter = '';
  switch (color) {
    case 'black':
      filter = '';
      break;
    case 'white':
      filter = 'invert(1)';
      break;
    case 'lightBlue':
      filter = filterToLightBlueColor;
      break;
    default:
      filter = themeMode === ThemeMode.DARK ? filterToLightBlueColor : 'invert(1)';
  }

  return (
    <img
      style={{
        filter: filter
      }}
      height={height}
      width={width}
      src={AppLogoImg}
      alt="App logo"
    />
  );
};

export default AppLogo;
