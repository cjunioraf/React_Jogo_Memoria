import Cartao from "./Cartao"

const Tabuleiro = ({ cartoes, onCartaoClick }) => {
    //console.log(cartoes)
  return (
    <div className="tabuleiro">
        {cartoes.map((cartao) => (
            <Cartao key={cartao.id} cartao={cartao} onCartaoClick={onCartaoClick} />
        ))}
    </div>    
  )
}

export default Tabuleiro