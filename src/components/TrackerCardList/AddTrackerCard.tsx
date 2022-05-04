import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Card, CardActionArea, CardContent, CardProps, useTheme } from '@mui/material';
import { FC, useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import ThemeMode from '../../models/ThemeMode';
import { selectThemeMode } from '../../store/theme/theme.selectors';
import defaultCardProps from '../TrackerCard/defaultCardProps';
import TrackerForm from '../forms/TrackerForm/TrackerForm';

interface Props {
  cardProps?: CardProps;
}
const AddTrackerCard: FC<Props> = ({ cardProps }) => {
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
          <TrackerForm hideForm={() => setDisplayCreateForm(false)} />
        </CardContent>
      )}
    </Card>
  );
};

export default AddTrackerCard;
