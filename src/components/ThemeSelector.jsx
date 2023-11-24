import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeSelector.css';
import modeIcon from '../assets/mode-icon.svg';

//테마색을 3가지로 정함
const themeColors = ['#58249c', '#249c6b', '#b70233'];

const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useContext(ThemeContext);

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark');
    console.log(mode);
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img src={modeIcon} onClick={toggleMode} alt="밝게/어둡게 전환" style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}} />
      </div>
      <div className="theme-buttons">
        {themeColors.map(color => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;