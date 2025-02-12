import React from 'react'

type DescriptionwModalProps = {
    document: {
        metadata: {
          title: string;
          plaintiff: string;
          defendant: string;
          date: string;
          topic: string;
          outcome: string;
          pageContent: string;
        };
        content: string;
      };
      quote: string;
    onClose: () => void;
  };

function DescriptionModal({ onClose, document, quote,  } : DescriptionwModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center p-4 justify-center bg-[#9c9ea8] bg-opacity-50 transition duration-700 ease-in-out">
<div className="w-full max-w-[600px] pb-8 bg-white rounded-xl flex-col justify-start items-start inline-flex">
    <div className="self-stretch px-4 pt-6 pb-3 bg-[#d2d4dd] rounded-tl-xl rounded-tr-xl border-b border-[#dcdfea] justify-center items-center gap-2.5 inline-flex">
        <div className="grow shrink basis-0 text-[#202b3c] text-lg font-bold  leading-[27px]">Case Details</div>
        <div onClick={onClose} className="w-[27.26px] cursor-pointer h-[27px] px-[2.27px] py-[2.25px] justify-center items-center flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.45232 0.249023H16.2995C20.1498 0.249023 22.728 2.92652 22.728 6.90902V16.1014C22.728 20.0726 20.1498 22.749 16.2995 22.749H6.45232C2.60203 22.749 0.0124512 20.0726 0.0124512 16.1014V6.90902C0.0124512 2.92652 2.60203 0.249023 6.45232 0.249023ZM14.789 14.8743C15.1752 14.493 15.1752 13.8742 14.789 13.4917L12.7673 11.4892L14.789 9.48559C15.1752 9.10422 15.1752 8.47422 14.789 8.09172C14.4028 7.70809 13.7782 7.70809 13.3806 8.09172L11.3703 10.0931L9.34861 8.09172C8.95109 7.70809 8.32641 7.70809 7.94025 8.09172C7.55408 8.47422 7.55408 9.10422 7.94025 9.48559L9.96194 11.4892L7.94025 13.4805C7.55408 13.8742 7.55408 14.493 7.94025 14.8743C8.13333 15.0656 8.39456 15.168 8.64443 15.168C8.90566 15.168 9.15553 15.0656 9.34861 14.8743L11.3703 12.8842L13.392 14.8743C13.5851 15.078 13.8349 15.168 14.0848 15.168C14.346 15.168 14.5959 15.0656 14.789 14.8743Z" fill="#6E7180"/>
            </svg>
        </div>
    </div>
    <div className="self-stretch px-8 pt-8 pb-6 flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <h1 className="text-2xl font-bold text-indigo-900 mt-2">{document.metadata.title}</h1>
            </div>
            <div className="mt-1">
          <span className="font-semibold text-indigo-900">Topic:</span> {document.metadata.topic}
        </div>
        <div className="mt-1">
          <span className="font-semibold text-indigo-900">Verdict:</span> {document.metadata.outcome}
        </div>
        <div className="mt-1">
          <span className="font-semibold text-indigo-900">Year:</span> {new Date(document.metadata.date).toLocaleDateString()}
        </div>
        <div className="mt-1">
          <span className="font-semibold text-indigo-900">{document.metadata.pageContent}</span>
        </div>
        </div>
    </div>
</div>
</div>
  )
}

export default DescriptionModal