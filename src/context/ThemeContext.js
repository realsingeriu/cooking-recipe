import { createContext } from "react";

export const ThemeContext = createContext();

// children은 하위 컴포넌트를 의미
// 컴텍스트, 프로바이더에서 value값을 전역으로 제공

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ color: "blue" }}>
      {children}
    </ThemeContext.Provider>
  );
}
