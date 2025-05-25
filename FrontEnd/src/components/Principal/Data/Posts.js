const Posts = [
  {
    id: 1,
    user: "other",
    avatar: "JL",
    name: "Joana Lima",
    username: "@joanalima",
    date: "2025-05-25",
    timeAgo: "2h atrás",
    content: " problema de iluminação pública na Praça da Matriz",
    image: "https://jom.com.br/wp-content/uploads/2019/02/Pra%C3%A7a-Copy.jpg",
    comments: 23,
    likes: 45,
    commentsList: [
      { user: "RS", name: "Roberto Silva", time: "1h atrás", text: "Também notei esse problema! Vou apoiar seu reporte." },
      { user: "MC", name: "Maria Clara", time: "30m atrás", text: "Essa praça precisa mesmo de melhorias na iluminação, principalmente à noite." }
    ]
  },
  {
    id: 2,
    user: "other",
    avatar: "PS",
    name: "Pedro Souza",
    username: "@pedrosouza",
    date: "2025-05-24",
    timeAgo: "1 dia atrás",
    content: "Falta de sinalização na Avenida Central está causando acidentes. Precisamos de solução urgente! #TrânsitoSeguro",
    image: "https://jom.com.br/wp-content/uploads/2019/02/Pra%C3%A7a-Copy.jpg",
    comments: 8,
    likes: 32,
    commentsList: [
      { user: "AM", name: "Ana Maria", time: "20h atrás", text: "Já vi dois acidentes nesse local essa semana. Muito perigoso!" }
    ]
  },
  {
    id: 3,
    user: "me",
    avatar: "VC",
    name: "Você",
    username: "@voce",
    date: "2025-05-23",
    timeAgo: "2 dias atrás",
    content: "buraco na Rua das Flores! #AsfaltoDefeituoso",
    image: "https://jom.com.br/wp-content/uploads/2019/02/Pra%C3%A7a-Copy.jpg",
    comments: 3,
    likes: 8,
    commentsList: [
      { user: "JL", name: "Joana Lima", time: "1 dia atrás", text: "Esse buraco é perigoso mesmo, principalmente à noite!" }
    ]
  },
  {
    id: 4,
    user: "me",
    avatar: "VC",
    name: "Você",
    username: "@voce",
    date: "2025-05-20",
    timeAgo: "5 dias atrás",
    content: "Lixo acumulado no Parque Municipal há vários dias",
    image: "https://jom.com.br/wp-content/uploads/2019/02/Pra%C3%A7a-Copy.jpg",
    comments: 5,
    likes: 12,
    commentsList: [
      { user: "PS", name: "Pedro Souza", time: "4 dias atrás", text: "Realmente está muito sujo." }
    ]
  }
];

export default Posts;