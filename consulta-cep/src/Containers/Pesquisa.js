import {useState, useEffect} from 'react'
import consultarCep from 'cep-promise'
import CEPDados from '../Components/CEPDados';

function numbersOnly(str){
  return str.replace(/[^\d]/g, '')
}


function translate(cepDados){
  return {
    "ESTADO": cepDados.state,
    "CIDADE": cepDados.city,
    "BAIRRO": cepDados.neighborhood,
    "LOGRADOURO": cepDados.street 
  }
}

function Pesquisa(props) {
  const goTo = props.goTo;
  const setResultado = props.setResultado;
  const [cepNumber, setCepNumber] = useState('');
  const setErrorMessage = props.setErrorMessage;
  const ticket = props.ticket;
  const [cepFavorito, setCepFavorito] = useState("");
  const [cepDados, setCepDados] = useState({});

  useEffect(()=> {
    const storedCep = localStorage.getItem("cepFavorito") || "";
    setCepFavorito(storedCep);
  },[]);


  useEffect(()=>{
    if(!cepFavorito){
      return;
    }
    localStorage.getItem("cepFavorito" , cepFavorito);
    consultarCep(cepFavorito)
      .then(resultado => setCepDados(resultado))
      .catch(error => setCepDados({"ERRO": error.message}))
  },[cepFavorito]);
  
  function handleChange(evt) {
    const value = evt.target.value
    setCepNumber(numbersOnly(value))
  }
  function clear() {
    setCepNumber('');
  }
  function handleSuccess(cepDados){
    const resultados = translate(cepDados);
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
    <input value={numbersOnly(cepNumber)} onChange={handleChange} />
    <button onClick={handleSearch}>CONSULTAR</button>
    <button onClick={handleAdicionarFavorito}>SALVAR FAVORITO</button>
    <br />
    <p>Favorito : {cepFavorito}</p>
    <CEPDados cepDados={translate(cepDados)}/>
  </>   
}

export default Pesquisa
