import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Card, CardActionArea, CardContent, CardProps } from '@mui/material';
import { FC, useState } from 'react';

import { useThemeMode } from '../../app/hooks';
import TrackerForm from '../forms/TrackerForm/TrackerForm';

interface Props {
  cardProps?: CardProps;
}
const AddTrackerCard: FC<Props> = ({ cardProps }) => {
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const themeMode = useThemeMode();

  const hoverColor = themeMode === 'light' ? 'accent.main' : 'secondary.main';
  const cardActionSx = {
    '&:hover': {
      backgroundColor: displayCreateForm ? '' : hoverColor
    }
  };

  return (
    <Card {...cardProps}>
      <CardActionArea onClick={() => setDisplayCreateForm(!displayCreateForm)} sx={cardActionSx}>
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
