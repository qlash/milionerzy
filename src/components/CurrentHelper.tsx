import { CurrentHelperType } from './CurrentHelperType'
import './CurrentHelper.scss'

function CurrentHelper(props: CurrentHelperType) {
  const chance = (12 - (props.current || 0)) * 5 + Math.floor(Math.random() * 35)
  let text = <></>

  if (props.helper === 'fifty') {
    text = <div className='helper'>Usuwam dwie błędne odpowiedzi...</div>
  }

  if (props.helper === 'crowd' && props.question && props.currentQuestion) {
    let sum = 0
    const answers = props.question.a.reduce<{[key: string]: number}>((acc, a, index) => {
      const percent = index === 0 ? chance : index === 3 ? 100 - sum : Math.floor(Math.random() * (100 - sum))

      sum += percent
      acc[a] = percent
      return acc
    }, {})

    const sortedAnswers = props.currentQuestion.a.map(a => answers[a])

    text = <div className='chart'>
      {sortedAnswers.map((answer, i) =>
        <div className='chart-answer' key={i}>
          <div className='chart-percent'>{answer}%</div>
          <div className='chart-content'>
            <div className='chart-item' style={{ height: `${answer}%` }}></div>
          </div>
          <div className='chart-letter'>{String.fromCharCode(65 + i)}</div>
        </div>
      )}
    </div>
  }

  if (props.helper === 'phone') {
    const answer = Math.floor(Math.random() * 100) <= chance ? 0 : Math.floor(Math.random() * 3 + 1)

    let content = ''

    if (chance < 20) {
      content = 'Niestety nie znam się na tym, moge tylko strzelać, więc strzelam że '
    } else if (chance < 40) {
      content = 'Coś o tym słyszałem, nie jestem pewny ale myślę, że prawidłowa odpowiedź to'
    } else if (chance < 60) {
      content = 'Nie jestem pewny, ale postawiłbym na'
    } else if (chance < 80) {
      content = 'Wg mojej wiedzy, poprawna odpowiedź to'
    } else if (chance < 90) {
      content = 'Jestem niemal pewny że prawidłowa odpowiedź to'
    } else {
      content = 'Prawidłowa odpowiedź to'
    }

    text = <div className='helper'>{content} &#34;{props.question?.a[answer]}&#34;</div>
  }

  return text
}

export default CurrentHelper
