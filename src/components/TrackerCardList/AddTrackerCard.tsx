import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Card, CardActionArea, CardContent, CardProps, useTheme } from '@mui/material';
import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ThemeMode from '../../models/ThemeMode';
import Tracker from '../../models/Tracker';
import { selectThemeMode } from '../../store/theme/theme.selectors';
import { createTracker } from '../../store/trackers/trackersSlice';
import defaultCardProps from '../TrackerCard/defaultCardProps';
import TrackerForm from '../forms/TrackerForm/TrackerForm';

interface Props {
  cardProps?: CardProps;
}
const AddTrackerCard: FC<Props> = ({ cardProps }) => {
  const dispatch = useAppDispatch();
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const themeMode: ThemeMode = useAppSelector(selectThemeMode);
  const theme = useTheme();

  const hoverColor = themeMode === ThemeMode.LIGHT ? 'accent.main' : 'secondary.main';
  const cardActionSx = {
    '&:hover': {
      backgroundColor: displayCreateForm ? '' : hoverColor
    }
  };

  const allCardProps = {
    ...defaultCardProps(themeMode, theme),
    ...cardProps
  };

  const onSubmit = (tracker: Tracker) => {
    dispatch(createTracker(tracker));
    setDisplayCreateForm(false);
  };

  return (
    <Card {...allCardProps}>
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
          <TrackerForm onSubmit={onSubmit} />
        </CardContent>
      )}
    </Card>
  );
};

export default AddTrackerCard;
