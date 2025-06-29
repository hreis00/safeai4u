import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - SAFE AI [4U]",
  description:
    "Discover our AI solutions for healthcare, education, and responsible AI implementation.",
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <p>
        AI solutions across healthcare, education, and responsible
        implementation.
      </p>
    </div>
  );
}
