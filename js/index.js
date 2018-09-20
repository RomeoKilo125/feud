$(document).ready(function() {

// reset score
function resetScore() {
  $(`#scoreBox`).text(`0`)
}
// load question - pick question, addAnswers
function loadRandomQuestion() {
  qNum = Math.floor(Math.random() * questions.length)
  question = questions[qNum]
  questions.splice(qNum, 1)
  console.log(question)
  $(`#questionArea`).text(question.q)
  addAnswers(question.a)
}

  function addAnswers(array) {
    let answerArea = $('#answerArea')
    array.forEach(function(answer, i) {
      let newdiv = $('<div>')
      newdiv.attr("id", `ans${i}`)
      newdiv.attr("data-id", `${i}`)
      newdiv.addClass("hide answer")
      newdiv.text(`${answer}`)
      let coverdiv = $(`<div>`)
      coverdiv.attr("id", `cvr${i}`)
      coverdiv.attr("data-id", `${i}`)
      coverdiv.addClass("cover")
      coverdiv.text(`${i + 1}`)
      answerArea.append(coverdiv)
      answerArea.append(newdiv)
    })
  }

  function showAnswer(id) {
    console.log(`show answer ${id}`)
    $(`#cvr${id}`).addClass("hide")
    $(`#ans${id}`).removeClass("hide")
  }

  $("body").on("click", ".cover", function() {
    let id = $(this).attr("data-id")
    showAnswer(id)
  })

  // start game - reset score, load question
  function startGame() {
    resetScore()
    loadRandomQuestion()
  }


loadRandomQuestion()

})
