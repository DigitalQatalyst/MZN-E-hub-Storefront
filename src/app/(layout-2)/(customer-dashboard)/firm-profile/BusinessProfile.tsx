import React, { useEffect, useState, useRef } from "react";
import { TabSection } from "./TabSection";
import { TableSection } from "./TableSection";
import { DocumentSection } from "./DocumentSection";
import { mockMultiEntryData, mockDocuments } from "./data/mockData";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
  MenuIcon,
  AlertTriangleIcon,
} from "lucide-react";
import {
  profileConfig,
  getCompanyStageById,
  checkMandatoryFieldsCompletion,
} from "./utils/config";
import {
  fetchBusinessProfileData,
  calculateSectionCompletion,
  calculateMandatoryCompletion,
} from "./services/dataverseService";

type BusinessProfileProps = {
  /** Ignored now; component is profile-only */
  activeSection?: string;
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
};

export function BusinessProfile({
  activeSection, // no-op
  toggleSidebar,
  sidebarOpen = false,
}: BusinessProfileProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showTabsMenu, setShowTabsMenu] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sectionCompletions, setSectionCompletions] = useState<Record<string, number>>({});
  const [mandatoryCompletions, setMandatoryCompletions] = useState<Record<string, { percentage: number }>>({});
  const [missingMandatoryFields, setMissingMandatoryFields] = useState<string[]>([]);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      try {
        const data = await fetchBusinessProfileData();
        setProfileData(data);

        const completions: Record<string, number> = {};
        const mandatoryStats: Record<string, { percentage: number }> = {};

        profileConfig.tabs.forEach((tab) => {
          const sectionData = data.sections[tab.id] || { fields: {} };
          completions[tab.id] = calculateSectionCompletion(sectionData);
          mandatoryStats[tab.id] = calculateMandatoryCompletion(
            sectionData,
            tab.id,
            data.companyStage,
            profileConfig
          );
        });

        setSectionCompletions(completions);
        setMandatoryCompletions(mandatoryStats);

        const mandatoryFieldsCheck = checkMandatoryFieldsCompletion(
          data,
          data.companyStage
        );
        setMissingMandatoryFields(mandatoryFieldsCheck.missing);
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  const scrollLeft = () => tabsRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => tabsRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const res = ev.target?.result;
      if (typeof res === "string") setLogoUrl(res);
      else if (res instanceof ArrayBuffer) setLogoUrl(URL.createObjectURL(new Blob([res])));
      setIsUploadingLogo(false);
    };
    reader.onerror = () => setIsUploadingLogo(false);
    reader.readAsDataURL(file);
  };

  // Always show ALL profile tabs
  const sectionsToDisplay = profileConfig.tabs.map((tab) => ({
    id: tab.id,
    title: tab.title,
    completion: sectionCompletions[tab.id] ?? 0,
    mandatoryCompletion: mandatoryCompletions[tab.id] ?? { percentage: 0 },
  }));

  const overallMandatoryCompletion =
    profileData && profileData.companyStage
      ? Math.round(
          (checkMandatoryFieldsCompletion(profileData, profileData.companyStage).completed /
            checkMandatoryFieldsCompletion(profileData, profileData.companyStage).total) *
            100
        )
      : 0;

  const getCurrentSectionTitle = () => sectionsToDisplay[activeTabIndex]?.title || "";
  const getCurrentSectionConfig = () => {
    const currentId = sectionsToDisplay[activeTabIndex]?.id;
    return profileConfig.tabs.find((t) => t.id === currentId);
  };
  const getCurrentSectionData = () => {
    if (!profileData || !sectionsToDisplay[activeTabIndex]) return null;
    const currentId = sectionsToDisplay[activeTabIndex].id;
    return profileData.sections[currentId] || { fields: {}, status: {} };
  };

  const companyStage = profileData?.companyStage
    ? getCompanyStageById(profileData.companyStage)
    : null;

  return (
    <div className="space-y-0" style={{width: "81vw"}}>
      <div className="sticky top-0 z-20 bg-gray-100 py-3 px-3 sm:px-4 lg:px-6 border-b border-gray-200 shadow-sm">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            {toggleSidebar && (
              <button
                className="md:hidden mr-2 text-gray-600 p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
              </button>
            )}
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 truncate max-w-[180px] sm:max-w-none">
              Company Profile
            </h1>
          </div>

          <div className="flex items-center">
            {missingMandatoryFields.length > 0 && (
              <div className="mr-2 sm:mr-4 flex items-center text-amber-600">
                <span className="flex items-center text-xs sm:text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                  <span className="hidden xs:inline">{missingMandatoryFields.length} missing</span>
                  <span className="xs:hidden">{missingMandatoryFields.length}</span>
                </span>
              </div>
            )}
            <div className="flex items-center bg-gray-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <span className="text-xs sm:text-sm text-gray-600 hidden xs:inline mr-1">
                Completion:
              </span>
              <div className="mx-1 sm:mx-2 w-16 sm:w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    overallMandatoryCompletion === 100
                      ? "bg-green-500"
                      : overallMandatoryCompletion >= 70
                      ? "bg-blue-500"
                      : overallMandatoryCompletion >= 30
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${overallMandatoryCompletion}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 ml-1">
                {overallMandatoryCompletion}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mx-4 lg:mx-6 mt-4">
          {/* Company header */}
          <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col items-left">
              <div className="flex items-center mb-4">
                <div className="relative mr-3 sm:mr-4">
                  {logoUrl ? (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={logoUrl} alt="Company Logo" className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          className="p-1 bg-white rounded-full text-gray-700 hover:text-red-500"
                          onClick={() => setLogoUrl("")}
                        >
                          <XIcon size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer ${
                        isUploadingLogo ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsUploadingLogo(true)}
                    >
                      {isUploadingLogo ? (
                        <div className="flex flex-col items-center">
                          <UploadIcon size={16} className="text-blue-500 mb-1" />
                          <span className="text-xs text-blue-500">Upload</span>
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      ) : (
                        <ImageIcon size={20} className="text-gray-400" />
                      )}
                    </div>
                  )}
                </div>

                <div className="text-left flex flex-col">
                  <div className="flex flex-wrap items-center mb-1">
                    <h2 className="text-lg sm:text-xl font-medium text-gray-800 mr-2 mb-1 sm:mb-0">
                      {profileData?.name || "Company Name"}
                    </h2>
                    {companyStage && (
                      <span className={`text-xs font-medium text-white px-2 py-1 rounded-full ${companyStage.color}`}>
                        {companyStage.label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {profileData?.companyType || "Industry"} • {profileData?.companySize || "Company Size"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile selector */}
          <div className="md:hidden border-b border-gray-200 bg-gray-50 p-3 sticky top-[57px] z-10">
            <div className="relative">
              <button
                className="w-full px-4 py-2 text-left text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
                onClick={() => setShowTabsMenu(!showTabsMenu)}
              >
                <span>{getCurrentSectionTitle()}</span>
                <ChevronDownIcon size={16} />
              </button>
              {showTabsMenu && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                  {sectionsToDisplay.map((section, index) => (
                    <button
                      key={section.id}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between ${
                        activeTabIndex === index ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveTabIndex(index);
                        setShowTabsMenu(false);
                      }}
                    >
                      <span>{section.title}</span>
                      <div className="flex items-center">
                        {section.mandatoryCompletion.percentage === 100 ? (
                          <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                            <CheckCircleIcon size={14} className="mr-1" />
                            {section.completion}%
                          </span>
                        ) : section.mandatoryCompletion.percentage > 0 ? (
                          <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                            {section.completion}%
                          </span>
                        ) : (
                          <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                            <span className="w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                            {section.completion}%
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:block border-b border-gray-200 bg-gray-50 sticky top-[57px] z-10">
            <div className="flex items-center">
              <button className="px-2 py-3 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={scrollLeft} aria-label="Scroll tabs left">
                <ChevronLeftIcon size={16} />
              </button>
              <div
                ref={tabsRef}
                className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                role="tablist"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    scrollRight();
                    if (activeTabIndex < sectionsToDisplay.length - 1) setActiveTabIndex(activeTabIndex + 1);
                  } else if (e.key === "ArrowLeft") {
                    scrollLeft();
                    if (activeTabIndex > 0) setActiveTabIndex(activeTabIndex - 1);
                  }
                }}
              >
                {sectionsToDisplay.map((section, index) => (
                  <button
                    key={section.id}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center snap-start ${
                      activeTabIndex === index ? "text-blue-600 border-b-2 border-blue-600 bg-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTabIndex(index)}
                    role="tab"
                    aria-selected={activeTabIndex === index}
                    id={`tab-${section.id}`}
                    aria-controls={`panel-${section.id}`}
                  >
                    <span>{section.title}</span>
                    <div className="flex items-center ml-2">
                      {section.mandatoryCompletion.percentage === 100 ? (
                        <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                          <CheckCircleIcon size={14} className="mr-1" />
                          {section.completion}%
                        </span>
                      ) : section.mandatoryCompletion.percentage > 0 ? (
                        <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                          {section.completion}%
                        </span>
                      ) : (
                        <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                          {section.completion}%
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button className="px-2 py-3 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={scrollRight} aria-label="Scroll tabs right">
                <ChevronRightIcon size={16} />
              </button>
              <div className="relative">
                <button className="px-2 py-3 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setShowTabsMenu(!showTabsMenu)} aria-label="Show all tabs">
                  <MoreHorizontalIcon size={16} />
                </button>
                {showTabsMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1 max-h-64 overflow-y-auto">
                      {sectionsToDisplay.map((section, index) => (
                        <button
                          key={section.id}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                            activeTabIndex === index ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setActiveTabIndex(index);
                            setShowTabsMenu(false);
                          }}
                        >
                          <span>{section.title}</span>
                          <div className="flex items-center">
                            {section.mandatoryCompletion.percentage === 100 ? (
                              <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                                <CheckCircleIcon size={14} className="mr-1" />
                                {section.completion}%
                              </span>
                            ) : section.mandatoryCompletion.percentage > 0 ? (
                              <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                                {section.completion}%
                              </span>
                            ) : (
                              <span className="flex items-center text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                                {section.completion}%
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Panels */}
          <div className="p-3 sm:p-4 md:p-6">
            {sectionsToDisplay.map((section, index) => (
              <div
                key={section.id}
                className={activeTabIndex === index ? "block" : "hidden"}
                role="tabpanel"
                id={`panel-${section.id}`}
                aria-labelledby={`tab-${section.id}`}
              >
                {getCurrentSectionConfig() && (
                  <TabSection
                    config={getCurrentSectionConfig()!.groups}
                    data={getCurrentSectionData()}
                    completion={section.completion}
                    companyStage={profileData?.companyStage}
                    mandatoryCompletion={section.mandatoryCompletion}
                  />
                )}

                {mockMultiEntryData[section.id] &&
                  mockMultiEntryData[section.id].map((tableData, idx) => (
                    <div key={idx} className="mt-5 md:mt-6 lg:mt-8">
                      <TableSection title={tableData.title} columns={tableData.columns} data={tableData.data} />
                    </div>
                  ))}

                {mockDocuments[section.id] && (
                  <div className="mt-5 md:mt-6 lg:mt-8">
                    <DocumentSection title="Section Documents" documents={mockDocuments[section.id]} />
                  </div>
                )}

                {!mockMultiEntryData[section.id] &&
                  !mockDocuments[section.id] &&
                  (!getCurrentSectionData()?.fields || Object.keys(getCurrentSectionData()!.fields).length === 0) && (
                    <div className="mt-5 md:mt-6 lg:mt-8 text-center py-8 sm:py-10 md:py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <div className="flex flex-col items-center px-4">
                        <div className="p-3 bg-gray-100 rounded-full mb-4">
                          <AlertTriangleIcon size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">No {section.title} Data</h3>
                        <p className="text-sm text-gray-500 max-w-md break-words">
                          This section doesn't have any data yet. Use the Edit Section button in each group to add information.
                        </p>
                        {profileData?.companyStage && (
                          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md max-w-md">
                            <p className="text-sm text-amber-700">
                              <span className="font-medium">Note:</span> Some fields in this section are mandatory for your
                              company's {companyStage?.label} stage.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
