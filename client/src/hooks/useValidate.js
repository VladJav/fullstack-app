import { useState } from 'react';

function useValidate(regEx) {
    const [isValid, setIsValid] = useState(true);
    const [value, setValue] = useState('');
    function checkValid(text) {
        setValue(text);
        if (value.match(regEx)) setIsValid(true);
        else setIsValid(false);
    }
    return [isValid, checkValid];
}
export default useValidate;
