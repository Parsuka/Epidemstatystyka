import Switch from './Switch';
import { useTheme } from '../../hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <Switch checked={theme === 'dark'} onChange={toggleTheme} leftLabel="Світла" rightLabel="Темна" />;
}

export default ThemeToggle;
