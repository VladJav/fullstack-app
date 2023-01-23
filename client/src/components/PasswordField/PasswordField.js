import TextField from '@mui/material/TextField';
import { useValidate } from '../../hooks';
import ErrorMessage from './PasswordError';

function PasswordField(props) {
    const [isValid, checkValid] = useValidate(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    return (
        <TextField
          {...props}
          error={!isValid}
          onChange={(e) => checkValid(e.target.value)}
          helperText={isValid ? '' : <ErrorMessage />}
        />
    );
}
export default PasswordField;
