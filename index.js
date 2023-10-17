const $startGameButton    = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText       = document.querySelector(".question")
const $answersContainer   = document.querySelector(".answers-container")
const $answers            = document.querySelectorAll(".answer")
const $imagem             = document.querySelector(".image")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()

  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  if (questions[currentQuestionIndex].imagem){
    $imagem.src = questions[currentQuestionIndex].imagem
    $imagem.style.display = "block"
  } else {
    $imagem.style.display = "none"
  }
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect")
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })

  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)

  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML =
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button
      onclick=window.location.reload()
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  { /* Questão 01 */
    question: "Qual é o papel dos produtores em uma cadeia alimentar?",
    answers: [
      { text: "Consumir outros organismos;", correct: false },
      { text: "Decompor matéria orgânica;", correct: false },
      { text: "Fornecer energia para os consumidores;", correct: true },
      { text: "Prever o clima;", correct: false }
    ]
  },
  { /* Questão 02 */
    question: "Quem são os consumidores primários em uma cadeia alimentar?",
    imagem: "./herbivoro_lagarta.jpg",
    answers: [
      { text: "Herbívoros;", correct: true },
      { text: "Consumidores terciários;", correct: false },
      { text: "Produtores;", correct: false },
      { text: "Consumidores secundários;", correct: false }
    ]
  },
  { /* Questão 03 */
    question: 'Quais são os decompositores comuns em cadeias alimentares?',
    imagem: "./fungos-bacterias.jpg",
    answers: [
      { text: 'Fungos e bactérias;', correct: true },
      { text: 'Plantas;', correct: false },
      { text: 'Águias;', correct: false },
      { text: 'Leões;', correct: false }
    ]
  },
  { /* Questão 04 */
    question: 'O que aconteceria se um elo em uma cadeia alimentar fosse removido?',
    answers: [
      { text: 'A cadeia alimentar ficaria mais curta;', correct: false },
      { text: 'A cadeia alimentar se tornaria mais complexa;', correct: false },
      { text: 'A cadeia alimentar entraria em colapso;', correct: true },
      { text: 'Não teria impacto na cadeia alimentar;', correct: false }
    ]
  },
  { /* Questão 05 */
    question: 'Qual é a principal fonte de energia em uma cadeia alimentar aquática?',
    answers: [
      { text: 'Insetos;', correct: false },
      { text: 'Raios solares;', correct: true },
      { text: 'Plâncton;', correct: false },
      { text: 'Folhas de árvores;', correct: false }
    ]
  },
  { /* Questão 06 */
    question: 'Quais organismos se alimentam tanto dos produtores quanto consumidores na cadeia alimentar?',
    imagem: "./animais-onivoros.jpg",
    answers: [
      { text: 'Carnívoros;', correct: false },
      { text: 'Onívoros;', correct: true },
      { text: 'Decompositores;', correct: false },
      { text: 'Herbívoros;', correct: false }
    ]
  },
  { /* Questão 07 */
    question: 'Qual é a ordem dos níveis da cadeia alimentar?',
    imagem: "./cadeia-alimentar.jpg",
    answers: [
      { text: 'Consumidor Secundário, Consumidor Primário, Decompositor, Produtor;', correct: false },
      { text: 'Decompositor, Produtor, Consumidor Primário, Consumidor Secundário;', correct: false },
      { text: 'Consumidor Primário, Consumidor Secundário, consumidor terciário, Produtor, Decompositor;', correct: false },
      { text: 'Produtor, Consumidor Primário, Consumidor Secundário, consumidor terciário Decompositor;', correct: true },
    ]
  },
  { /* Questão 08 */
    question: 'O que é uma teia alimentar em comparação com uma cadeia alimentar?',
    imagem: "./cadeia-teia-alimentares.jpg",
    answers: [
      { text: 'É uma cadeia alimentar mais curta;', correct: false },
      { text: 'É uma cadeia alimentar mais longa;', correct: false },
      { text: 'É uma representação mais complexa das relações alimentares em um ecossistema;', correct: true },
      { text: 'É uma cadeia alimentar que não inclui produtores;', correct: false }
    ]
  },
  { /* Questão 09 */
    question: 'Quais são os principais fatores que afetam o comprimento de uma cadeia alimentar?',
    answers: [
      { text: 'Estações do ano e poluição atmosférica;', correct: false },
      { text: 'Disponibilidade de recursos e pressão predatória;', correct: true },
      { text: 'Clima e altitude;', correct: false },
      { text: 'Localização geográfica e topografia;', correct: false }
    ]
  },
  { /* Questão 10 */
    question: 'O que são detritívoros em uma cadeia alimentar?',
    imagem: "./Detritivoro.jpg",
    answers: [
      { text: 'Organismos que se alimentam de outros consumidores;', correct: false },
      { text: 'Organismos que se alimentam apenas de plantas;', correct: false },
      { text: 'Organismos que se alimentam de matéria orgânica em decomposição;', correct: true },
      { text: 'Organismos que se alimentam de produtores;', correct: false }
    ]
  },
  { /* Questão 11 */
    question: 'O que é mutualismo?',
    imagem: "./mutualismo-abelha.jpg",
    answers: [
      { text: 'Uma relação em que um organismo se beneficia sem afetar o outro;', correct: false },
      { text: 'Uma relação em que ambos os organismos são prejudicados;', correct: false },
      { text: 'Uma relação em que um organismo se beneficia e o outro é prejudicado;', correct: false },
      { text: 'Uma relação em que ambos os organismos se beneficiam;', correct: true }
    ]
  },
  { /* Questão 12 */
    question: 'Qual é o termo para uma relação em que um organismo se beneficia enquanto o outro não é afetado?',
    imagem: "./comensalismo-peixe-palhaco.jpg",
    answers: [
      { text: 'Mutualismo;', correct: false },
      { text: 'Comensalismo;', correct: true },
      { text: 'Parasitismo;', correct: false },
      { text: 'Competição;', correct: false }
    ]
  },
  { /* Questão 13 */
    question: 'O que é o parasitismo?',
    answers: [
      { text: 'Uma relação em que ambos os organismos se beneficiam;', correct: false },
      { text: 'Uma relação em que ambos os organismos são prejudicados;', correct: false },
      { text: 'Uma relação em que um organismo se beneficia e o outro é prejudicado;', correct: true },
      { text: 'Uma relação em que um organismo se beneficia sem afetar o outro;', correct: false }
    ]
  },
  { /* Questão 14 */
    question: 'O que é competição em ecologia?',
    answers: [
      { text: 'Uma luta por recursos limitados entre organismos da mesma espécie ou espécies diferentes;', correct: true },
      { text: 'Uma relação em que um organismo se beneficia e o outro é prejudicado;', correct: false },
      { text: 'Uma relação em que ambos os organismos são prejudicados;', correct: false },
      { text: 'Uma relação em que ambos os organismos se beneficiam;', correct: false }
    ]
  },
  { /* Questão 15 */
    question: 'Qual é o resultado típico da competição intensa entre duas espécies competidoras que ocupam o mesmo nicho ecológico?',
    answers: [
      { text: 'Coexistência pacífica;', correct: false },
      { text: 'Simbiose;', correct: false },
      { text: 'Extinção de uma das espécies;', correct: true },
      { text: 'Mutualismo;', correct: false }
    ]
  },
  { /* Questão 16 */
    question: 'O que é um predador?',
    answers: [
      { text: 'Um organismo que se beneficia de uma relação mutualista;', correct: false },
      { text: 'Um organismo que fornece recursos para outros organismos;', correct: false },
      { text: 'Um organismo que se alimenta apenas de plantas;', correct: false },
      { text: 'Um organismo que se alimenta de outros organismos;', correct: true }
    ]
  },
  { /* Questão 17 */
    question: 'Qual é o resultado típico de uma relação de predação?',
    answers: [
      { text: 'Ambos os organismos se beneficiam;', correct: false },
      { text: 'A presa se beneficia, enquanto o predador é prejudicado;', correct: false },
      { text: 'O organismo predador se beneficia, enquanto a presa é morta;', correct: true },
      { text: 'Ambos os organismos são prejudicados;', correct: false }
    ]
  },
  { /* Questão 18 */
    question: 'O que é mimetismo?',
    imagem: "./mimetismo-cobra-coral-4d.jpg",
    answers: [
      { text: 'Uma forma de competição entre espécies;', correct: false },
      { text: 'Uma forma de um organismo se assemelhar a outro para ganhar proteção ou vantagem;', correct: true },
      { text: 'Uma forma de mutualismo;', correct: false },
      { text: 'Uma forma de predador se camuflar;', correct: false }
    ]
  },
  { /* Questão 19 */
    question: 'Qual é uma característica comum das sociedades de insetos, como abelhas, formigas e cupins?',
    imagem: "./formigas_643501.jpg",
    answers: [
      { text: 'União permanente entre indivíduos e divisão de trabalho;', correct: true },
      { text: 'Migração sazonal em busca de alimento;', correct: false },
      { text: 'Isolamento individual e vida solitária;', correct: false },
      { text: 'Ausência de comunicação e cooperação entre os membros;', correct: false }
    ]
  },
  { /* Questão 20 */
    question: 'O que é inquilinismo',
    imagem: "./Inquilinismo.jpg",
    answers: [
      { text: 'Uma relação simbiótica em que um organismo beneficia o outro, enquanto o hospedeiro não sofre nenhum efeito;', correct: false },
      { text: 'Uma relação em que um organismo se beneficia ao viver em associação com outro organismo, sem prejudicá-lo;', correct: true },
      { text: 'Um tipo de mutualismo onde duas espécies trocam recursos de maneira recíproca;', correct: false },
      { text: 'Uma forma de competição entre duas espécies pelo mesmo recurso em um ecossistema;', correct: false }
    ]
  },
]
