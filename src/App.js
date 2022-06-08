import React from 'react';
import './App.css';
import StarProvider from './Context/StarProvider';
import Table from './Table';

function App() {
  return (
    <StarProvider>
      <div>
        <Table />
      </div>
    </StarProvider>
  );
}

export default App;

/*
1. precisamos criar o estado global(context e provider) Ok
2. provider no app OK
3. precisa do estado data no provider Ok
4. precisa chamar a api Ok
5. o resultado da api possui a chave result, o valor de result vai ser salvo em data
6. é preciso ter uma tabela
7. o cabeçalho da tabela vai ser a chave de cada objeto
8. o corpo da tabela via ser o valor de cada objeto
*/
