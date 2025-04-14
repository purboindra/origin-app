"use client"

import { Plus } from "lucide-react"

export default function CalorOptionsForm(){
    return         <div className="flex flex-col space-y-1">
    <h1 className="text-xl font-medium text-blue-800/50">
      Warna Tersedia
    </h1>
    <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
      <Plus className="w-6 h-6 text-white" />
    </div>
  </div>
}