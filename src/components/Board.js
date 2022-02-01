import Letter from "./Letter"

function getAccuracy(letter, index, row, splitWord, totalWord, guess) {
    const totalSplit = totalWord.split("")
    const letterLoc = splitWord.indexOf(letter)
    if (row === guess) {
        return "empty"
    } else if (splitWord[index] == letter) {
        splitWord[index] = "-"
        return "bang"
    } else if (splitWord.includes(letter) && splitWord[letterLoc] != totalSplit[splitWord.indexOf(letter)]) {
        splitWord[letterLoc] = "-"
        return "miss"
    } else if (letter == " ") {
        return "empty"
    } else {
        return "wrong"
    }
}

export default function Board(props) {
    const splitWord = props.word.split("")

    return <div className="aspect-square w-[90%] sm:w-96 pb-4">{
        props.guesses.map((guess, row) => {
            const cSplit = [...splitWord]
            const gSplit = guess.split("")
            const colors = Array.from(gSplit, (el) => el === " " || row === props.guess ? 'empty' : '')

            cSplit.forEach((el, index) => {
                if (el === gSplit[index] && colors[index] === '') {
                    colors[index] = 'bang'
                    cSplit[index] = '-'
                }
            })

            gSplit.forEach((el, index) => {
                if (colors[index] === '' && cSplit.includes(el)) {
                    colors[index] = 'miss'
                    cSplit[cSplit.indexOf(el)] = '-'
                }
            })

            colors.forEach((el, index) => colors[index] = el ? el : 'wrong')

            return <div className="flex justify-around w-full">{
                guess.split("").map((letter, index) => {
                    return <Letter color={props.color_dict[colors[index]]} letter={letter} />
                })
            }</div>
        })
    }</div>
}