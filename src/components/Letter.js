export default function Letter(props) {
    return <div className={`${props.color} flex items-center m-1 w-1/6 aspect-square text-center uppercase rounded-lg border-[1px] border-gray-400`}>
        <p className={`${props.letter.trim() ? "" : "text-white"} font-bold text-xl w-full select-none`}>{props.letter.trim() ? props.letter : "."}</p>
    </div>
}