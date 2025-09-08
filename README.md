# To-Do List: Desafio React com TypeScript

## Sobre o Projeto

Este projeto é uma aplicação de lista de tarefas (To-Do List) desenvolvida como um desafio para praticar e consolidar conceitos fundamentais do ReactJS com TypeScript. A aplicação permite que os usuários criem, concluam e excluam tarefas, além de fornecer um feedback visual imediato sobre o total de tarefas criadas e o número de tarefas concluídas.

O objetivo principal foi construir uma interface limpa e funcional, aplicando boas práticas de componentização, gerenciamento de estado e tipagem estática.

## Tecnologias Utilizadas

As seguintes tecnologias e bibliotecas foram utilizadas na construção deste projeto:

- **React:** Biblioteca principal para a construção da interface de usuário.
- **TypeScript:** Para adicionar tipagem estática ao JavaScript, garantindo um código mais robusto e com menos bugs.
- **Vite:** Ferramenta de build moderna e extremamente rápida para o desenvolvimento frontend.
- **CSS Modules:** Para escopar os estilos CSS localmente por componente, evitando conflitos de nomes de classes.
- **Phosphor Icons:** Biblioteca de ícones utilizada para enriquecer a interface.

---

## Estrutura de Componentes

A aplicação foi dividida em componentes reutilizáveis e com responsabilidades bem definidas, facilitando a manutenção e a escalabilidade do código.

- `App`: O componente principal que orquestra toda a aplicação. Ele contém a lógica de negócio, gerencia o estado das tarefas e conecta todos os outros componentes.

- `Header`: Um componente simples e visual, responsável por exibir o cabeçalho e o logotipo da aplicação.

- `Input`: Componente de entrada de texto customizado, utilizado para que o usuário digite o nome de uma nova tarefa.

- `Button`: Componente de botão reutilizável, usado para o envio do formulário de criação de tarefa.

- `Item`: Representa uma única tarefa na lista. Este componente é responsável por exibir o texto da tarefa, um checkbox para marcar como concluída e um botão para exclusão.

- `Empty`: Um componente visual exibido condicionalmente quando a lista de tarefas está vazia.

### Comunicação entre Componentes

A comunicação segue o fluxo unidirecional do React. O componente `App` detém o estado e a lógica, passando-os para os componentes filhos via **props**.

- O componente `App` passa os dados de cada tarefa (`data={task}`) para o componente `Item`.
- Funções como `removeTask` e `toggleTaskStatus` também são passadas como props para o `Item`, permitindo que o componente filho comunique eventos de volta para o componente pai para que o estado principal seja atualizado.

## Gerenciamento de Estado (`useState`)

O gerenciamento de estado da aplicação é realizado com o hook `useState` do React para controlar os dados que mudam ao longo do tempo.

1.  **Armazenamento da Lista de Tarefas:** Um estado foi criado para guardar um array com todos os objetos de tarefas.

    ```typescript
    const [tasks, setTasks] = useState<ITask[]>([]);
    ```

2.  **Controle do Input:** Um segundo estado foi utilizado para controlar o valor atual do campo de texto onde o usuário digita uma nova tarefa.

    ```typescript
    const [inputName, setInputName] = useState("");
    ```

Além disso, os contadores de tarefas criadas e concluídas são **estados derivados**, calculados diretamente a partir do estado `tasks` a cada renderização, o que garante que eles estejam sempre sincronizados sem a necessidade de um estado próprio.

```typescript
const tasksCount = tasks.length;
const completedCount = tasks.filter((t) => t.isChecked).length;
```

## Tipagem com TypeScript

Para garantir a integridade dos dados e aproveitar os benefícios da verificação estática de tipos, o TypeScript foi utilizado para definir a "forma" de um objeto de tarefa. Criei a interface ITask para representar cada item da lista.

Isso assegura que todo objeto de tarefa na aplicação terá sempre as propriedades id, text e isChecked com os tipos corretos, evitando erros comuns.

TypeScript

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}
Essa interface é então utilizada na declaração do estado tasks, como visto na seção anterior.

## Efeitos Colaterais (useEffect)**

Nesta aplicação, o hook useEffect não foi necessário.

O motivo é que todos os "efeitos" da aplicação são respostas diretas a eventos do usuário (adicionar, remover ou alterar uma tarefa). Não há necessidade de sincronizar com APIs externas, manipular o DOM manualmente fora do fluxo do React ou configurar subscriptions. As atualizações de estado via useState já são suficientes para garantir que a interface seja renderizada novamente com os dados corretos após cada interação do usuário.