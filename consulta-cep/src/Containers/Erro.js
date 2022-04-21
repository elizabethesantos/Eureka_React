function Erro(props) {
  const goTo = props.goTo;
  return <>
    <p>Erro na Consulta</p>
    <p>{props.errorMessage}</p>
    <button onClick={() =>goTo("PESQUISA")}>VOLTAR</button>
  </>
}

export default Erro
