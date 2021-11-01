import React from "react";
import {
  Flex,
  FormControl,
  Heading,
  InputGroup,
  InputRightElement,
  Input,
  VStack,
  Text,
  Button,
  Center,
  Box,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Eye, EyeOff, Mail, User } from "react-feather";

import { SIGNUP_FIELDS } from "../../constants/auth-constants";

import { validationSchema } from "../../validation-schemas/sign-up-validation";
import { useMutation } from "react-query";
import { signUp } from "../../../api/mutations/auth/auth-mutations";

import useStore from "../../../store";

const SignUp = () => {
  const { t } = useTranslation();
  const { email, username, password } = SIGNUP_FIELDS;
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);
  const setUser = useStore((state) => state.setUser);

  const onSuccess = (data) => {
    const { user, token } = data?.data;
    setUser(user);
    localStorage.setItem("token", token);
    history.push("/");
  };

  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: onSuccess,
    onError: (error) => console.log("error", error),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (values) => {
    mutate(values);
  };

  const goToSignIn = () => {
    history.push("/sign-in");
  };

  return (
    <Flex
      maxWidth="700px"
      width="100%"
      margin="20px auto"
      flexGrow="1"
      direction="column"
      align="center"
      justify="space-around"
    >
      <HStack alignSelf="flex-end" spacing="4px">
        <Text>{t("SIGN_UP.HAVE_ACCOUNT")}</Text>
        <Text cursor="pointer" onClick={goToSignIn} color="green.500">
          {t("LANDING.SIGN_IN")}
        </Text>
      </HStack>
      <Box textAlign="center">
        <Heading mb="6px">{t("LANDING.SIGN_UP")}</Heading>
        <Text>{t("SIGN_UP.SUBTITLE")}</Text>
      </Box>
      <VStack width="60%" spacing="16px">
        <FormControl isInvalid={errors?.[email.name]}>
          <Text mb="3px">{t(email.label)}</Text>
          <InputGroup>
            <Input
              type="email"
              {...register(email.name)}
              placeholder={t(email.placeholder)}
            />
            <InputRightElement
              children={<Mail strokeWidth={1} stroke="gray" />}
            />
          </InputGroup>
          <FormErrorMessage>
            {t(errors?.[email.name]?.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.[username.name]}>
          <Text mb="3px">{t(username.label)}</Text>
          <InputGroup>
            <Input
              {...register(username.name)}
              placeholder={t(username.placeholder)}
            />
            <InputRightElement
              children={<User strokeWidth={1} stroke="gray" />}
            />
          </InputGroup>
          <FormErrorMessage>
            {t(errors?.[username.name]?.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.[password.name]}>
          <Text mb="3px">{t(password.label)}</Text>
          <InputGroup>
            <Input
              {...register(password.name)}
              type={showPassword ? "text" : "password"}
              placeholder={t(password.placeholder)}
            />
            <InputRightElement
              children={
                <Center onClick={handlePasswordVisibility}>
                  {!showPassword ? (
                    <Eye strokeWidth={1} stroke="gray" />
                  ) : (
                    <EyeOff strokeWidth={1} stroke="gray" />
                  )}
                </Center>
              }
            />
          </InputGroup>
          <FormErrorMessage>
            {t(errors?.[password.name]?.message)}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <Button
        width="60%"
        type="submit"
        onClick={handleSubmit(handleSignUp)}
        colorScheme="green"
        isLoading={isLoading}
      >
        {t("LANDING.SIGN_UP")}
      </Button>
    </Flex>
  );
};

export default SignUp;
