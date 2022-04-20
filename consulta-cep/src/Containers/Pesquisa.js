import {useState} from 'react'
import consultarCep from 'cep-promise'

function numbersOnly(str){
  return str.replace(/[^\d]/g, '')
}

function Pesquisa(props) {
  const goTo = props.goTo;
  const setResultado = props.setResultado;
  const [cepNumber, setCepNumber] = useState('');
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
    goTo("CARREGANDO");
    consultarCep(cepNumber)
      .then(handleSuccess)
      .catch(handleError)
  }
  return <>
    <p>Qual CEP você deseja pesquisar?</p>
    <p>Estado atual : {cepNumber}</p>
    <input value={numbersOnly(cepNumber)} onChange={handleChange} />
    <button onClick={clear}>LIMPAR STATE</button>
    <button onClick={handleSearch}>CONSULTAR</button>
  </>  
}

export default Pesquisa
