$(document).ready(function() {

// start game - reset score, load question

// 

  let answers = [
    'answer one',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ]

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

  addAnswers(answers)
})
