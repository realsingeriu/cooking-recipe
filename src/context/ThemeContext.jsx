import { createContext, useReducer, useState } from "react";

// themeContext 생성
export const ThemeContext = createContext();
// 리듀서 함수 정의
const themeReducer = (state, action) => {
  switch(action.type) {
    // change_color는 navbar 컬러 색상 변경 
    case 'CHANGE_COLOR':
      return {...state, color: action.payload};
      // chang_mode는 navbar 빼고 light, dark 모드로 변경
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload };
      default:
        return state;
  }
};


// children은 하위 컴포넌트를 의미
// 컴텍스트, 프로바이더에서 value값을 전역으로 제공
export function ThemeProvider({ children }) {
  // 리듀서는 state , dispatch로 업데이트
  const [state, dispatch] = useReducer(themeReducer, { color: '#58249c', mode: 'dark'});
  const changeColor = (color) => {
    dispatch({type: 'CHANGE_COLOR', payload: color});
  }
  const changeMode = (mode) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode });
  };
  // themeContext.provaider를 사용하여 전역으로 상태와 함수 제공 
  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode}}>
      {children}
    </ThemeContext.Provider>
  );
}
