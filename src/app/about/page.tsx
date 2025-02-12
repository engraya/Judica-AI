import React from 'react'
import Image from 'next/image'
import { aboutImage } from '@/assets'

function AboutPage() {
  return (
    <div className="sm:flex justify-center mx-auto items-center max-w-screen-xl">
  <div className="p-10">
    <div className="image object-center text-center">
      <Image src={aboutImage} width={250} height={250} alt='about-image'  />
    </div>
  </div>
  <div className="sm:w-1/2 p-5">
    <div className="text">
     <h1 className="my-4 font-bold text-3xl  sm:text-4xl bg-gradient-to-r from-blue-700 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text">Judica_AI</h1>
      <p className="text-gray-700">
      Judica_AI is a cutting-edge legal research tool that leverages semantic search and AI-driven indexing to help legal professionals find relevant cases faster and more accurately than traditional keyword-based searches.
      </p>
    </div>
  </div>
</div>

  )
}

export default AboutPage