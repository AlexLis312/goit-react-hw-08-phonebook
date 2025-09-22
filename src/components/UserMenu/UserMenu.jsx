import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { Flex, Text, Button } from '@chakra-ui/react';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Flex align="center" gap={4}>
      <Text>{user.email}</Text>
      <Button colorScheme="red" size="sm" onClick={() => dispatch(logOut())}>
        Вийти
      </Button>
    </Flex>
  );
};

export default UserMenu;
