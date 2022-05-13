import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext.js";
import { useAppContext } from "../../context/state.js";

import Carousel from "react-material-ui-carousel";
import { Paper, Grid, Box, Stack, Typography } from "@mui/material";
import { BsCoin } from "react-icons/bs";
import axios from "axios";

export default function User() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { stateResults } = useAppContext();
  const [nfts, setNfts] = useState([]);

  // Only allows logged in user to access this page
  if (!currentUser) {
    router.push("/login");
  }

  let boards = [
    {
      image: "https://i.gyazo.com/8d6cb9ecfc6086cc012e668a1ea8ca22.png",
      name: "Lucky Lucy",
      path: "/play/ladyLuck",
    },
    {
      image: "https://i.gyazo.com/1690a9467a2da075402693412f4cb162.png",
      name: "Bingo",
      path: "/play/bingo",
    },
    {
      image: "https://i.gyazo.com/1563373bca281a21cf4bdeea575bf23e.png",
      name: "High Roller",
      path: "/play/dice",
    },
  ];

  useEffect(() => {
    axios
      .get("/api/nfts/admin")
      .then((response) => {
        setNfts(response.data.data);
      })
      .catch((err) => {
        console.log("failed GET for admin NFTS", err);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 360,
          height: 40,
          bgcolor: "tertiary.main",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            m: 2,
          }}
        >
          <Box
            sx={{
              width: 320,
              pr: 0.75,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              {stateResults.username}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              {stateResults.tokens}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 0.4,
            }}
          >
            {<BsCoin />}
          </Box>
        </Box>
      </Paper>
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 175,
            width: 360,
            border: 1,
            borderRadius: 2,
            borderColor: "primary.main",
            color: "primary.main",
            bgcolor: "#FFF",
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
            }}
          >
            Promotional events coming soon!
          </Typography>
        </Box> */}

        <Carousel sx={{ width: 360 }} navButtonsAlwaysVisible={false}>
          {nfts.map((item, i) => (
            <NFTItem key={i} item={item} />
          ))}
        </Carousel>

        <Carousel
          sx={{
            width: 360,
          }}
          navButtonsAlwaysVisible={false}
        >
          {boards.map((item, i) => (
            <GameItem key={i} item={item} />
          ))}
        </Carousel>
      </Stack>
    </Box>
  );
}

function NFTItem(props) {
  return (
    <Paper elevation={3}>
      <Grid
        container
        justifyContent="center"
        sx={{
          borderRadius: 2,
        }}
      >
        <img
          src={props.item.image}
          width="360"
          height="360"
          object-fit="cover"
        ></img>
      </Grid>
    </Paper>
  );
}

function GameItem(props) {
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Paper elevation={3}>
      <Grid
        container
        justifyContent="center"
        sx={{
          borderRadius: 2,
        }}
      >
        <img
          src={props.item.image}
          width="360"
          height="175"
          object-fit="cover"
          border-radius="20%"
          onClick={() => {
            onLink(props.item.path);
          }}
        ></img>
      </Grid>
    </Paper>
  );
}
