import { Typography } from '@mui/material';
import { FC } from 'react';

import Completion from '../../../models/Completion';
import CompletionChipList from '../../CompletionChipList/CompletionChipList';

interface Props {
  completions: Completion[];
}

const TotalText: FC<Props> = ({ completions }) => {
  return (
    <>
      {completions.length > 0 ? (
        <>
          <Typography gutterBottom>Vous avez effectué :</Typography>
          <CompletionChipList completions={completions}></CompletionChipList>
        </>
      ) : (
        <Typography>
          {"Il n'y a pas eu d'activité durant la semaine pour le tracker sélectionné."}
        </Typography>
      )}
    </>
  );
};

export default TotalText;
