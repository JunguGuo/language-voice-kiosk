export function RecLight({ recording=false }: { recording?: boolean }){
  return (
    <div className="inline-flex items-center gap-3">
      <span className={"h-4 w-4 rounded-full " + (recording ? "bg-red-500 animate-pulse" : "bg-neutral-600")} />
      <span className="text-sm opacity-80">{recording ? "Recording..." : "Ready"}</span>
    </div>
  )
}