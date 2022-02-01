export default function Keyboard(props) {
    const keyboard = [
        'QWERTYUIOP',
        'ASDFGHJKL',
        'bZXCVBNMe',
    ]
    return <div className="w-[90%] sm:w-[30rem]">{
        keyboard.map((r) => {
            // <div className="bg-gray-200 h-10 m-1">hi</div>
            return <div className="flex ">{r.split("").map((letter) => {
                const grow = letter === letter.toUpperCase() ? 'grow' : 'grow-[1.5]'
                const text = letter === "b" ? "<=" : letter === "e" ? "Enter" : letter
                return <div onClick={() => props.onClick(text)} className={`flex leading-10 bg-gray-200 h-10 m-0.5 ${grow} rounded cursor-pointer font-bold text-center basis-0`}>
                    <p className="pointer-events-none w-full select-none">{text}</p>
                </div>
            })}</div>
        })
    }</div>
}