export default function Keyboard(props) {
    const keyboard = [
        'QWERTYUIOP',
        'ASDFGHJKL',
        'bZXCVBNMe',
    ]

    const splitWord = props.word.split('')
    const guesses = Array.from(props.guesses, (el, index) => index === props.guess ? "" : el).join('').split('')

    const bangs = guesses.map((el, index) => {
        const loc = index % 5
        if (splitWord[loc] === el) {
            return el
        }
        return ''
    })

    const misses = []
    const wrongs = []

    guesses.map((el, index) => {
        if (splitWord.includes(el)) {
            misses.push(el)
        } else {
            wrongs.push(el)
        }
        return
    })

    return <div className="w-[90%] sm:w-[30rem]">{
        keyboard.map((r, i) => {
            // <div className="bg-gray-200 h-10 m-1">hi</div>
            return <div key={i} className="flex ">{r.split("").map((letter, j) => {
                const grow = letter === letter.toUpperCase() ? 'grow' : 'grow-[1.5]'
                const text = letter === "b" ? "<=" : letter === "e" ? "Enter" : letter
                let color = props.color_dict['keyboard']
                if (bangs.includes(text)) {
                    color = props.color_dict['bang']
                } else if (misses.includes(text)) {
                    color = props.color_dict['miss']
                } else if (wrongs.includes(text)) {
                    color = props.color_dict['wrong']
                }
                return <div key={j} onClick={() => props.onClick(text)} className={`flex leading-10 ${color} h-10 m-0.5 ${grow} rounded cursor-pointer font-bold text-center basis-0`}>
                    <p className="pointer-events-none w-full select-none">{text}</p>
                </div>
            })}</div>
        })
    }</div>
}