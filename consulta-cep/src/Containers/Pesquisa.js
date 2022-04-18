function Pesquisa(props) {
  const goTo = props.goTo;
  return <>
    <p>Qual CEP você deseja pesquisar?</p>
    <input />
    <button onClick={() =>goTo("RESULTADO") }>CONSULTAR</button>
  </>  
}

export default Pesquisa
