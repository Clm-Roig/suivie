import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Card, CardActionArea, CardContent, CardProps } from '@mui/material';
import { FC, useState } from 'react';

import TrackerForm from '../forms/TrackerForm/TrackerForm';

interface Props {
  cardProps?: CardProps;
}
const AddTrackerCard: FC<Props> = ({ cardProps }) => {
  const [displayCreateForm, setDisplayCreateForm] = useState(false);

  return (
    <Card {...cardProps}>
      <CardActionArea
        onClick={() => setDisplayCreateForm(!displayCreateForm)}
        sx={{
          '&:hover': {
            backgroundColor: displayCreateForm ? '' : 'accent.main'
          }
        }}>
        <CardContent>
          <Box
            sx={{
              textAlign: 'center'
            }}>
            {displayCreateForm ? (
              <RemoveCircleOutlineIcon fontSize="large" color="primary" />
            ) : (
              <AddCircleOutlineIcon fontSize="large" color="primary" />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      {displayCreateForm && (
        <CardContent>
          <TrackerForm hideForm={() => setDisplayCreateForm(false)} />
        </CardContent>
      )}
    </Card>
  );
};

export default AddTrackerCard;
