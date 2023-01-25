import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

export default function BurgerMenu(props) {
    const { sx } = props;
    return (
        <Box sx={sx}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
              keepMounted
              transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
              sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            />
        </Box>
    );
}
