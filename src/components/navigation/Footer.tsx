import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SAFE AI [4U]</h3>
            <p className="text-sm text-muted-foreground">
              Responsible AI solutions for healthcare, education, and ethical
              technology implementation.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <nav className="space-y-2">
              <Link
                href="/services/health"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                SAI [4Health]
              </Link>
              <Link
                href="/services/mind"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                SAI [4Mind]
              </Link>
              <Link
                href="/services/trust"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                SAI [4Trust]
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <nav className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                About Us
              </Link>
              <Link
                href="/projects"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Projects
              </Link>
              <Link
                href="/workshops"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Workshops
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <nav className="space-y-2">
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </Link>
              <a
                href="https://www.linkedin.com/company/sai-4u/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/channel/UCWw3eMawbeujU6l3-TseTDA"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                YouTube
              </a>
            </nav>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2023 SAFE AI [4U]. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
