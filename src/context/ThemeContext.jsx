import { createContext, useReducer, useState } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_COLOR':
      return {...state, color: action.payload};
      default:
        return state;
  }
};

// children은 하위 컴포넌트를 의미
// 컴텍스트, 프로바이더에서 value값을 전역으로 제공
export function ThemeProvider({ children }) {
  // 리듀서는 state , dispatch로 업데이트
  const [state, dispatch] = useReducer(themeReducer, { color: '#58249c'});
  const changeColor = (color) => {
    dispatch({type: 'CHANGE_COLOR', payload: color});
  }
  return (
    <ThemeContext.Provider value={{ ...state, changeColor}}>
      {children}
    </ThemeContext.Provider>
  );
}
