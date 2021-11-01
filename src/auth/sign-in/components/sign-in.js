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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Eye, EyeOff, Mail } from "react-feather";

import { SIGNIN_FIELDS } from "../../constants/auth-constants";

import { validationSchema } from "../../validation-schemas/sign-in-validation-schema";
import { useMutation } from "react-query";
import { signIn } from "../../../api/mutations/auth/auth-mutations";

import useStore from "../../../store";

const SignIn = () => {
  const { t } = useTranslation();
  const { email, password } = SIGNIN_FIELDS;
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);
  const setUser = useStore((state) => state.setUser);
  const toast = useToast();

  const onSuccess = (data) => {
    const { user, token } = data?.data;
    setUser(user);
    localStorage.setItem("token", token);
    history.push("/");
  };

  const { mutate, isLoading } = useMutation(signIn, {
    onSuccess: onSuccess,
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
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

  const handleSignIn = (values) => {
    mutate(values);
  };

  const goToSignUp = () => {
    history.push("/sign-up");
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
        <Text>{t("SIGN_IN.DONT_HAVE_ACCOUNT")}</Text>
        <Text cursor="pointer" onClick={goToSignUp} color="green.500">
          {t("LANDING.SIGN_UP")}
        </Text>
      </HStack>
      <Box textAlign="center">
        <Heading mb="6px">{t("LANDING.SIGN_IN")}</Heading>
        <Text>{t("SIGN_IN.SUBTITLE")}</Text>
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
        onClick={handleSubmit(handleSignIn)}
        colorScheme="green"
        isLoading={isLoading}
      >
        {t("LANDING.SIGN_IN")}
      </Button>
    </Flex>
  );
};

export default SignIn;
