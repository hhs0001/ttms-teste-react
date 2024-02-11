# Nome do Projeto

Este é um projeto React que inclui um servidor backend express e utiliza várias bibliotecas, como Redux para gerenciamento de estado, axios para chamadas de API, e outras.

## Baixar e Instalar o Projeto

Para baixar e instalar o projeto, siga os passos abaixo:

1. Clone o repositório para a sua máquina local usando `git clone`.
2. Navegue até a pasta do projeto e instale as dependências usando o comando `npm install`.

## Iniciar o Servidor

O servidor backend deste projeto está localizado em `/backend/server.js`. Para iniciar o servidor, siga os passos abaixo:

1. Navegue até a pasta do projeto.
2. Execute o comando `npm run server`. Isso iniciará o servidor backend usando o nodemon, que irá reiniciar automaticamente o servidor sempre que houver uma alteração no arquivo `server.js`.

## Mudar as Configurações

As configurações do projeto estão localizadas no arquivo `config.json` na raiz do projeto. Este arquivo contém várias configurações, como a porta do servidor e as credenciais do usuário.

Para alterar as configurações, abra o arquivo `config.json` em um editor de texto e modifique os valores conforme necessário. Por exemplo, para alterar a porta do servidor, você pode modificar o valor de `Port`.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer alterações no código.\
Você também verá quaisquer erros de lint no console.

### `npm test`

Inicia o executor de testes no modo de observação interativo.\
Veja a seção sobre [executando testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Compila o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a construção para obter o melhor desempenho.

A construção é minificada e os nomes dos arquivos incluem os hashes.\
Seu aplicativo está pronto para ser implantado!

Veja a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

### `npm run eject`

**Nota: esta é uma operação unidirecional. Uma vez que você `eject`, você não pode voltar!**

Se você não estiver satisfeito com a ferramenta de construção e as opções de configuração, você pode `eject` a qualquer momento. Este comando removerá a dependência de construção única do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc) diretamente para o seu projeto para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, ainda funcionarão, mas eles apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você está por conta própria.

Você não precisa usar `eject`. O conjunto de recursos curados é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usar este recurso. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estiver pronto para isso.