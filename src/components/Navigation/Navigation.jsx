import { Flex, Button, Box, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="nav"
      p={4}
      justify="space-between"
      align="center"
      bg={colorMode === 'light' ? 'teal.500' : 'gray.800'}
      color="white"
    >
      <Box>
        {isLoggedIn ? (
          <Button as={Link} to="/contacts" variant="ghost" color="white">
            Контакти
          </Button>
        ) : (
          <>
            <Button as={Link} to="/register" variant="ghost" color="white">
              Реєстрація
            </Button>
            <Button as={Link} to="/login" variant="ghost" color="white">
              Логін
            </Button>
          </>
        )}
      </Box>

      <Flex align="center" gap={3}>
        {/* Тогглер темы */}
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="outline"
          color="white"
          _hover={{ bg: 'whiteAlpha.300' }}
        />
        {isLoggedIn && <UserMenu />}
      </Flex>
    </Flex>
  );
};

export default Navigation;
