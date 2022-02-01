import Letter from "./Letter"

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

            return <div key={`${row}`} className="flex justify-around w-full">{
                guess.split("").map((letter, index) => {
                    return <Letter key={`${index}`} color={props.color_dict[colors[index]]} letter={letter} />
                })
            }</div>
        })
    }</div>
}