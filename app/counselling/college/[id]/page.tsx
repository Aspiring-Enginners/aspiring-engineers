import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, MapPin, Building2, ExternalLink, 
  CheckCircle, AlertCircle, BarChart3, Landmark, ArrowRight, ShieldCheck, XCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdmissionGuidanceForm from "@/components/forms/AdmissionGuidanceForm";

import collegeData from "../../../../college_data.json";
import collegeDetailsRaw from "../../../../college_details.json";

const collegeDetails = collegeDetailsRaw as Record<string, any>;

function getDriveMediaUrl(url?: string) {
  if (!url || !url.includes('drive.google.com')) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
}

export default async function CollegeDetailPage(props: any) {
  const params = await props.params;
  const id = params?.id;

  if (!id) return notFound();

  // Combine arrays to search for the basic college data
  const baseData = 
    collegeData.carouselColleges.find((c: any) => c.id === id) ||
    collegeData.westBengalPrivateColleges.find((c: any) => c.id === id) ||
    collegeData.allIndiaPrivateColleges.find((c: any) => c.id === id);

  if (!baseData) {
    return notFound();
  }

  // Get extended deep details, fallback to generic strings if not present
  const details = collegeDetails[id] || {
    about: `${baseData.name} is a premier institution offering excellent engineering programs with stellar infrastructure and solid placement records.`,
    pros: ["Excellent infrastructure", "Strong placement network", "Experienced faculty", "Good campus life"],
    cons: ["Strict academic rules", "Competitive peer group"],
    placementTrends: [
      { year: "2024", highest: baseData.highestPackage || "N/A", average: baseData.avgPackage || "N/A", topRecruiters: "Top MNCs and IT giants" }
    ],
    campusFacilities: ["Hostels", "Central Library", "Modern Labs", "Sports Complex", "Cafeteria"]
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
        
        {/* Top Hero / Header */}
        <div className="relative border-b border-gray-200 dark:border-gray-800">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,150,190,0.16),transparent_48%),linear-gradient(180deg,rgba(96,223,255,0.12),transparent_32%)]" />
          
          {/* Banner Image Background */}
          {baseData.image && (
            <div className="absolute inset-x-0 top-0 h-96 -z-20 overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
              <div 
                className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
                style={{ backgroundImage: `url(${getDriveMediaUrl(baseData.image)})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50 dark:via-gray-950/50 dark:to-gray-950" />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
            <Link 
              href="/counselling/college-list" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[var(--color-brand)] transition-colors mb-6"
            >
               <ArrowLeft className="w-4 h-4" /> Back to Colleges
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
               {(baseData as any).logo ? (
                 <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-3 shadow-xl border border-gray-200 dark:border-gray-800 shrink-0 flex items-center justify-center">
                    <img src={getDriveMediaUrl((baseData as any).logo)} alt={baseData.shortName} className="w-full h-full object-contain" />
                 </div>
               ) : (
                 <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-100 dark:bg-gray-800 p-3 shadow-xl border border-gray-200 dark:border-gray-700 shrink-0 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-gray-400" />
                 </div>
               )}

               <div className="text-center md:text-left flex-1">
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                   <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                     {baseData.name}
                   </h1>
                   {(baseData as any).nirf && (
                     <span className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 px-3 py-1.5 text-sm font-bold shadow-sm whitespace-nowrap">
                       NIRF Rank {(baseData as any).nirf}
                     </span>
                   )}
                 </div>

                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                   <span className="flex items-center gap-1.5">
                     <MapPin className="w-4 h-4 text-[var(--color-brand)]" />
                     {baseData.location}, {baseData.state}
                   </span>
                   <span className="hidden sm:block">•</span>
                   <span className="flex items-center gap-1.5">
                     <Landmark className="w-4 h-4 text-emerald-500" />
                     Established {(baseData as any).established || "N/A"}
                   </span>
                   <span className="hidden sm:block">•</span>
                   <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                     {baseData.category}
                   </span>
                 </div>

                 <p className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                   {details.about}
                 </p>
                 
                 {(baseData as any).website && (
                    <a href={(baseData as any).website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[var(--color-brand)] hover:underline">
                      Visit Official Website <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                 )}
               </div>
            </div>
          </div>
        </div>

        {/* Content Section Split */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column - Details */}
              <div className="lg:col-span-8 space-y-12">
                 
                 {/* Quick Stats Banner */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center transform hover:-translate-y-1 transition-transform cursor-default">
                       <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-1">Highest Package</p>
                       <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{baseData.highestPackage || "N/A"}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center transform hover:-translate-y-1 transition-transform cursor-default">
                       <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-1">Average Package</p>
                       <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{baseData.avgPackage || "N/A"}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center transform hover:-translate-y-1 transition-transform cursor-default">
                       <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-1">Total Seats</p>
                       <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{baseData.seats || "N/A"}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center transform hover:-translate-y-1 transition-transform cursor-default">
                       <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-1">Est. Fees</p>
                       <p className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">{(baseData as any).fees || "N/A"}</p>
                    </div>
                 </div>

                 <hr className="border-gray-200 dark:border-gray-800" />

                 {/* Placement Trends */}
                 <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Placement Trends</h2>
                    </div>

                    <div className="space-y-4">
                      {details.placementTrends && details.placementTrends.map((trend: any, idx: number) => (
                        <div key={idx} className="relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10" />
                           <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                             <div>
                               <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{trend.year} Placements</h3>
                               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                  Top Recruiters: <span className="text-gray-800 dark:text-gray-300">{trend.topRecruiters}</span>
                               </p>
                             </div>
                             <div className="flex gap-4 shrink-0">
                                <div className="bg-gray-50 dark:bg-gray-950 px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800/50">
                                   <p className="text-xs text-gray-500 uppercase font-bold mb-1">Highest</p>
                                   <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{trend.highest}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-950 px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800/50">
                                   <p className="text-xs text-gray-500 uppercase font-bold mb-1">Average</p>
                                   <p className="text-xl font-black text-blue-600 dark:text-blue-400">{trend.average}</p>
                                </div>
                             </div>
                           </div>
                        </div>
                      ))}
                    </div>
                 </section>

                 <hr className="border-gray-200 dark:border-gray-800" />

                 {/* Pros and Cons */}
                 <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pros */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                         <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"><CheckCircle className="w-5 h-5" /></div>
                         Key Advantages
                      </h3>
                      <ul className="space-y-3">
                         {details.pros && details.pros.map((pro: string, i: number) => (
                           <li key={i} className="flex items-start gap-3 bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-500/10 rounded-xl p-4 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
                             <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                             {pro}
                           </li>
                         ))}
                      </ul>
                    </div>
                    {/* Cons */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                         <div className="p-1 rounded bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"><AlertCircle className="w-5 h-5" /></div>
                         Things to Consider
                      </h3>
                      <ul className="space-y-3">
                         {details.cons && details.cons.map((con: string, i: number) => (
                           <li key={i} className="flex items-start gap-3 bg-white dark:bg-gray-900 border border-red-100 dark:border-red-500/10 rounded-xl p-4 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
                             <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                             {con}
                           </li>
                         ))}
                      </ul>
                    </div>
                 </section>

                 <hr className="border-gray-200 dark:border-gray-800" />

                 {/* Campus Facilities */}
                 <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Campus & Facilities</h2>
                    <div className="flex flex-wrap gap-3">
                      {details.campusFacilities && details.campusFacilities.map((facility: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm cursor-default hover:border-[var(--color-brand)] transition-colors">
                           <Building2 className="w-4 h-4 text-gray-400" />
                           {facility}
                        </span>
                      ))}
                    </div>
                 </section>

              </div>

              {/* Right Column - Admission Form */}
              <div className="lg:col-span-4">
                 <div className="sticky top-24">
                    <AdmissionGuidanceForm prefilledCollege={baseData.name} />
                    
                    {/* Exams Box */}
                    <div className="mt-6 p-6 bg-blue-50/50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/20">
                       <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-3 uppercase tracking-wider">Accepted Examinations</h4>
                       <div className="flex flex-wrap gap-2">
                          {(baseData as any).acceptedExams && (baseData as any).acceptedExams.map((exam: string, idx: number) => (
                            <span key={idx} className="bg-white dark:bg-gray-900 px-3 py-1.5 rounded-md text-sm font-bold text-blue-700 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-500/20">
                              {exam}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
