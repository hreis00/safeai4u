/**
 * Services Page Data
 * Contains all data for the Services page including service categories,
 * "What to expect" content, instructor info, and video links
 */

export interface ServiceCategory {
  id: string;
  title: string;
  description?: string;
  features?: string[];
}

export interface WhatToExpectTopic {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface VideoEmbed {
  id: string;
  title: string;
  url: string;
  embedId: string;
}

export interface InstructorBio {
  name: string;
  title: string;
  photo?: string;
  bio: string[];
}

// Five Main Service Categories
export const serviceCategories: ServiceCategory[] = [
  {
    id: "ai-development",
    title: "AI DEVELOPMENT",
    description:
      "Custom AI solutions tailored to your specific needs, from prototype to production.",
  },
  {
    id: "expert-consultancy",
    title: "Expert Consultancy",
    description:
      "Strategic guidance on AI implementation, architecture, and best practices.",
  },
  {
    id: "technical-writing",
    title: "Technical Writing",
    description:
      "Clear, comprehensive documentation for AI systems and technical processes.",
  },
  {
    id: "training-teaching",
    title: "Training/Teaching Services",
    description:
      "Hands-on workshops and training programs to empower your team with AI skills.",
  },
  {
    id: "idea-development",
    title: "Idea Development",
    description:
      "Transform your AI concepts into actionable strategies and implementation plans.",
  },
];

// "What to Expect" Section Topics
export const whatToExpectTopics: WhatToExpectTopic[] = [
  {
    id: "biosignal-processing",
    icon: "📊",
    title: "Biosignal Processing for Deep Learning",
    description:
      "Use a comprehensive understanding of biosignal processing techniques for deep learning (Explain how to preprocess biosignals for deep learning applications and discuss feature extraction methods.)",
  },
  {
    id: "rnns",
    icon: "🔄",
    title: "Recurrent Networks (RNNs)",
    description:
      "RNNs are a powerful class of deep learning models designed for sequential information handling and time-series analysis. Learn how to leverage RNNs to model temporal dependencies in biosignal data and gain insights into architectures tailored for sequence prediction tasks.",
  },
  {
    id: "cnns",
    icon: "🧠",
    title: "Convolutional Neural Networks (CNNs)",
    description:
      "CNNs excel at processing spatial patterns in data, making them ideal for analyzing biosignal spectrogram and visual representations. Explore how to utilize CNNs to automatically learn and extract features from biosignal data, and how to configure their architecture optimizing training and improving model performance.",
  },
  {
    id: "gans",
    icon: "🎨",
    title: "Biosignal Synthesis (GANs)",
    description:
      "Generative Adversarial Networks (GANs) enable the creation of synthetic biosignals. Learn how to use GANs to generate realistic biosignal patterns for data augmentation, privacy-preserving research, and model evaluation tasks.",
  },
  {
    id: "classification",
    icon: "🎯",
    title: "Biosignal Classification",
    description:
      "Dive into the world of biosignal classification where you'll explore techniques for categorizing biosignal patterns into different classes. Understand the importance of feature selection and model evaluation in building accurate classification models.",
  },
  {
    id: "prediction",
    icon: "📈",
    title: "Prediction",
    description:
      "Harness the power of deep learning for predictive modeling in biosignal analysis. Explore how to create models that forecast future biosignal values or changes in a patient's condition.",
  },
];

// What to Expect Section Metadata
export const whatToExpectMeta = {
  title: "WHAT TO EXPECT",
  closing:
    "Join us on this immersive exploration into deep biosignal processing with deep learning. Walk away with the skills and knowledge needed to make informed decisions in healthcare, optimize medical treatments, and contribute to advances in personalized medicine.",
};

// Instructor Information
export const instructor: InstructorBio = {
  name: "David Belo, PhD",
  title: "Founder & Lead Instructor",
  bio: [
    "David Belo is a pioneer in responsible AI development with extensive experience in healthcare applications of machine learning.",
    "With a PhD focused on biosignal processing and deep learning, David has led numerous projects in applying AI to medical diagnostics and personalized treatment.",
    "His work emphasizes ethical AI practices, ensuring solutions are not only powerful but also safe, unbiased, and inclusive.",
  ],
};

// YouTube Videos
export const youtubeVideos: VideoEmbed[] = [
  {
    id: "deep-learn-biosignals",
    title: "DEEP LEARN BIOSIGNALS",
    url: "https://www.youtube.com/watch?v=CSwby2lhyL8",
    embedId: "CSwby2lhyL8",
  },
  {
    id: "intro-ml-healthcare",
    title: "Intro to Machine Learning for Healthcare",
    url: "https://www.youtube.com/watch?v=PzfCXoHCWi0",
    embedId: "PzfCXoHCWi0",
  },
];

// CTA Configuration
export const servicesCTA = {
  title: "Have an idea but don't know where to start?",
  subtitle: "Schedule a consult!",
  buttonText: "Contact us",
  buttonHref: "/contact",
  additionalText: "Just send us a message, we won't bite 🙂",
};

