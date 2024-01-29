import React from 'react'
import './Style/Style.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


const Sidebar = ({user}) => {
  return (
    <>
    <div className='sidebar'>
      <List sx={{ width: '100%',  bgcolor: 'whitesmoke' }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src=""/>
          </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.first_name}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.email}
              </Typography>
            </React.Fragment>
          }
        />
        </ListItem>
        <Divider variant="inset" component="li" />
        </List>

    </div>
    </>
  )
}

export default Sidebar
