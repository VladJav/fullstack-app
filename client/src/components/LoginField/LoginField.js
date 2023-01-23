import TextField from '@mui/material/TextField';
import { useValidate } from '../../hooks';

function LoginField(props) {
    const [isValid, checkValid] = useValidate(/^.+@(?:[\w-]+\.)+\w+$/);
    return (
        <TextField {...props} error={!isValid} onChange={(e) => checkValid(e.target.value)} />
    );
}
export default LoginField;
