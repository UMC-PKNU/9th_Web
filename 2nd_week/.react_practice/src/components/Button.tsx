interface ButtonProps {
  onClick: () => void;
  text: string;
  className?:string;
  style?: React.CSSProperties;
}

const Button = ({ onClick, text, className,style}: ButtonProps) => {
  return <button className={className} onClick={onClick} style={style}>{text}</button>;
};

export default Button;