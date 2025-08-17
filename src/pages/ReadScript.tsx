import { Page } from "../components/Page";
import { PREPARED_SCRIPT } from "../lib/data";
import { useNavigate } from "react-router-dom";

export default function ReadScript(){
  const nav = useNavigate();
  return (
    <Page>
    <div className="min-h-screen grid place-items-center p-8">
      <div className="max-w-3xl w-full">
        <p className="text-sm text-neutral-400 mb-2">Here’s a script you can read along</p>
        <div className="card whitespace-pre-wrap text-lg leading-relaxed">{PREPARED_SCRIPT}</div>
        <div className="mt-6 flex justify-end">
          <button onClick={()=>nav('/record')} className="btn btn-primary">I’m ready →</button>
        </div>
      </div>
    </div>
    </Page>
  )
}