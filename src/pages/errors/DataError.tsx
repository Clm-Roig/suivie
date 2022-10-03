import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { NavigateOptions, useLocation } from 'react-router-dom';

import DefaultPageLayout from '../../components/DefaultPageLayout/DefaultPageLayout';
import { NotATrackerResponse } from '../../utils/isATracker';

const DataError = () => {
  const location: NavigateOptions = useLocation();
  const errorData = location.state;
  return (
    <DefaultPageLayout>
      <Typography variant="h2" gutterBottom>
        Erreur au chargement des données 😔
      </Typography>
      <Typography variant="body1">
        {`L'application n'a pas réussi à interpréter les données stockées sur votre appareil. Vous pouvez envoyer le message ci-dessous à notre support pour essayer de résoudre votre problème.`}
      </Typography>
      <Divider sx={{ m: 2 }} />
      {errorData ? (
        <>
          <List dense>
            {(errorData as NotATrackerResponse).errors.map((e) => (
              <ListItem key={e.key}>
                <ListItemText>
                  <b>{e.key}</b> de type <b>{e.valueType}</b>
                  {` n'a pas le type attendu `}
                  <b>{e.expectedTypes.join(' | ')}</b>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography gutterBottom fontWeight={'bold'}>
            Donnée problématique :
          </Typography>
          <Typography>
            {JSON.stringify((errorData as NotATrackerResponse).problematicData, null, 4)}
          </Typography>
        </>
      ) : (
        <Typography>Erreur inconnue</Typography>
      )}
    </DefaultPageLayout>
  );
};

export default DataError;
