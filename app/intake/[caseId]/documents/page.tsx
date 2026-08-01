"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {

    OnboardingService,

    RequiredDocument

} from "@/services/intake-service";

export default function DocumentPage() {

    const router = useRouter();

    const params = useParams();

    const caseId = Number(params.caseId);

    const [loading,setLoading]=useState(true);

    const [saving,setSaving]=useState(false);

    const [documents,setDocuments]=useState<RequiredDocument[]>([]);

    const [files,setFiles]=useState<Record<number,File>>({});

    const [uploading,setUploading]=useState<Record<number,boolean>>({});


    useEffect(()=>{

        loadDocuments();

    },[]);
    async function loadDocuments(){

    try{

        const docs=

        await OnboardingService.requiredDocuments(

            caseId

        );

        setDocuments(docs);

    }

    catch(e){

        toast.error(

            e instanceof Error

            ?e.message

            :"Unable to load documents"

        );

    }

    finally{

        setLoading(false);

    }

}
function chooseFile(

    id:number,

    file:File|null

){

    if(!file)return;

    setFiles({

        ...files,

        [id]:file

    });

}
async function uploadDocument(id: number) {

    const file = files[id];

    if (!file) {

        toast.error("Choose a file");

        return;

    }

    setUploading({

        ...uploading,

        [id]: true

    });

    try {

        await OnboardingService.uploadDocument(

            caseId,

            id,

            file

        );

        toast.success("Document uploaded successfully");

        // Refresh documents from backend
        // so doc.uploaded becomes true

        await loadDocuments();

    }

    catch (e) {

        toast.error(

            e instanceof Error

                ? e.message

                : "Upload failed"

        );

    }

    finally {

        setUploading({

            ...uploading,

            [id]: false

        });

    }

}
async function submit() {

    setSaving(true);

    try {

        const validation =

            await OnboardingService.validateDocuments(caseId);

        if (!validation.valid) {

            toast.error(validation.message);

            return;

        }



        await OnboardingService.submitCase(caseId);

        toast.success("Application submitted successfully.");

        router.push(`/intake/${caseId}/success`);

        const submission = await OnboardingService.submitCase(caseId);

        toast.success("Application submitted successfully.");

        const params = new URLSearchParams({
            referralCode: submission.referralCode,
            referralLink: submission.referralShareUrl,
        });

        router.push(`/intake/${caseId}/success?${params.toString()}`);

    }

    catch (e) {

        toast.error(

            e instanceof Error

                ? e.message

                : "Unable to submit application"

        );

    }

    finally {

        setSaving(false);

    }

}
return (
  <>
    <Navbar />

    <main className="min-h-screen bg-[#f7faf9] text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-cyan-400 uppercase tracking-widest">
          Secure Upload
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Upload Required Documents
        </h1>

        <p className="mt-3 text-slate-400">
          Upload every required document. Once everything is uploaded,
          submit your application for CA review.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8">
          {loading ? (
            <div className="space-y-4">
              <div className="h-12 animate-pulse rounded bg-slate-100" />
              <div className="h-12 animate-pulse rounded bg-slate-100" />
              <div className="h-12 animate-pulse rounded bg-slate-100" />
            </div>
          ) : (
            <div className="space-y-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-xl border border-slate-200 bg-[#f7faf9] p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {doc.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {doc.mandatory
                          ? "Required Document"
                          : "Optional Document"}
                      </p>
                    </div>

                    {doc.uploaded ? (
                      <span className="rounded-lg bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                        ✓ Uploaded
                      </span>
                    ) : (
                      <span className="rounded-lg bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-400">
                        Pending
                      </span>
                    )}
                  </div>

                  <input
                    type="file"
                    className="mt-5 block w-full rounded-lg border border-slate-200 bg-white p-3"
                    onChange={(e) =>
                      chooseFile(
                        doc.id,
                        e.target.files?.[0] ?? null
                      )
                    }
                  />

                  {files[doc.id] && (
                    <p className="mt-2 text-sm text-cyan-400">
                      Selected: {files[doc.id].name}
                    </p>
                  )}

                  <button
                    className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={
                      uploading[doc.id] ||
                      doc.uploaded
                    }
                    onClick={() => uploadDocument(doc.id)}
                  >
                    {uploading[doc.id]
                      ? "Uploading..."
                      : doc.uploaded
                      ? "Already Uploaded"
                      : "Upload Document"}
                  </button>
                </div>
              ))}

              <button
                className="mt-8 w-full rounded-xl bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400 disabled:opacity-50"
                disabled={saving}
                onClick={submit}
              >
                {saving
                  ? "Submitting..."
                  : "Submit Application"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>

    <Footer />
  </>
);
}