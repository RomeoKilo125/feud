$(document).ready(function() {

  // reset score
  function resetScore() {
    $(`#questionScore`).text(`0`)
  }

  // load question - pick question, addAnswers
  function loadRandomQuestion() {
    resetScore()
    $(`.scoreBox`).removeClass(`hide`)
    console.log(questions.length)
    qNum = Math.floor(Math.random() * questions.length)
    question = questions[qNum]
    questions.splice(qNum, 1)
    $(`#strikeArea`).empty()
    $(`#questionArea`).text(question.q)
    addAnswers(question.a)
    console.log(question.q)
    question.a.forEach((elt, i) => {
      console.log(`${i + 1}: ${elt.content} | ${elt.value}`)
    })
  }

  function addAnswers(array) {
    let answerArea = $('#answerArea')
    answerArea.empty()
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
    console.log(`show answer: ${id + 1}`)
    let sound = new Audio(`./sounds/ff-clang.wav`)
    sound.play()
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
    let sound = new Audio(`./sounds/ff-strike.wav`)
    sound.play()
    $(`#strikeArea`).append(`<div>&times;</div>`)
  }

  $(document).keyup(e => {
    // console.log(e.key)
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
            showAnswer(9)
          } else {
            showAnswer(e.key - 1)
          }
        }
    }
  })

  function startGame() {
    resetScore()
    $('#score1').text(`0`)
    $('#score2').text(`0`)
    $('#answerArea').empty()
    $('#questionArea').empty()
    $(`#strikeArea`).empty()
    $(`#answerArea`).append(`<div id="logoBox"><img src="./images/logo.svg" alt="Windstream Logo"></div>`)
    $(`.scoreBox`).addClass(`hide`)
  }

  startGame()
  alert(
    `
    A game is already started, press the right arrow to begin with the first question.

    ***CONTROLS:***
  - Shift + S: Reset the game (does not reset all questions)
  - Right Arrow: Load a new question
  - Shift + R: Reset the question score
  - 1-0: Reveal the answer for that number (0 = answer 10)
  - Shift + 1: Assign points to Team 1
  - Shift + 2: Assign points to Team 2
  - x: STRIKE!
  - Shift + x: Reset Strikes
  - Refresh the page to refresh the list of questions.
    ***Note: If you do this, there is a chance you may see a question you've seen before.`
)

})
