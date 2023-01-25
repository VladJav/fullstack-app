import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const settings = ['Profile', 'Logout'];

export default function UserMenu() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        const setting = event.currentTarget.textContent;
        if (setting === 'Logout') {
            navigate('/login');
            Cookies.remove('auth-token');
        } else if (setting === 'Profile') {
            navigate('/profile');
        }
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ flexGrow: 0 }}>
            {!Cookies.get('auth-token') ? (
                <Typography
                  component="a"
                  href="/login"
                  sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Log In
                </Typography>
            ) : (
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
              keepMounted
              transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
