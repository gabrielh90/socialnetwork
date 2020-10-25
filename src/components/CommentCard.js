import React, {useState} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {fade, makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
const useStyles = makeStyles((theme)=>({
    listItem: {
        borderRadius: 5,
    },
    icon: {
        backgroundColor: fade(theme.palette.common.black, 0.09),
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        width: '40px',
        marginRight: theme.spacing(1),
    },
    itemTextPrimary: {
        padding: theme.spacing(1),
        backgroundColor: fade(theme.palette.common.black, 0.07),
        borderRadius: 15,
    },
    styleName: {
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamily,
        fontSize: '13px',
    },
    styleComment: {
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: theme.typography.fontFamily,
        fontSize: '14px',
    },
    roundIcon: {
        //border: '2px green solid',
        marginLeft: theme.spacing(0.5),
        padding: theme.spacing(1),
        fontSize: 24,
        height: '100%',
        color: 'gray',
        background: fade(theme.palette.common.black, 0.07),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.11),
        },
    },
    itemTextSecondary: {
        fontWeight: 600,
        fontFamily: theme.typography.fontFamily,
        fontSize: '11px',
        paddingLeft: theme.spacing(1.5),
        color: fade(theme.palette.common.black, 0.6),
    },
}))


const ListElement = ({name, comment, avatar, type}) => {
    const [readMore, setReadMore] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()
    const onChangeReadMore = () => {
        setReadMore(!readMore)
    }

    const processComment = (comment) => {
        let fComment = <div>{comment}</div>
        if (comment.length > 100) {
            fComment = <div>
                            {comment.slice(0, 70)}
                            {!readMore && <span style={{fontWeight: 500}} onClick={onChangeReadMore} > ...Read more </span> }
                            {readMore && comment.slice(70, comment.length) }
                            {readMore && <span style={{fontWeight: 500}} onClick={onChangeReadMore} > ...Read less </span> }
                        </div>
        }
        return fComment
    }

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            // id={menuId}
            // keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            >
            <MenuItem onClick={handleMenuClose}>Hide comment</MenuItem>
            <MenuItem onClick={handleMenuClose}>Report comments to admins</MenuItem>
            <MenuItem onClick={handleMenuClose}>Give feedback or report this comment</MenuItem>
        </Menu>
    );

    let fName = <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={classes.itemTextPrimary}>
                        <p className={classes.styleName}>{name}</p>
                        <p className={classes.styleComment}>{processComment(comment)}</p>
                    </div>
                    <IconButton
                        aria-label="show more"
                        // aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        className={classes.roundIcon}
                        >
                        <MoreHorizIcon/>
                    </IconButton>
                    {renderMenu}
                </div>
    let fComment = <div className={classes.itemTextSecondary}>
                    <span>Like &#x00B7; </span>
                    <span>Reply &#x00B7; </span>
                    <span>8Hours</span>
                    </div>

    return (
        <>
        <ListItem className = {classes.listItem}>
            <ListItemAvatar style={{disply: 'grid', alignSelf: 'self-start', minWidth: '20px',}}>
                { avatar === null ? 
                      <Icon className={classes.icon}><AccountCircleIcon  style={{ fontSize: 48 }} /></Icon>
                    : typeof(avatar) === 'object' 
                    ? <Icon className={classes.icon}>{avatar}</Icon> //material ui icon
                    : <Avatar className={classes.icon} alt={avatar} src={avatar}/> //path to the image
                }
            </ListItemAvatar>
            
            <ListItemText 
                style={{margin: '0px'}}
                disableTypography='true'
                primary ={fName}
                secondary={fComment
                    // typeof(name) === 'string' 
                    //     ? <Typography variant='caption' color='primary'>
                    //         {description}
                    //       </Typography>
                    //     : description
                }
            />
            
        </ListItem>
                
        </>
    );
}
ListElement.defaultProps = {
    name: 'Pricolici',
    type: 'standard',
    avatar: null
}
ListElement.propTypes = {
    comment: PropTypes.bool,
}
export default ListElement;