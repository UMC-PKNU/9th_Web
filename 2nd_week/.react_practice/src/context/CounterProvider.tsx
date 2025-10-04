import { createContext, useContext, useState, ReactNode } from 'react';

// Context의 타입 정의
interface CounterContextType {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

// Context 생성 (초기값은 undefined로 설정)
export const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);

// Context Provider 객체 생성, children은 <CounterProvider> ... </CounterProvider> 사이에 들어가는 모든 React 노드들이다. children의 타입은 ReactNode이다(react가 렌더링할 수 있는 모든 값을 허용하기 위함)
export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => prev - 1);

  return (
    //CounterContext.Provider는 자식 컴포넌트들에게 value값을 공급하는 역할 children에게 값을 저장하는 것이 아닌, useContext를 통해 꺼내 쓸 수 있도록 공급되는 것이다.
    <CounterContext.Provider
      value={{ count, handleIncrement, handleDecrement }}
    >
      {children}
    </CounterContext.Provider>
  );
};

// CounterProvider.tsx 맨 아래 추가
export const useCount = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(
      'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};
