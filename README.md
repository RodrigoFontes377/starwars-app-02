#  Star Wars App

Explore o universo de Star Wars com este aplicativo que consome dados diretamente da [SWAPI](https://swapi.dev/).  
Veja personagens, filmes, planetas e muito mais em uma interface visual e interativa!

---

##  Funcionalidades

- Visualização de personagens com **imagens ampliáveis**
- Modal para abrir as imagens em tamanho fixo (400x400)
- Detalhes sobre **personagens**, **filmes**, **veículos**, e **planetas**
- Scroll infinito para carregar personagens aos poucos
- Interface responsiva e com **Tailwind CSS**
- Ícones estilizados com **Lucide React**
- Feedback de carregamento com **Baby Yoda animado**

---

##  Instalação

```bash
# Clone o projeto
git clone https://github.com/RodrigoFontes377/starwars-app-02.git

# Acesse a pasta do projeto
cd starwars-app-02

# Instale as dependências (recomendado usar pnpm, mas também funciona com npm)
pnpm install
# ou
npm install

# Rode o projeto localmente (a porta será exibida no terminal, geralmente http://localhost:3000)
pnpm run dev
# ou
npm run dev

# ⚠️ Atenção:
# A API utilizada (https://swapi.dev) pode apresentar lentidão em determinados horários do dia,
# o que pode afetar o tempo de carregamento da aplicação.
