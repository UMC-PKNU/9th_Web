import type { FC, MouseEvent } from 'react';
import { Children, useMemo, cloneElement } from 'react';
import type { LinkProps } from './types.tsx';
import { getCurrentpath, navigateTo } from './utils.tsx';
import { useCurrentPath, isRouteElement } from './utils.tsx';
import type { ReactNode } from 'react';


type RoutesProps = {
  children: ReactNode;
};

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (getCurrentpath() === to) return;
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route: any) => route.props.path === currentPath);
  }, [children, currentPath]);
  if (!activeRoute) return null;
  
  return cloneElement(activeRoute);
};
