import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

import AppLogo from '../../components/AppLogo';
import DefaultPageLayout from '../../components/DefaultPageLayout/DefaultPageLayout';
import { useAppSelector } from '../../hooks/redux';
import { selectThemeMode } from '../../store/theme/theme.selectors';
import Features from './Features';
import StartBox from './StartBox';
import { boxType1Props, boxType2Props } from './styles';

const Home = () => {
  const themeMode = useAppSelector(selectThemeMode);
  return (
    <DefaultPageLayout>
      <Typography
        align="center"
        variant="h2"
        component="h1"
        sx={{
          color: themeMode === 'dark' ? 'secondary.main' : 'secondary.dark',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}>
        <AppLogo height="90px" color="lightBlue" />
      </Typography>

      <Features />
      <StartBox />

      <Box {...boxType1Props}>
        <Typography gutterBottom variant="h2">
          {"Qu'est-ce que SuiVie ?"}
        </Typography>
        <Typography paragraph>
          SuiVie est une application web mobile vous permettant de suivre vos habitudes et de vous
          donner des statistiques sur celles-ci.
        </Typography>
      </Box>
      <Box {...boxType2Props}>
        <Typography gutterBottom variant="h2">
          Une application web mobile, c&apos;est-à-dire ?
        </Typography>
        <Typography paragraph>
          Concrètement, SuiVie est un site web, conçu pour fonctionner de manière optimale sur
          mobile. Cela signifie que vous devez disposer d&apos;une connexion à Internet pour y
          accéder. Vous pouvez également y accéder avec un ordinateur mais l&apos;interface
          n&apos;est pas optimisée pour les grands écrans.
          <br />
          <br />
          Une fois le site chargé sur votre appareil, la connexion n&apos;est plus nécessaire.
          Toutes les données sont stockées sur votre appareil et ne sont jamais envoyées à un
          serveur central ou à un tiers.
        </Typography>
      </Box>

      <Box {...boxType1Props}>
        <Typography gutterBottom variant="h2">
          Qu&apos;est-ce que je pourrais bien avoir envie de suivre ?
        </Typography>
        <Typography>Voici quelques exemples de trackers qui pourraient vous inspirer :</Typography>
        <List>
          <ListItem>
            <ListItemText
              style={{ listStyleType: 'revert' }}
              primary={
                <>
                  <b>Arrosage des plantes</b>
                </>
              }
              secondary={'Vos amies végétales vous remercieront !'}
              secondaryTypographyProps={{ color: 'secondary' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <b>Prise de médicament</b>
                </>
              }
              secondary={"Plus d'oubli possible !"}
              secondaryTypographyProps={{ color: 'secondary.light' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <b>Musculation</b>
                </>
              }
              secondary={'10 pompes - 10 abdos - 10 squats tous les jours !'}
              secondaryTypographyProps={{ color: 'secondary' }}
            />
          </ListItem>
        </List>
        <Typography>SuiVie est très flexible et peut répondre à de nombreux besoins !</Typography>
        <br />
        <Typography align="center">On y va ? 😉</Typography>
      </Box>

      <StartBox mt={2} />
    </DefaultPageLayout>
  );
};

export default Home;
