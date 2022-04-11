import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const CompletionUnitTextField = styled(TextField)`
  fieldset {
    border-width: 0 0 1px 1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default CompletionUnitTextField;
