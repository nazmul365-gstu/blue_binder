"use client";

import { useEffect, useRef, useState } from "react";

type QueueItem = {
  name: string;
  status: "Completed" | "Processing";
  preview?: string;
};

const steps = [
  {
    title: "Upload Image",
    subtitle: "Drop aircraft photos",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V5m0 0l-4 4m4-4l4 4M4 15.5V18a2 2 0 002 2h12a2 2 0 002-2v-2.5" />
      </svg>
    ),
  },
  {
    title: "AI Detection",
    subtitle: "OCR & type ID",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    title: "Database Lookup",
    subtitle: "Check the existing database",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    ),
  },
  {
    title: "Aircraft Result",
    subtitle: "Get all craft details",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16H13" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function IdentityPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("AirBusA30.jpg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    { name: "AirBusA30.jpg", status: "Completed" },
    { name: "Navy576.jpg", status: "Completed" },
    { name: "AirCanada.jpg", status: "Processing" },
    { name: "JetBus.jpg", status: "Completed" },
  ]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handlePickImage() {
    inputRef.current?.click();
  }

  function runProcessAndShowResult() {
    setIsProcessing(true);
    setShowResult(false);

    window.setTimeout(() => {
      setIsProcessing(false);
      setActiveStep(3);
      setShowResult(true);
      setQueueItems((prev) => prev.map((item, idx) => (idx === 0 ? { ...item, status: "Completed" } : item)));
    }, 1500);
  }

  function handleStepClick(index: number) {
    if (index === 0) {
      handlePickImage();
      return;
    }

    if (!previewUrl) return;

    if (index === 1 || index === 2) {
      setActiveStep(index);
      runProcessAndShowResult();
      return;
    }

    if (index === 3 && !isProcessing) {
      setActiveStep(3);
      setShowResult(true);
    }
  }

  function handleRemoveQueueItem(index: number) {
    setQueueItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleExportFile() {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = selectedName;
    link.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);
    setSelectedName(file.name);
    setActiveStep(1);
    setQueueItems((prev) => [{ name: file.name, status: "Processing" as const, preview: url }, ...prev].slice(0, 5));
    runProcessAndShowResult();
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <section className="rounded-md bg-[#eef1f8] p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-[18px] font-semibold text-[#11172b]">Identify Aircraft</h2>
            <p className="text-[10px] text-[#717a90]">Upload aircraft images for AI-powered analysis and registration detection.</p>
          </div>
          {showResult && (
            <button
              onClick={handleExportFile}
              className="rounded-[5px] bg-[#443fb9] px-3 py-1.5 text-[10px] font-medium text-white"
            >
              Export File
            </button>
          )}
        </div>

        {!showResult && (
          <>
            <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
              {steps.map((step, index) => (
                <div key={step.title} className="contents">
                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className={`flex items-center gap-2 rounded-[6px] px-2.5 py-2 text-left ${index === activeStep ? "bg-white" : "bg-[#e5e8f0]"}`}
                  >
                    <span className="text-[#4e5876]">{step.icon}</span>
                    <div>
                      <p className="text-[11px] font-semibold text-[#1e253d]">{step.title}</p>
                      <p className="text-[9px] text-[#8089a0]">{step.subtitle}</p>
                    </div>
                  </button>
                  {index < 3 ? <div className="hidden items-center justify-center text-[#8a94a6] md:flex">&gt;</div> : null}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[8px] border-[2px] border-dashed border-[#6e74d9] bg-transparent px-4 py-9 text-center sm:py-10">
              <div className="mx-auto grid h-9 w-9 place-items-center rounded-[8px] bg-white text-[#524eb7]">+</div>
              <h3 className="mt-4 text-[13px] font-semibold text-[#1e253d]">Upload Aircraft Images</h3>
              <p className="mx-auto mt-1 max-w-[430px] text-[10px] leading-relaxed text-[#7a849c]">
                Drop aircraft photos here or click to upload. Our AI will detect the registration number,
                identify the aircraft type, and fetch FAA data automatically.
              </p>

              <button
                onClick={handlePickImage}
                className="mt-4 rounded-[6px] bg-[#423ebd] px-6 py-2 text-[11px] font-medium text-white hover:bg-[#3532ad]"
              >
                {isProcessing ? "Processing..." : "Select Image"}
              </button>
            </div>
          </>
        )}

        {showResult && (
          <div className="mt-3 grid gap-3 lg:grid-cols-[240px_1fr]">
            <aside className="rounded-md border border-[#d8deea] bg-[#e9edf6]">
              <div className="border-b border-[#d8deea] px-3 py-2 text-[11px] font-semibold text-[#28314b]">Upload Queue</div>
              <div className="space-y-1 p-2">
                {queueItems.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex items-center gap-2 rounded-md border border-[#d6dceb] bg-[#eef1f8] p-1.5">
                    <div className="grid h-9 w-11 shrink-0 place-items-center overflow-hidden rounded bg-white text-[9px] text-[#97a0b5]">
                      {item.preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.preview} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        "IMG"
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-medium text-[#303953]">{item.name}</p>
                      <p className={`text-[9px] ${item.status === "Completed" ? "text-[#16944d]" : "text-[#55608a]"}`}>
                        {item.status}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQueueItem(index)}
                      className="text-[11px] text-[#96a0b8]"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#d8deea] p-2">
                <button onClick={handlePickImage} className="w-full rounded-md bg-[#423ebd] py-2 text-[10px] font-medium text-white">
                  Add More
                </button>
              </div>
            </aside>

            <article className="rounded-md border border-[#d8deea] bg-[#eef1f8] p-3">
              <div className="grid gap-3 md:grid-cols-[320px_1fr]">
                <div className="overflow-hidden rounded-md bg-white">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="Selected aircraft" className="h-[210px] w-full object-cover" />
                  ) : (
                    <div className="grid h-[210px] place-items-center text-[11px] text-[#8d96ad]">No Preview</div>
                  )}
                </div>

                <div>
                  <p className="text-[9px] text-[#1c9a51]">Identity Completed</p>
                  <h3 className="mt-1 text-[30px] font-semibold leading-none text-[#11172b]">Airbus A380</h3>
                  <div className="mt-3 space-y-1 text-[10px] text-[#3f4965]">
                    <p><span className="inline-block w-[120px] text-[#76809b]">Image File Name:</span> {selectedName}</p>
                    <p><span className="inline-block w-[120px] text-[#76809b]">Manufacturer:</span> Boeing</p>
                    <p><span className="inline-block w-[120px] text-[#76809b]">CMI ID:</span> N778UA</p>
                    <p><span className="inline-block w-[120px] text-[#76809b]">Common Name:</span> Triple Seven</p>
                    <p><span className="inline-block w-[120px] text-[#76809b]">Confidence Factor:</span> 100%</p>
                    <p><span className="inline-block w-[120px] text-[#76809b]">Operator:</span> United Airlines</p>
                  </div>
                  <p className="mt-4 text-[9px] text-[#6f7992]">
                    Distinctive 6-wheel main landing gear confirms it is a 777. The fuselage length with four main doors per side indicates the -200 variant.
                  </p>
                </div>
              </div>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}