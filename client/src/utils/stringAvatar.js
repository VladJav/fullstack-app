// eslint-disable-next-line import/named
import { stringToColor } from '.';

export default function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}
