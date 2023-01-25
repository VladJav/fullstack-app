import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import AdbIcon from '@mui/icons-material/Adb';

import { Logo } from '../Logo';
import { UserMenu } from '../UserMenu';
import { BurgerMenu } from '../BurgerMenu';

function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo />
                    <BurgerMenu sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
                    <UserMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
