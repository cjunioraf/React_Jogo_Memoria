import Tabuleiro from "./Tabuleiro"
import { useState } from "react"

const embaralharArray = (array) => {

    for(let i = (array.length - 1); i > 0; i--){
        const e = Math.floor(Math.random() * (i + 1));            
        [array[i], array[e]] = [array[e], array[i]];
    }

    return array;
}

const gerarCartoes = () => {
    const letras = ["A", "B", "C", "D", "E", "F", "G", "H"];        
    const cartoes = letras.map((letra) => ({letra, isVirou: false}));
    //console.log(cartoes);
    const duplicarCartoes = cartoes.concat([...cartoes]).map((cartao, index) => ({...cartao, id: index}));
    //console.log(duplicarCartoes);            
    //console.log(embaralharArray(duplicarCartoes));
    return embaralharArray(duplicarCartoes);
} 

gerarCartoes();

const Jogo = () => {
    
    const[cartoes, setCartoes] = useState(gerarCartoes());
    const[cartoesVirados, setCartoesVirados] = useState([]);
    const[chances, setChances] = useState(100);

    const resultado = cartoes.filter((cartao) => cartao.isVirou).length;
    //console.log(resultado);

    const handleCartaoClick = (cartaoClick) =>{
        //console.log(cartaoClick);
        if(chances === 0){
            return;                
        }

        if(cartoesVirados.length === 2){
            return;
        }

        const newCartoes = cartoes.map((cartao) => {
            return cartao.id === cartaoClick.id ? ({...cartao, isVirou: true}) : (cartao);
        }) 
        //console.log(newCartoes);
        setCartoes(newCartoes);
        setCartoesVirados([...cartoesVirados, cartaoClick])

        if(cartoesVirados.length === 1){

            setTimeout(() => {

                const [primeiraCarta] = cartoesVirados;
                
                if(primeiraCarta.letra != cartaoClick.letra){

                    const resetCartoes = cartoes.map((cartao) => { 
                        return cartao.id === cartaoClick.id || cartao.id === primeiraCarta.id 
                        ? ({...cartao, isVirou: false}) 
                        : (cartao);
                    })

                    setCartoes(resetCartoes);
                    setChances((prev) => prev - 1);                                                                 
                }

                setCartoesVirados([]);
                
            }, 600);
        }

    }  
    
    const resetJogo = () =>{
        setChances(100);
        setCartoesVirados([]);
        setCartoes(gerarCartoes());
    }

  return (
    <div className="jogo">
        <Tabuleiro cartoes={cartoes} onCartaoClick={handleCartaoClick} />   
        {chances === 0 ? (<p>Suas tentativas acabaram!</p>) 
                       : (resultado === cartoes.length) 
                       ? (<h2>Você Venceu!</h2>) 
                       : (<p>Você possui {chances} tentativa(s)</p>)}     
        <button className="btn" onClick={resetJogo}>Reiniciar</button>                       
    </div>
  )
}

export default Jogo