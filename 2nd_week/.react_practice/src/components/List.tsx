type Tech = 'REACT'|'NEXT'|'VUE'|'STYLE'|'ANGULAR'|'REACT-NAITIVE';
interface Listprops{
  tech: Tech;
}
const List = (props) => {
  const {tech} = props;
  return (
    <li style={{listStyle:'none'}}>
      {props.tech === 'REACT' ? "감튀와 함께하는 리액트" : props.tech}
    </li>
  )
}

export default List