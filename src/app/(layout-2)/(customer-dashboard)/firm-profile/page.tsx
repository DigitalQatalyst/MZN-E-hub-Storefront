"use client";

import {BusinessProfile} from "./BusinessProfile";
import { useState } from "react";

export default function Page() {
  const [activeSection, setActiveSection] = useState('profile');
  return <BusinessProfile activeSection={activeSection} />;
}
