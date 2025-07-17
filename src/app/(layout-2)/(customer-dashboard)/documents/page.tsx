import React from 'react'
import { Dropzone } from "@component/ui/DropZone";
import { useState } from "react";
import { Navbar } from "@component/ui/FirmWalletNavbar";
import { DocumentSearch } from "@component/ui/DocumentSearch";
import { DocumentFilter } from "@component/ui/DocumentFilter";
import { FileCard } from "@component/ui/FileCard";

const FirmWallet = () => {
  return (
    <div className="p-6">
      <Navbar />
      <Dropzone />
      <div className="flex items-center justify-between mt-2 mb-4 gap-4 bg-[#F4F7FB] px-4 py-2 rounded-xl" style={{ width: '1116px' }}>
        <div className="flex-1 min-w-0">
          <DocumentSearch />
        </div>
        <div className="flex-shrink-0 ml-4">
          <DocumentFilter />
        </div>
      </div>
      {/* My Files Section */}
      <div className="mt-6" style={{ width: '1116px' }}>
        <h2 className="text-lg font-semibold mb-4 ml-1">My Files</h2>
        <div className="flex flex-row gap-4 flex-wrap" id="myFiles">
          {/* Example FileCards - replace with dynamic data later */}
          <FileCard fileName="Completion_Certif..." uploadDate="May 20, 2024" fileSize="800 KB" />
          <FileCard fileName="Financials_Q1_rep..." uploadDate="May 25, 2024" fileSize="1.1 MB" />
          <FileCard fileName="Annual_Report_2024..." uploadDate="May 30, 2024" fileSize="2.5 MB" />
          <FileCard fileName="Annual_Report_2023..." uploadDate="May 30, 2024" fileSize="2.5 MB" />
        </div>
      </div>
    </div>
  )
}

export default FirmWallet