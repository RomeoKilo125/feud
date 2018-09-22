$(document).ready(function() {

  // reset score
  function resetScore() {
    $(`#questionScore`).text(`0`)
  }

  // load question - pick question, addAnswers
  function loadRandomQuestion() {
    console.log(questions.length)
    qNum = Math.floor(Math.random() * questions.length)
    question = questions[qNum]
    questions.splice(qNum, 1)
    console.log(question)
    $(`#questionArea`).text(question.q)
    addAnswers(question.a)
  }

  function addAnswers(array) {
    let answerArea = $('#answerArea')
    $('#answerArea').empty()
    array.forEach(function(answer, i) {
      let newdiv = $('<div>')
      newdiv.attr("id", `ans${i}`)
      newdiv.attr("data-id", `${i}`)
      newdiv.addClass("hide answer")
      let answerContent = $('<div>').text(`${answer.content}`).addClass("answerContent")
      let answerValue = $('<div>').text(`${answer.value}`).addClass("answerValue").attr("id", `val${i}`)
      newdiv.append(answerContent, answerValue)
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
    // add score
    let currScore = parseInt($(`#questionScore`).text())
    let qScore = parseInt($(`#val${id}`).text())
    $(`#questionScore`).text(currScore + qScore)
  }

  function addTeamPoints(team) {
    let currScore = parseInt($(`#score${team}`).text())
    let qScore = parseInt($(`#questionScore`).text())
    $(`#score${team}`).text(currScore + qScore)
    $(`#questionScore`).text(0)
  }

  function strike() {
    $(`#strikeArea`).append(`<div>&times;</div>`)
  }

  // $(document).on("click", ".cover", function() {
  //   let id = $(this).attr("data-id")
  //   showAnswer(id)
  // })

  $(document).keyup(e => {
    console.log(e.key)
    switch (e.key) {
      case 'R':
        resetScore()
        break;
      case 'ArrowRight':
        loadRandomQuestion()
        break;
      case 'S':
        startGame()
        break;
      case 'x':
        strike()
        break;
      case 'X':
        $(`#strikeArea`).empty()
        break;
      case '!':
        addTeamPoints(1)
        break;
      case '@':
        addTeamPoints(2)
        break;
      default:
        if (e.key.match(/\d/gi)) {
          if (e.key === `0`) {
            showAnswer(10)
          } else {
            showAnswer(e.key - 1)
          }
        }
    }
  })

  // start game - reset score, load question
  function startGame() {
    resetScore()
    $('#score1').text(`0`)
    $('#score2').text(`0`)
    $('#answerArea').empty()
    $('#questionArea').empty()
  }


  startGame()

})
