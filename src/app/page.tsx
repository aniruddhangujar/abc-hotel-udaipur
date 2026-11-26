"use client";

import React, { useCallback, useState } from "react";
import { ScrollController, usePalaceScroll } from "@/components/animation/ScrollController";
import { PreloaderVeil } from "@/components/brand/PreloaderVeil";
import { Navbar } from "@/components/navigation/Navbar";
import { NavigationOverlay } from "@/components/navigation/NavigationOverlay";
import { ArrivalChapter } from "@/components/chapters/ArrivalChapter";
import { PalaceChapter } from "@/components/chapters/PalaceChapter";
import { StayChapter } from "@/components/chapters/StayChapter";
import { DiningChapter } from "@/components/chapters/DiningChapter";
import { ExperiencesChapter } from "@/components/chapters/ExperiencesChapter";
import { DepartureChapter } from "@/components/chapters/DepartureChapter";
import { SuiteDossierModal } from "@/components/booking/SuiteDossierModal";
import { DiningConciergeModal } from "@/components/booking/DiningConciergeModal";
import { PalaceFooter } from "@/components/footer/PalaceFooter";
import { RoomCategory } from "@/data/rooms";

function PalaceExperienceContent() {
  const { scrollToSection } = usePalaceScroll();
  const [heroReady, setHeroReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSuiteDossier, setActiveSuiteDossier] = useState<RoomCategory | null>(null);
  const [diningModalOpen, setDiningModalOpen] = useState(false);
  const [preselectedRoomId, setPreselectedRoomId] = useState<string | undefined>(
    undefined
  );
  const [preselectedExperience, setPreselectedExperience] = useState<string | null>(
    null
  );

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  const handleCheckAvailability = useCallback(
    (roomId: string) => {
      setPreselectedRoomId(roomId);
      scrollToSection("reserve");
    },
    [scrollToSection]
  );

  const handleInquireExperience = useCallback(
    (experienceTitle: string) => {
      setPreselectedExperience(experienceTitle);
      scrollToSection("reserve");
    },
    [scrollToSection]
  );

  const handleOpenBooking = useCallback(() => {
    scrollToSection("reserve");
  }, [scrollToSection]);

  return (
    <>
      <PreloaderVeil ready={heroReady} />

      <Navbar
        onOpenMenu={() => setMenuOpen(true)}
        onOpenBooking={handleOpenBooking}
      />

      <NavigationOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onReserve={handleOpenBooking}
      />

      <main id="main-content" className="relative w-full overflow-x-clip">
        <ArrivalChapter onHeroReady={handleHeroReady} />

        <PalaceChapter />

        <StayChapter
          onExploreRoom={(room) => setActiveSuiteDossier(room)}
          onCheckAvailability={handleCheckAvailability}
        />

        <DiningChapter onReserveTable={() => setDiningModalOpen(true)} />

        <ExperiencesChapter onInquireExperience={handleInquireExperience} />

        <DepartureChapter
          preselectedRoomId={preselectedRoomId}
          preselectedExperience={preselectedExperience}
        />
      </main>

      <PalaceFooter onOpenBooking={handleOpenBooking} />

      <SuiteDossierModal
        room={activeSuiteDossier}
        onClose={() => setActiveSuiteDossier(null)}
        onCheckAvailability={handleCheckAvailability}
      />

      <DiningConciergeModal
        isOpen={diningModalOpen}
        onClose={() => setDiningModalOpen(false)}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <ScrollController>
      <PalaceExperienceContent />
    </ScrollController>
  );
}

