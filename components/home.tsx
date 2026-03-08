import React from "react";
import Header from "./header";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import FileUploader from "./file_uploader";

const HomePage = () => {
  return (
    <div className="flex min-h-screen w-full font-inter flex-col">
      <Header />

      <section className="relative w-full border-b bg-softBackground">
        <div className="container mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center gap-8 px-4 md:px-6">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              From Raw Data to R-Script, Instantly
            </h1>
            <p className="md:text-xl/relaxed">
              Upload your CSV or Excel file. Our AI-powered tool will analyze
              it, generate key insights and visualizations, and provide a
              ready-to-run R script for deeper analysis.
            </p>
          </div>
          <Button size={"lg"}>
            Analyze your data
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section
        // ref={uploaderRef}
        id="upload-section"
        className="w-full bg-[#020817] py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <FileUploader />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
