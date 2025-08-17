import { useEffect, useState } from "react";
import { useApp } from "../store/app";
import QRCode from "qrcode";
import { Link } from "react-router-dom";
import { Page } from "../components/Page";

export default function Share(){
  const { lastAudioUrl } = useApp();
  const [dataUrl, setDataUrl] = useState<string>("");
  useEffect(()=>{
    const target = lastAudioUrl || window.location.href;
    QRCode.toDataURL(target, { margin: 1, width: 260 }).then(setDataUrl);
  }, [lastAudioUrl]);
  return (
    <Page>
      <div className="min-h-screen grid place-items-center p-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">Scan to save your clip</h2>
          {dataUrl && <img src={dataUrl} alt="QR code" className="mx-auto rounded-xl border border-neutral-800 bg-white p-2" />}
          <div className="opacity-70 text-sm">Tip: open your phone camera and point at the QR code.</div>
          <div className="space-x-3">
            <Link to="/playback" className="btn btn-ghost">Back</Link>
            <Link to="/" className="btn btn-primary">Done</Link>
          </div>
        </div>
      </div>
    </Page>
  )
}