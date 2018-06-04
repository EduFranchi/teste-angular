## Programador Frontend (Angular)

# Instruções

    Esse teste é público. Todos os interessados que fizerem pull request receberão um feedback da equipe Theòs Sistemas
    
    1. Faça um fork deste repositório;
    2. Crie uma branch com o seu nome.
    2. Adicione seu currículo na raiz do repositório.
    3. Envie-nos o PULL-REQUEST para que seja avaliado.
    
### O Teste

O teste consiste em implementar um formulário em angular para cadastro de profissão que irá se comunicar com uma API.
O desenvolvimento precisa contemplar as 4 operações de CRUD, ou seja, inserir, selecionar, alterar e excluir um registro. OS campos que compõe esse formulário são:

    Nome
	Sobrenome
	Email
	Sexo
	Data (Data do cadastro)
	Cidade
	Estado
	Área de formação
	Profissão


### Algumas regras do formulário

* Campos Sexo, Estado, Cidade e Profissão devem ser um Select com as opções para escolha.
* De acordo com a escolha no campo Estado, alterne entre listas diferentes de cidade. (min 2 estados)
* Garantir que o campo E-mail receba apenas emails válidos.
* Na tela de busca, realizar a busca por rofissão ou Nome completo
* Ainda na tela de busca, deve conter um botão "selecionar" para devolver o registro selecionado para a tela de cadastro em estado de 'Visualização" ou seja, todos os campos bloqueados para edição. Apenas quando clicarmos em "Alterar" os campos deverão ser desabilitados e permitindo então, editar os dados e salvar novamente.
* Ao editar, salvar ou excluir um registro, atualizar a lista de registros para que na tela de busca, os dados estejam atualizados conforme a ação tomada na tela anterior.


### Esperamos que:

* Utilize as boas praticas do html 5 e que seja fiel a ele.
* Siga todas as regras descritas a cima.
* Usando  o GULP ou GRUNT, minifique seu HTML, CSS e JS (obs: faça commit também dos arquivos não minificados)
* Valide os campos do formulário
* Certifique-se que a aplicação esteja rodando antes de nos enviar o pull-request


### Você pode:

* Utilizar qualquer framework CSS (Bootstrap, Material ...)
* Utilizar componentes do Bower ou NPM


### Ganhe pontos

* Deixando a aplicação responsiva.
* Utilizando SASS ou LESS.
* Utilizando interfaces (Typescript)
* Considerando que essa aplicação pode evoluir, crie um "base-component" para que possa ser herdado com seus métodos padrões.
* Adicionando um "loader" em cada interação para avisar o usuário que os dados estão sendo carregados ou atualizados.
* Utilize modal para a tela de BUSCA.


### Nos surpreenda

* Ao invés de consumir um arquivo .json local para manipulação dos dados, implemente uma API HTTP REST simples, em NodeJS e disponibilize os mesmos dados para consulta, porém via API.


### Algumas observações:

    1. Armazene seus arquivos .json dentro da pasta JSON criado dentro do projeto.
    2. A versão do Angular instalado é: 6.0.2
