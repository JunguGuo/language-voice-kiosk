import { Page } from "../components/Page";
import { Link } from "react-router-dom";

export default function Ready(){
  return (
    <Page>
    <div className="h-screen grid place-items-center p-8">
      <div className="text-center space-y-6">
        <div className="text-5xl">✅</div>
        <h2 className="text-3xl font-semibold">Got it! Your voice is ready to go global.</h2>
        <Link to="/languages" className="btn btn-primary">Next →</Link>
      </div>
    </div>
    </Page>
  )
}