"use client";

import { useState } from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Portal from "@/components/UI/Portal";
import AnimatedLink from "@/components/UI/AnimatedLink";
import StyledImage from "@/components/UI/StyledImage";
import CopyValue from "@/components/UI/CopyValue";

export default function Setup() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const sections = [
    <div key="0" className="space-y-4 animate-fadeIn">
      <h3 className="font-semibold text-lg">Setting up Melody Lane</h3>
      <p>
        First, create an account on{" "}
        <AnimatedLink href="https://developer.spotify.com/">
          developer.spotify.com
        </AnimatedLink>{" "}
        and navigate to the dashboard by clicking on your profile.
      </p>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/profile-dropdown.png"
          alt="dashboard"
          width={200}
          height={200}
        />
      </div>
    </div>,
    <div key="1" className="space-y-4 animate-fadeIn">
      <h3 className="font-semibold text-lg">Create application</h3>
      <p>
        Next, create an application by clicking on the &quot;Create app&quot;
        button. You can write anything you want for the name and description, I
        don&apos;t care.
      </p>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/create-app.png"
          alt="create application"
          width={300}
          height={300}
        />
      </div>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/app-name-desc.png"
          alt="edit name and description"
          width={300}
          height={300}
        />
      </div>
    </div>,
    <div key="2" className="space-y-4 animate-fadeIn">
      <h3 className="font-semibold text-lg">Setting up the redirect URI</h3>
      <p>Scroll down a little to input the redirect URI</p>
      <div className="flex justify-center">
        <CopyValue value="http://localhost:3000/callback" />
      </div>
      <p>Once you&apos;re done, hit save at the bottom.</p>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/redirect-uri.png"
          alt="redirect uri"
          width={300}
          height={300}
        />
      </div>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/save.png"
          alt="save"
          width={300}
          height={300}
        />
      </div>
    </div>,
    <div key="3" className="space-y-4 animate-fadeIn">
      <h3 className="font-semibold text-lg">Retrieve client ID</h3>
      <p>
        Now, navigate to settings and copy your client ID. This should be an
        alphanumeric string with no spaces.
      </p>
      <p>
        So, unlike the example image below, where I thought it would be funny to
        write &quot;i am a client id&quot;.
      </p>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/settings.png"
          alt="settings"
          width={250}
          height={250}
        />
      </div>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/client-id.png"
          alt="client id"
          width={250}
          height={250}
        />
      </div>
    </div>,
    <div key="4" className="space-y-4 animate-fadeIn">
      <h3 className="font-semibold text-lg">
        Paste client ID into Melody Lane
      </h3>
      <p>
        Set the data type input to &quot;use my spotify&quot; and input your
        client ID.
      </p>
      <div className="flex justify-center">
        <StyledImage
          src="/setup/input-client-id.png"
          alt="input client id"
          width={500}
          height={300}
        />
      </div>
    </div>,
    <div key="5" className="space-y-4 animate-fadeIn">
      <h3 className="font-semibold text-lg">Happy times</h3>
      <p>
        Voila! You&apos;re done. When you click on &quot;Go&quot; for the first
        time, you will be prompted to sign in with your Spotify account.
        Afterwards, everything is good to go.
      </p>
    </div>,
  ];

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sand-600 hover:text-sand-800 transition-colors ml-2 inline-flex items-center"
        aria-label="Show setup instructions"
      >
        <WrenchScrewdriverIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <Portal>
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-visible animate-fadeIn"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white rounded-lg p-6 w-full max-w-xl h-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4 flex-1 overflow-visible flex items-center">
                {/* Content */}
                <div className="w-full">{sections[index]}</div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t mt-4 select-none">
                <button
                  onClick={handlePrev}
                  className={`flex items-center ${
                    index === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-sand-600 hover:text-sand-800"
                  }`}
                  disabled={index === 0}
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-1" />
                  Previous
                </button>

                <span className="text-sm text-gray-500">
                  {index + 1} / {sections.length}
                </span>

                {index === sections.length - 1 ? (
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-sand-600 text-white py-2 px-4 rounded-lg hover:bg-sand-700 transition-colors"
                  >
                    Hooray!
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center text-sand-600 hover:text-sand-800"
                  >
                    Next
                    <ChevronRightIcon className="w-5 h-5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
