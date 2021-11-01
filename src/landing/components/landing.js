import React from "react";
import { Grid, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import landing from "../images/landing.jpg";

const Landing = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Grid flexGrow="1" templateColumns="1fr 2fr">
      <Flex
        justify="space-around"
        direction="column"
        align="flex-start"
        padding="30px 40px"
        maxWidth="500px"
        bg="grays.100"
      >
        <Heading size="sm">{t("LANDING.TITLE")}</Heading>
        <Text fontSize="3xl">{t("LANDING.SUBTITLE")}</Text>
        <Grid width="100%" gap="16px" pt="60px" templateColumns="1fr 1fr">
          <Button
            onClick={() => history.push("/sign-in")}
            variant="outline"
            colorScheme="green"
          >
            {t("LANDING.SIGN_IN")}
          </Button>
          <Button onClick={() => history.push("/sign-up")} colorScheme="green">
            {t("LANDING.SIGN_UP")}
          </Button>
        </Grid>
      </Flex>
      <Flex>
        <Image src={landing} />
      </Flex>
    </Grid>
  );
};

export default Landing;
