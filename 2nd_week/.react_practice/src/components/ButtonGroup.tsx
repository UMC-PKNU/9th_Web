import Button from './Button';
import './todoStyle.css'
interface ButtonGroupProps {
  handleIncrement: () => void;
  handleDecrement: () => void;
  
}

const ButtonGroup = ({
  handleIncrement,
  handleDecrement,
  
}: ButtonGroupProps) => {
  return (
    <div >
      {/* <button onClick={handleIncrement}>+1 증가</button> */}
      {/* <button onClick={handleDecrement}>-1 감소</button> */}
      <Button style={{
      backgroundColor:'#007bff', 
      width:'60px' ,
      height:'40px',
      position:'relative' ,
      left:'166px',
      bottom:'40px', 
        color:'white'}} onClick={handleIncrement} text='추가' />

      <Button style={{backgroundColor:'#dc3545',
        color:'white',
        width:'60px' ,
      height:'40px',
      position:'relative',
      left:'166px',
      bottom:'40px', 
      }} onClick={handleDecrement} text='삭제' />
    </div>
  );
};

export default ButtonGroup;