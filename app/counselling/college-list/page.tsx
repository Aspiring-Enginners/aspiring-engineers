"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Building, Trophy, Navigation, Building2, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import collegeData from "../../../college_data.json";

// Helper to reliably load Google Drive images
function getDriveMediaUrl(url?: string) {
  if (!url || !url.includes('drive.google.com')) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // using thumbnail endpoint solves the CORS/iframe blocking issues
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
}

export default function CollegeListPage() {
  const { carouselColleges, westBengalPrivateColleges, allIndiaPrivateColleges, allColleges } = collegeData;
  const [searchQuery, setSearchQuery] = useState("");

  const tickerColleges = [...carouselColleges, ...carouselColleges, ...carouselColleges];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredWB = westBengalPrivateColleges.filter(c => c.name.toLowerCase().includes(searchQuery) || c.shortName.toLowerCase().includes(searchQuery));
  const filteredIndia = allIndiaPrivateColleges.filter(c => c.name.toLowerCase().includes(searchQuery) || c.shortName.toLowerCase().includes(searchQuery));
  const filteredAll = allColleges.filter(c => c.name.toLowerCase().includes(searchQuery) || c.location.toLowerCase().includes(searchQuery));

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,150,190,0.16),transparent_48%),linear-gradient(180deg,rgba(96,223,255,0.12),transparent_32%)]" />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)] mb-3">
            Counselling College List
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Top Private Engineering Colleges
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the best institutions across West Bengal and India, helping you make the right choice for your future career.
          </p>
        </section>

        {/* Carousel Section -> Larger Hero-style Cards */}
        <section className="max-w-[100rem] mx-auto pb-12">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navigation className="w-5 h-5" />
            Featured Top Colleges
          </div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
            <ul className="flex w-max min-w-full flex-nowrap gap-6 animate-scroll hover:[animation-play-state:paused] py-4 px-4">
              {tickerColleges.map((college, index) => (
                <li
                  key={`${college.id}-${index}`}
                  className="shrink-0 w-[300px] md:w-[400px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group block"
                >
                  <Link
                    href={`/counselling/college/${college.id}`}
                    className="block relative h-[180px] md:h-[220px] w-full"
                  >
                    {college.image && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                        style={{ backgroundImage: `url(${getDriveMediaUrl(college.image)})` }} 
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                       <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                         {college.seats} Seats
                       </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-md leading-tight mb-1">
                          {college.shortName}
                        </h3>
                        <p className="text-gray-200 text-xs font-medium drop-shadow-md flex items-center gap-1">
                           <MapPin className="w-3.5 h-3.5" />
                           {college.location}
                        </p>
                      </div>
                      {college.logo && (
                        <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden shadow-md flex-shrink-0">
                          <img 
                            src={getDriveMediaUrl(college.logo)} 
                            alt={college.shortName} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2x3 Grid Sections Container */}
        <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
          
          {/* Section 1: West Bengal Colleges */}
          {(filteredWB.length > 0) && (
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Top West Bengal Private Colleges
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Premier institutions in WB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWB.map((college) => (
                  <Link
                    key={college.id}
                    href={`/counselling/college/${college.id}`}
                    className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-[320px]"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                     {college.image && (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                          style={{ backgroundImage: `url(${getDriveMediaUrl(college.image)})` }} 
                        />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                     <div className="absolute top-3 right-3">
                       <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                         {college.seats} Seats
                       </span>
                     </div>
                     <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                       <span className="text-white font-extrabold text-xl tracking-tight drop-shadow-md">{college.shortName}</span>
                       <span className="bg-[var(--color-brand)] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                         Fee: {college.fees}
                       </span>
                     </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[var(--color-brand)] transition-colors">
                        {college.name}
                      </h3>
                      <div className="mt-auto space-y-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800/50">
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                          <span className="font-medium text-gray-500">Highest Package</span>
                          <span className="font-bold text-gray-900 dark:text-white">{college.highestPackage}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="font-medium text-gray-500">Avg Package</span>
                          <span className="font-bold text-gray-900 dark:text-white">{college.avgPackage}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: All India Colleges */}
          {(filteredIndia.length > 0) && (
            <div className="flex flex-col pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Top All India Private Colleges
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Premier institutions across India</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIndia.map((college) => (
                  <Link
                    key={college.id}
                    href={`/counselling/college/${college.id}`}
                    className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-[320px]"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                     {college.image && (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                          style={{ backgroundImage: `url(${getDriveMediaUrl(college.image)})` }} 
                        />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                     <div className="absolute top-3 right-3">
                       <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                         {college.seats} Seats
                       </span>
                     </div>
                     <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                       <span className="text-white font-extrabold text-xl tracking-tight drop-shadow-md">{college.shortName}</span>
                       <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                         Fee: {college.fees}
                       </span>
                     </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-500 transition-colors">
                        {college.name}
                      </h3>
                      <div className="mt-auto space-y-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800/50">
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                          <span className="font-medium text-gray-500">Highest Package</span>
                          <span className="font-bold text-gray-900 dark:text-white">{college.highestPackage}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="font-medium text-gray-500">Avg Package</span>
                          <span className="font-bold text-gray-900 dark:text-white">{college.avgPackage}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {(searchQuery && filteredWB.length === 0 && filteredIndia.length === 0) && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              No top private colleges found matching "{searchQuery}"
            </div>
          )}

        </section>

        {/* All Colleges Plain List */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
             <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand)]/10 flex items-center justify-center mb-4 border border-[var(--color-brand)]/20 shadow-sm">
               <Building className="w-7 h-7 text-[var(--color-brand)]" />
             </div>
             <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
               All Engineering Colleges
             </h2>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
               A comprehensive list of the top engineering institutions across the country, ranked for your reference.
             </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 text-sm backdrop-blur-sm">
                    <th className="px-6 py-5 font-bold text-gray-700 dark:text-gray-300 w-24 text-center">Rank</th>
                    <th className="px-6 py-5 font-bold text-gray-700 dark:text-gray-300">College Name</th>
                    <th className="px-6 py-5 font-bold text-gray-700 dark:text-gray-300 w-1/3">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredAll.map((college) => (
                    <tr key={college.id} className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[36px] h-8 px-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm border border-gray-200 dark:border-gray-700 group-hover:bg-[var(--color-brand)] group-hover:text-white group-hover:border-[var(--color-brand)] transition-colors">
                          #{college.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 text-base">
                        {college.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-brand)] transition-colors" />
                          {college.location}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAll.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                         No colleges found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
