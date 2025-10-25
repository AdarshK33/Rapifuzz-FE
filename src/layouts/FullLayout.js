import React, { useEffect } from "react";
import { experimentalStyled, useMediaQuery, Container, Box } from "@mui/material";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useRouter } from "next/router";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.secondary.dark,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper>
      {router.route !== "/" && router.route !== "/login" && (
        <Header
          sx={{
            paddingLeft: "",
            backgroundColor: "#fbfbfb",
          }}
          moduleName={"NAME"}
        />
      )}
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            transition: "all 0.6s ease-in-out",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {router.route !== "/" && router.route !== "/login" && <Footer />}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default React.memo(FullLayout);
