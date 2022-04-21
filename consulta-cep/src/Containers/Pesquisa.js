import {useState, useEffect} from 'react'
import consultarCep from 'cep-promise'

function numbersOnly(str){
  return str.replace(/[^\d]/g, '')
}

function Pesquisa(props) {
  const goTo = props.goTo;
  const setResultado = props.setResultado;
  const [cepNumber, setCepNumber] = useState('');
  const setErrorMessage = props.setErrorMessage;
  const ticket = props.ticket;
  const [cepFavorito, setCepFavorito] = useState("");
  const [dadosCep, setDadosCep] = useState({});

  useEffect(()=> {
    const storedCep = localStorage.getItem("cepFavorito") || "";
    setCepFavorito(storedCep);
  },[]);


  useEffect(()=>{
    localStorage.getItem("cepFavorito" , cepFavorito);
  },[cepFavorito]);
  
  function handleChange(evt) {
    const value = evt.target.value
    setCepNumber(numbersOnly(value))
  }
  function clear() {
    setCepNumber('');
  }
  function handleSuccess(dadosCEP){
    const resultados ={
      "ESTADO": dadosCEP.state,
      "CIDADE": dadosCEP.city,
      "BAIRRO": dadosCEP.neighborhood,
      "LOGRADOURO": dadosCEP.street
    }
    setResultado(resultados);
    goTo("RESULTADOS");
  }
  function handleError(err){
    const errorMessage = err.message;
    setErrorMessage(errorMessage);
    goTo("ERRO");
  }
  function handleSearch(){
    ticket.current ++;
    const currentTicket =ticket.current;
    goTo("CARREGANDO");
    consultarCep(cepNumber)
      .then(result => currentTicket === ticket.current && handleSuccess(result))
      .catch(err=> currentTicket === ticket.current && handleError(err))
  }
  function handleAdicionarFavorito(){
    localStorage.setItem("cepFavorito", cepNumber);
  }
  return <>
    <p>Qual CEP você deseja pesquisar?</p>
    <p>Favorito : {cepFavorito}</p>
    <input value={numbersOnly(cepNumber)} onChange={handleChange} />
    <button onClick={handleSearch}>CONSULTAR</button>
    <button onClick={handleAdicionarFavorito}>SALVAR FAVORITO</button>

  </>  
}

export default Pesquisa
