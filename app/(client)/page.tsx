import Image from "next/image";
import HomeCard from "../components/Home/HomeCard";
import { Box, Grid2, Typography } from "@mui/material";
import "@fontsource/montserrat-alternates/400.css"
import HomeCards from "../components/Home/HomeCards";
import CommentCard from "../components/Home/CommentCard";
import { redirect } from 'next/navigation';
import AppointmentButtom from "../components/Home/AppointmentButtom";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          width: {
            xs: '96%',
            sm: '90%',
            md: '85%',
            lg: '80%',
            xl: '75%'
          },
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pb: 4
        }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: 36,
              textAlign: 'center',
              verticalAlign: 'center',
              fontFamily: ["Montserrat Alternates"].join(","),
              fontStyle: "cursive",
              margin: 0,
              padding: 0,
              fontWeight: 300,
            }}>
            {"Psicologa clinica"}
          </Typography>
        </Box>
        <HomeCards />
        <AppointmentButtom />
        <Box width={'100%'} mt={15} sx={{ display: 'flex', flexDirection: "column" }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: ["Montserrat Alternates"].join(","),
              fontSize: '25px',
              fontWeight: '500',
            }}>
            {"Comentarios"}
          </Typography>

          <Grid2 container spacing={1}>

            <Grid2 mt={4} >
              <CommentCard clientName="Fake client name" commentText="Some comment muy bonito trato y bla bla bla Some comment muy bonito trato y bla bla bla Some comment muy bonito trato y bla bla bla Some comment muy bonito trato y bla bla bla" borderColor="#FA7899" />
            </Grid2>

          </Grid2>

        </Box>

      </Box >
    </>

  );
}

//2e939d