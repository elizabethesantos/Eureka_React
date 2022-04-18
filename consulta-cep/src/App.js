import logo from './logo.svg'
import './App.css'
import  Pesquisa  from './Containers/Pesquisa'
import  Carregando  from './Containers/Carregando'
import  Erro  from './Containers/Erro'
import  Resultados  from './Containers/Resultados'

import {useState} from 'react';

function App() {
  console.log('App sendo executado')

  const [nomeTela, setNomeTela] = useState("PESQUISA");

  function goTo(nomeTela) {
    console.log(`Navegando para a tela ${nomeTela}`);
    setNomeTela(nomeTela);
  }

  return <div>
    <div className="App">
      <header className="App-header">
       {nomeTela == "PESQUISA" ? <Pesquisa goTo={goTo} /> : null}
       {nomeTela == "RESULTADO" ? <Resultados goTo={goTo} result={{ "RUA" : "Rua São Paulo"}}/> : null}
       {nomeTela == "ERRO" ? <Erro goTo={goTo} errorMessage=" Não Foi possivel achar esse CEP"/> : null}
       {nomeTela == "CARREGANDO" ? <Carregando goTo={goTo}/> : null}
      </header>
    </div>
  </div>
}

export default App
