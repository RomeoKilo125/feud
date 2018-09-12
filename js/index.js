$(document).ready(function() {
  console.log("ready")
  let answers = [
    '1',
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
      newdiv.text(`${answer}`)
      newdiv.attr("id", `cvr${i}`)
      newdiv.attr("class", "cover")
      answerArea.append(newdiv)
    })

  }

  addAnswers(answers)
})
