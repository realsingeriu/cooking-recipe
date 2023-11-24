import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeSelector.css';

//테마색을 3가지로 정함
const themeColors = ['#58249c', '#249c6b', '#b70233'];

const ThemeSelector = () => {
  const { changeColor } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
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