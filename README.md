# calculos-front

Frontend do sistema de admissões desenvolvido em **Next.js com TypeScript**, integrado a uma API REST em **Spring Boot**.

## 🔧 Funcionalidades
- Página para criação de novos cálculos
- Listagem paginada e com filtro dos resultados
- Integração com API via Axios
- Validação de formulários com React Hook Form + Zod

## 🚀 Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/calculos-front.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` na raiz com:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8081
   ```

4. Inicie a aplicação:
   ```bash
   npm run dev
   ```

5. Acesse as páginas:
   - [`/calculo`](http://localhost:3000/calculo): formulário para novo cálculo
   - [`/list`](http://localhost:3000/list): listagem de resultados

## 📁 Estrutura do Projeto

```
/app
  /calculo         # Página para novo cálculo
  /list            # Página de listagem
/components
  Api.ts           # Funções para requisições HTTP
  CalculoForm.tsx  # Componente de formulário
  ResultsTable.tsx # Componente de tabela de resultados
/lib
```

## 📦 Tecnologias

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Axios](https://axios-http.com/)

## 🔗 Backend relacionado

O backend está disponível em: [https://github.com/reinaldojun/admissao](https://github.com/reinaldojun/admissao)
