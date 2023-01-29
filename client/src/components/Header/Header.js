import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import { Logo } from '../Logo';
import { UserMenu } from '../UserMenu';
import { BurgerMenu } from '../BurgerMenu';

function Header() {
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo />
                    <BurgerMenu sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
                    <UserMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
