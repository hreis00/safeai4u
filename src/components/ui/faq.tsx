"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeInUp } from "@/components/animations/FadeInUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

export function FAQ({
  faqs,
  title = "Frequently Asked Questions",
  description = "Get answers to common questions about our AI solutions",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <FadeInUp className="text-center space-y-6 mb-12">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">{description}</p>
      </FadeInUp>

      <StaggerContainer className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <StaggerItem key={index}>
            <Card
              className="overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <CardHeader>
                <CardTitle className="text-left text-base font-medium flex items-center justify-between">
                  {faq.question}
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    ▼
                  </motion.span>
                </CardTitle>
              </CardHeader>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
