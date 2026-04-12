"use client";

import {useState} from "react"

export default function ElementCard({title, isSelected, onSelect}){
    return (
        <div onClick={onSelect} className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 ${isSelected ? "border-blue-500 bg-blue-50 shadow-md" : ""}`}>

        </div>
    )
}