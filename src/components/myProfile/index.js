


import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getStoryApi, profileUploadApi, storyPostUploadApi } from '../../../redux/actions/social';
import {  IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Dropzone from "react-dropzone";
import { Image } from 'react-feather';
import { sessionUpdateApi } from '../../../redux/actions/login';
import Pagination from 'react-js-pagination';
import { Edit2, Eye, Search, Download } from "react-feather";
const ProfileDashBoard = () => {
  const dispatch = useDispatch();
  // Static friend data
  const { myProfile } = useSelector((state) => {
    return state.loginReducer;
  });
  const { getStoryPost } = useSelector((state) => {
    return state.socialReducer;
  });

   const [focus, setFocus] = useState(false)
  const [borderFocus, setBorderFocus] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);

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

// useEffect(() => {
 
// dispatch(sessionUpdateApi(myProfile?.user_id));

// }, [myProfile]);

  // Handle file input change
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("profile_pic_file", file);
    });
    formData.append("id", myProfile?.id);

    dispatch(storyPostUploadApi(formData));

  };

  
  //   /*-----------------Pagination------------------*/

  const recordPerPage = 10;
  const totalRecords = getStoryPost?.total;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords =getStoryPost?.data;
console.log("indexOfLastRecord",indexOfLastRecord)
  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    dispatch(getStoryApi(myProfile?.id,value-1));
    
  };

  /*-----------------Pagination------------------*/

// console.log(getStoryPost,"getStoryPost")

 const searchHandler = (e, value) => {
    // console.log(value?.itemId, "hello e.target.value");
    setSearchKeyValue(value?.itemId);
  };

  const handleFocus = (e) => {
    setFocus(true)
    setBorderFocus(true)
  }
  const handleFocusOut = (e) => {
    if (e.target.value === "") setFocus(false)
    setBorderFocus(false)
  }

  const getSearchKey = (e) => {
    console.log(e, "hello e.target.value")

      if (e.length >= 3) {
      console.log(e, "hello 1 search")
       setCurrentPage(0);
       dispatch(getStoryApi(myProfile?.id,0,e));
    }
    else if (e.length == 0) {
        setCurrentPage(0);
      console.log(e, "hello 2 search")
     dispatch(getStoryApi(myProfile?.id));

    }

  }
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
                      
                 <span style={{ marginTop: 8, fontWeight: 500 }}>
              Upload Image
            </span>
                      </Box>
                    </Box>
                  )}
                </Dropzone>
              </Box>
    </IconButton>
          </Grid>

      
              <div className="search_custom_container">
                <div className="search_custom_textField" style={borderFocus ? { border: "2px solid  #419794" } : { border: "1px solid #C2C2C2" }}>

                  <Search

                    className="search-icon_attribute mr-1"
                    style={{ color: "#313131", cursor: "pointer" }}

                  />
                  <p className={focus ? 'search_custom_focusp' : 'search_custom_nonfocusp'} style={borderFocus ? { color: "#419794" } : { color: "#C2C2C2" }}>Search</p>
                  <input type="text" name="search" onFocus={handleFocus} onBlur={handleFocusOut} onChange={e => getSearchKey(e.target.value)} autocomplete="off" />
                </div>
              </div>
        </Grid>

    

      

        {/* Posts Section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Photos
          </Typography>
          <Grid container spacing={2}>
            
            { currentRecords&& currentRecords.map((post,index) => (
              
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
        <div className="photoPagination">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={currentPage}
                  itemsCountPerPage={recordPerPage}
                  totalItemsCount={totalRecords}
                  pageRangeDisplayed={pageRange}
                  firstPageText="First"
                  lastPageText="Last"
                  onChange={handlePaginationChange}
                />
        </div>
      </Box>
    </Grid>
  );
};

export default ProfileDashBoard;
