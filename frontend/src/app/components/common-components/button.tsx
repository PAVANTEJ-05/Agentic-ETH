const Button = ({text, onClick} : {text:string}) => {
  return (
    <button className="rounded-xl px-4 py-2 bg-blue-500 text-white" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;