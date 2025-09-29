import type {ComponentType} from 'react'
import type { ReactNode } from 'react'

export interface RouteProps {
  path: string;
  component:ComponentType;
  children?: ReactNode;
}



export const Route = ({ component: Component }: RouteProps) => <Component />;
