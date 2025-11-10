export default function Button({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button className="login-btn" onClick={onClick}>
      {text}
    </button>
  );
}
