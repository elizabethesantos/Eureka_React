function Resultados(props) {
  const result = props.result;
  const goTo = props.goTo;
  const keys = Object.keys(result);
  const elements = keys.map(key => (
    <span key={key}><b>{keys}: </b>{result[key]}</span>
  ))
  return <>      
    <p>Resultados para o CEP 16075-420</p>
    {elements}
    <button onClick={() => goTo("PESQUISA")}>NOVA CONSULTA</button>
  </>  
}
/*
<span><b>RUA:</b>Rua São Paulo</span>
<span><b>CIDADE:</b>Maringá</span>
*/
export default Resultados;
