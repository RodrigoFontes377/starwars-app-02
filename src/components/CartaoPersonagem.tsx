import { Link } from "react-router-dom";

interface CartaoPersonagemProps {
  personagem: { name: string };
  id: string | number;
}

export default function CartaoPersonagem({
  personagem,
  id,
}: CartaoPersonagemProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: 10,
        padding: 10,
        borderRadius: 6,
      }}
    >
      <h3>{personagem.name}</h3>
      <Link to={`/personagens/${id}`}>Ver detalhes</Link>
    </div>
  );
}
