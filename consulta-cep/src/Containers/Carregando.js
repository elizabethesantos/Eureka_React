function Carregando(props) {
  const goTo = props.goTo;
  return <>
    <p>Carregando resultados ...</p>
    <button onClick={() =>goTo("PESQUISA")}> CANCELAR </button>
  </>
  
}

export default Carregando;