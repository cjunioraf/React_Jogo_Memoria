const Cartao = ({cartao, onCartaoClick}) => {
    //console.log(cartao)
  return (
    <div className={`cartao ${cartao.isVirou ? "virou" : ""}`} 
         onClick={() => onCartaoClick(cartao)}>
        {cartao.isVirou ? (cartao.letra) : "?"}        
    </div>
  )
}

export default Cartao