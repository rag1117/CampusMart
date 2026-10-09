export default function LoadingMessage({ text = 'Loading...' }) {
  return <p className="status-message loading">{text}</p>;
}
