"use client";
import React, { useRef, useState } from "react";
// import Header from "./header";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import FileUploader from "./file_uploader";
import DataDashboard from "./data_dashboard";
import { Column, Data, Summary } from "@/lib/data";
import Footer from "./footer";
import logo from "@/components/images/logo.png";
import Image from "next/image";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [columns, setColumns] = useState<Column[] | null>(null);
  const [rScript, setRScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploaderRef = useRef<HTMLDivElement>(null);
  const handleCtaClick = () => {
    uploaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetState = () => {
    setColumns(null);
    setFile(null);
    setData(null);
    setColumns(null);
    setSummary(null);
    setRScript(null);
    setIsLoading(false);
    setError(null);
  };
  return (
    <div className="flex min-h-screen w-full font-inter flex-col">
      {/* <Header /> */}
      {!data ? (
        <>
          <section className="relative w-full border-b bg-softBackground">
            <div className="container mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center gap-8 px-4 md:px-6">
              <div className="max-w-20">
                <Image src={logo} alt="logo" />
              </div>
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  From Raw Data to R-Script, Instantly
                </h1>
                <p className="md:text-xl/relaxed">
                  Upload your CSV or Excel file. Our AI-powered tool will
                  analyze it, generate key insights and visualizations, and
                  provide a ready-to-run R script for deeper analysis.
                </p>
              </div>
              <Button size={"lg"} onClick={handleCtaClick}>
                Analyze your data
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>

          <section
            ref={uploaderRef}
            id="upload-section"
            className="w-full bg-foreground py-16 md:py-24 lg:py-32"
          >
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
              <FileUploader
                setFile={setFile}
                setData={setData}
                setColumns={setColumns}
                setSummary={setSummary}
                setRScript={setRScript}
                setIsLoading={setIsLoading}
                setError={setError}
                isLoading={isLoading}
              />
            </div>
          </section>
        </>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <DataDashboard
            file={file}
            data={data}
            columns={columns}
            summary={summary}
            rScript={rScript}
            onReset={resetState}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
