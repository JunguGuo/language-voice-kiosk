export function LangItem({active, label}:{active?:boolean,label:string}){
  return (
    <div className={"px-4 py-3 border-b border-neutral-800 flex items-center justify-between " + (active ? "text-white" : "text-neutral-400")}>
      <span className="text-xl">{label}</span>
      {active && <span className="text-xs bg-white text-black px-2 py-1 rounded-full">Selected</span>}
    </div>
  )
}