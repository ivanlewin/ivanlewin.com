import LanguageMenu from './LanguageMenu';
import ToggleColorModeButton from './ToggleColorModeButton';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <LanguageMenu />
            <ToggleColorModeButton />
        </header>
    );
};

export default Header;