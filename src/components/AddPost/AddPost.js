import React, {useState, useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {axios} from './../../shared/'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CancelToken, isCancel } from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '9px',
    },
    textArea: {
        width: '100%',
    },
    inputFile: {
        display: 'none',
    },
    customButton: {
        color: "#fff",
        margin: theme.spacing(1),
        width: '220px',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },

    root2: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
      },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &$focusVisible': {
          zIndex: 1,
          '& $imageBackdrop': {
            opacity: 0.15,
          },
          '& $deleteImage': {
            opacity: 0,
          },
        },
      },
      focusVisible: {},
      imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      },
      imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
      imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      },
      deleteImage: {
        position: 'absolute',
        bottom: 10,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      },
}));
const getDate = (separator=' ') => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
};

const AddPost = (props) => {
    const [formFields, setformFields] = useState({
        title: '',
        aboveText: '',
        belowText: '',
        privacy: 10
    });
    const [selectedFiles, setselectedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [fileInfos, setFileInfos] = useState([]);
    const cancelFilesUpload = useRef(null);


    const classes = useStyles();

    const uploadFile = (onUploadProgress) => {
        let formData = new FormData();
        formData.append('title', formFields['title']);
        formData.append('aboveText', formFields['aboveText']);
        selectedFiles.forEach(image => {
            formData.append("files", image);
        })
        formData.append('belowText', formFields['belowText']);
        formData.append('privacy', formFields['privacy']);
        return axios.post('/posts', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress,
            cancelToken: new CancelToken( 
                    cancel => cancelFilesUpload.current = cancel
            )
        })
    }
    const uploadFileService = (event) => {
        // event.preventDefault();
        uploadFile(event => {
            const {loaded, total} = event
            console.log(event);
            // console.log(loaded + " " + total);
            // setProgress(Math.round((100 * event.loaded) / event.total));

        })
        .then((rsp) => {
            if(rsp.data.success){
                setformFields({title: '', aboveText: '', belowText: '', privacy: 10});
                props.handleAddPost(false);
            }
            console.log(rsp);})
        .catch((error)=> {
            console.log(error)
            if(isCancel(error)){
                console.log(error.message);
            }
        })
    }
    const cancelUpload = () => {
        if(cancelFilesUpload.current){
            cancelFilesUpload.current(" User has canceled the files upload");
        }
    }
    const handleChange = prop => event => {
        setformFields({...formFields, [prop]: event.target.value})
    }
    const selectFiles = (event) => {
        setselectedFiles(prevSelectedFiles => 
                [   ...prevSelectedFiles,
                    ...event.target.files
                ]
        )
        // console.log(event.target.files[0].name)
    }
    const deleteImage = (index) => {
        setselectedFiles(prevSelectedFiles => 
                // [...prevSelectedFiles.filter((img, ind) => ind !== index)]
                prevSelectedFiles.filter((img, ind) => ind !== index)
            );
    }
    // let Images = selectedFiles && selectedFiles.map((elem, index) => 
    //                                    <img src={URL.createObjectURL(elem)} />
    //                                 )


    let images =  <div className={classes.root2}>
                    {selectedFiles.map((image, index) => (
                    <ButtonBase
                        focusRipple
                        key={image.name}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                        width: '50%',
                        }}
                        onClick={()=>{deleteImage(index)}}
                    >
                        <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${URL.createObjectURL(image)})`,
                        }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                        <DeleteForeverIcon  className={classes.deleteImage}/>
                        </span>
                    </ButtonBase>
                    ))}
                </div>
                                
    return (
        <Card className={classes.root}>
            <CardHeader
                title='Add Post'
                subheader={getDate('-')}
            />
            <CardContent>

                <TextareaAutosize
                    rowsMax={1}
                    aria-label="maximum height"
                    placeholder="Lorem ipsum dolor sit amet"
                    value={formFields.title}
                    className={classes.textArea}
                    onChange={handleChange('title')}
                />
                <TextareaAutosize
                    rowsMax={4}
                    aria-label="maximum height"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    value={formFields.aboveText}
                    className={classes.textArea}
                    onChange={handleChange('aboveText')}
                />
                <label>
                    <input 
                        type='file' 
                        multiple 
                        // accept="image/*"
                        className={classes.inputFile}
                        id="images"
                        onChange={selectFiles}/>
                    <Button variant="contained"
                        size="large"  
                        color="primary" 
                        component="span"
                        className={classes.customButton}
                        endIcon={<PhotoCamera/>}>
                        Select Images
                    </Button>
                </label>
        
                {/* {Images} */}
                {images}
                    
                <TextareaAutosize
                    rowsMax={4}
                    aria-label="maximum height"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    value={formFields.belowText}
                    className={classes.textArea}
                    onChange={handleChange('belowText')}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="privacy-post">Privacy</InputLabel>
                    <Select
                    native
                    value={formFields.privacy}
                    onChange={handleChange('privacy')}
                    inputProps={{
                        name: 'privacy',
                        id: 'privacy-post',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={10}>Public</option>
                    <option value={20}>Friends</option>
                    <option value={30}>Only Me</option>
                    <option value={40}>Specific Friend/s</option>
                    <option value={50}>Friends except</option>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick = {uploadFileService}
                    className={classes.customButton}
                    startIcon={<Icon>send</Icon>}
                >
                    Post
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick = {() => props.handleAddPost(false)}
                    className={classes.customButton}
                >
                    Cancel
                </Button>
            </CardContent>
        </Card>
    )
}

export default AddPost;