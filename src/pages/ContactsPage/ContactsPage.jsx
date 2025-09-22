import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../redux/contacts/operations';
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from '../../redux/contacts/selectors';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Spinner,
  List,
  ListItem,
  IconButton,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const toast = useToast();

  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const number = form.elements.number.value.trim();

    if (!name || !number) {
      toast({ title: 'Заповніть усі поля', status: 'warning' });
      return;
    }

    if (contacts.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      toast({ title: 'Такий контакт вже існує', status: 'error' });
      return;
    }

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => toast({ title: 'Контакт додано!', status: 'success' }))
      .catch(() => toast({ title: 'Помилка при додаванні', status: 'error' }));

    form.reset();
  };

  // 📌 Удаление контакта с уведомлением
  const handleDelete = (id, name) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast({
          title: `Контакт "${name}" видалено`,
          status: 'info',
        });
      })
      .catch(() => {
        toast({ title: 'Помилка при видаленні', status: 'error' });
      });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container maxW="lg" mt={10}>
      <Heading mb={6} textAlign="center">
        Контакти
      </Heading>

      {/* Форма додавання */}
      <Box mb={6} p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Ім’я</FormLabel>
              <Input name="name" placeholder="Введіть ім’я" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Номер телефону</FormLabel>
              <Input name="number" placeholder="Введіть номер" />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Додати контакт
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Поле фільтра */}
      <Box mb={6}>
        <FormControl>
          <FormLabel>Пошук контактів</FormLabel>
          <Input
            placeholder="Введіть ім’я для пошуку..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </FormControl>
      </Box>

      {/* Список контактів */}
      {isLoading && <Spinner />}
      {error && <Text color="red.500">Помилка: {error}</Text>}

      <List spacing={3}>
        {filteredContacts.map(contact => (
          <ListItem
            key={contact.id}
            p={3}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
          >
            <HStack justify="space-between">
              <Text>
                {contact.name}: {contact.number}
              </Text>
              <IconButton
                aria-label="Видалити контакт"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDelete(contact.id, contact.name)}
              />
            </HStack>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ContactsPage;
