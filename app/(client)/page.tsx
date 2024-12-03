import Image from "next/image";
import HomeCard from "../components/Home/HomeCard";
import { Box, Grid2, Typography } from "@mui/material";
import "@fontsource/montserrat-alternates/400.css"
import HomeCards from "../components/Home/HomeCards";
import CommentCard from "../components/Home/CommentCard";
import { redirect } from 'next/navigation';
import AppointmentButtom from "../components/Home/AppointmentButtom";
import axios from "axios";
import { comment } from "postcss";

type cardsTexts = {
  SobreNosotros: any;
  PortacionArmas: any;
  Terapia: any;
  Diagnosis: any;
}

type commentType = {
  nombre: string;
  comment: string;
}


async function getCardText(card: string): Promise<cardsTexts> {
  try {
    const res = await axios.get(`${process.env.STRAPI_API_URL}/${card}`)
    const data: cardsTexts = await res.data.data;
    return {
      SobreNosotros: data.SobreNosotros,
      PortacionArmas: data.PortacionArmas,
      Terapia: data.Terapia,
      Diagnosis: data.Diagnosis
    };
  } catch (error) {
    console.error(error)
    return {
      SobreNosotros: "",
      PortacionArmas: "",
      Terapia: "",
      Diagnosis: ""
    };
  }
}

async function getComments(): Promise<commentType[] | null> {
  try {
    const res = await axios.get(`${process.env.STRAPI_API_URL}/comments`)
    const data = await res.data.data;
    if (!data) {
      return null;
    }
    return data.map((element: any) => {
      return {
        nombre: element.ClientName,
        comment: element.Comment
      }
    })
  } catch (error) {
    console.error(error)
    return null
  }
}



export default async function Home() {

  const card_text: cardsTexts = await getCardText("home-card")
  const comments = await getComments();

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
        <HomeCards
          SobreNosotros={card_text.SobreNosotros}
          PortacionArmas={card_text.PortacionArmas}
          Terapia={card_text.Terapia}
          Diagnosis={card_text.Diagnosis}
        />
        <AppointmentButtom />
        {comments &&
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
              {comments.map(comment => (
                <Grid2 mt={4} key={comment.nombre}>
                  <CommentCard clientName={comment.nombre} commentText={comment.comment} borderColor="#FA7899" />
                </Grid2>
              ))}
            </Grid2>
          </Box>
        }

      </Box >
    </>

  );
}