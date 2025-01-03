


import React, { useEffect } from 'react';
import { Avatar, Box, Typography, Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getStoryApi, profileUploadApi } from '../../../redux/actions/social';
import {  IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Dropzone from "react-dropzone";
import { Image } from 'react-feather';
import { sessionUpdateApi } from '../../../redux/actions/login';

const ProfileDashBoard = () => {
  const dispatch = useDispatch();
  // Static friend data
  const { myProfile } = useSelector((state) => {
    return state.loginReducer;
  });
  const { getStoryPost } = useSelector((state) => {
    return state.socialReducer;
  });
  

  // getStoryApi
  const user = {
    user_id: "ADMIN-4",
    name: "Adarsh Kumar",
    email: "adarsh13@gmail.com",
    userName: "adarsh_202",
    phoneNumber: "0987654321",
    gender: "Male",
    city: "Mumbai",
    role: "admin",
    avatar: "https://via.placeholder.com/150",
    status: "Active",
    followers: 1200,
    following: 300,
    posts: 9, // Total posts
  };

  // Dummy images for posts
  const dummyImages = [
    "https://via.placeholder.com/150/0000FF/808080?Text=Post1",
    "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Post2",
    "https://via.placeholder.com/150/00FF00/000000?Text=Post3",
    "https://via.placeholder.com/150/FF00FF/000000?Text=Post4",
    "https://via.placeholder.com/150/FFFF00/000000?Text=Post5",
    "https://via.placeholder.com/150/00FFFF/000000?Text=Post6",
    "https://via.placeholder.com/150/808080/FFFFFF?Text=Post7",
    "https://via.placeholder.com/150/000000/FFFFFF?Text=Post8",
    "https://via.placeholder.com/150/800080/FFFFFF?Text=Post9",
  ];

  useEffect(() => {
    if(myProfile?.id){
    dispatch(getStoryApi(myProfile?.id));
    }
  
}, [myProfile]);

useEffect(() => {
 
dispatch(sessionUpdateApi(myProfile?.user_id));

}, [myProfile]);

  // Handle file input change
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("profile_pic_file", file);
    });
    formData.append("id", myProfile?.user_id);

    dispatch(profileUploadApi(formData));

   
  };


console.log(getStoryPost,"getStoryPost")
  return (
    <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          width: '100%',
          // maxWidth: 600,
          padding: 3,
          borderRadius: 4,
          backgroundColor: "#FFF",
          boxShadow: 3,
        }}
      >
        {/* Top Section */}
        <Grid container alignItems="center" spacing={2}>
          {/* Avatar */}
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Avatar
              src={myProfile?.avatar}
              alt={myProfile?.name}
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto',
                border: '2px solid #DEA3B7',
              }}
            />
             <IconButton
      color="primary"
      component="label"
      sx={{
        position: "relative",
        bottom: 0,
        right: 0,
        backgroundColor: "red",
        boxShadow: 2,
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <CameraAltIcon />
      <Box className="dropZone-container">
                <Dropzone
                  onDrop={onDrop}
                // accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      className="dropzone col-2 p-3 text-end align-self-center d-flex"
                    >
                      <input {...getInputProps()} />
                      { }
                      <Box
                        // className={`${styles.upload_placeholder} upload_blk`}
                      >
                      
                        {/* <label htmlFor="upload-image">
          <Button variant="outlined" component="span" fullWidth>
            Upload Image
          </Button>
        </label> */}
                      </Box>
                    </Box>
                  )}
                </Dropzone>
              </Box>
    </IconButton>
          </Grid>

          {/* Stats */}
          <Grid item xs={8}>
            <Grid container justifyContent="space-around" alignItems="center">
              <Box textAlign="center">
                <Typography variant="h6">{getStoryPost?.data?.length}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Posts
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6">{myProfile?.followers??0}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Followers
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6">{myProfile?.following??0}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Following
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* User Info Section */}
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="h5">{myProfile?.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            @{myProfile?.userName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {myProfile?.city ?? "INDIA"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: myProfile?.status === "Active" ? "green" : "red",
              marginTop: 1,
            }}
          >
            Online: {myProfile?.status}
          </Typography>
        </Box>

        {/* Follow Button */}
        {/* <Button
          variant="contained"
          sx={{
            marginTop: 3,
            width: "100%",
            backgroundColor: "#DEA3B7",
          }}
        >
          Follow
        </Button> */}

        {/* Posts Section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Posts
          </Typography>
          <Grid container spacing={2}>
            
            {getStoryPost?.data&&getStoryPost?.data.map((post,index) => (
              
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1/1', // Ensures square images
                    backgroundImage: `url(${post.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                  
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProfileDashBoard;
