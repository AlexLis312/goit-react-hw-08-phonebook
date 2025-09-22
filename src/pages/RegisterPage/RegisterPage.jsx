import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const toast = useToast();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => {
        toast({ title: 'Успішна реєстрація!', status: 'success' });
      })
      .catch(() => {
        toast({ title: 'Помилка реєстрації', status: 'error' });
      });
    form.reset();
  };

  if (isLoggedIn) return <Navigate to="/contacts" />;

  return (
    <Container maxW="md" mt={10}>
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center">
          Реєстрація
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Ім’я</FormLabel>
              <Input name="name" placeholder="Введіть ім’я" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" placeholder="Введіть email" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Введіть пароль"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Зареєструватися
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
