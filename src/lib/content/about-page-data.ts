// About Page Content

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  keyExperience: {
    title: string;
    points: string[];
  }[];
  links: {
    name: string;
    url: string;
  }[];
}

// Intro Statement
export const introStatement =
  "At SAI, innovation merges with empathy, bringing the foundational principles of an ideal future into the present.";

// Mission & Values Content
export const missionContent = {
  title: "🎯 Our Mission",
  paragraphs: [
    "Our commitment is to forge the most **effective solutions.** As pioneers in the field of Responsible AI, our focus is on **mitigating biases, pioneering the creation of synthetic data, and fostering an environment that values each individual uniquely**.",
    "We believe in the transformative power of technology, harnessed **responsibly, to build a future where innovation is inclusive** and everyone's contribution is recognized.",
    "Through our innovation efforts, **we aspire to set new standards that not only address current challenges but also pave the way for a more equitable and forward-thinking landscape**.",
  ],
};

export const valuesContent = {
  title: "💎 Our Values",
  paragraphs: [
    "Our values encapsulate the very essence of our identity, delineating the principles that underpin our work and interactions.",
    "**Compassion** stands as a cornerstone, guiding our actions with unwavering empathy and understanding.",
    "We are steadfast in our commitment to **bring the future to the present**, approaching each initiative as a tangible manifestation of our vision for a more progressive tomorrow.",
    "**Trust** is paramount for us, we aim for more transparent interactions and integrity in our problem-solving, and the journey has the same weight as the end product.",
    "**Inclusivity** is ingrained in our organizational culture, ensuring **everyone is respected**.",
  ],
};

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: "david-belo",
    name: "David Belo, PhD",
    title: "FOUNDER & CEO",
    image:
      "https://safe-ai-4u.eu/wp-content/uploads/2023/10/Untitled-7-1-300x300.png",
    bio: "Professional in the intersection of AI, healthcare, and responsible technology. He holds a Ph.D. in Biomedical Engineering and has over 15 years of experience in advanced AI architectures, with roles such as AI and Biosignal Expert at NASA's Frontier Development Lab. He has showcased AI architectures and project management expertise, coordinating the AISym4Med Horizon Europe project. David is also the CEO and Founder of SAFE AI [4U], demonstrating an entrepreneurial commitment to responsible AI and AI training in healthcare. His versatile skill set includes technical proficiency, project management, educational leadership, and ethical AI principles.",
    keyExperience: [
      {
        title: "🧠 AI Architect and Deep Learning Specialist",
        points: [
          "Possesses a Ph.D. in Biomedical Engineering with expertise in crafting advanced AI architectures",
          "Over 15 years of hands-on experience, specializing in deep learning applications for biosignal analysis",
          "Working as an Expert in the Horizon Europe Project's revision and mentoring",
        ],
      },
      {
        title: "🚀 Industry Impact and Leadership",
        points: [
          "Demonstrated leadership as a Machine Learning Team Lead, focusing on biosignals and AWS solutions",
          "Contributed significantly as an AI and Biosignal Expert at NASA's Frontier Development Lab",
        ],
      },
      {
        title: "📊 Project Management and Coordination",
        points: [
          "Served as a Senior Scientist showcasing skills in AI architectures, project management, and MLOps",
          "Main author and previous coordinator of the AISym4Med Horizon Europe project, leveraging responsible AI",
        ],
      },
      {
        title: "🌟 Entrepreneurial and Academic Commitment to Responsible AI",
        points: [
          "Demonstrates entrepreneurial spirit and commitment to promoting responsible AI and AI training in healthcare",
          "Actively contributing to publications and research projects",
        ],
      },
    ],
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/djdasilva",
      },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=D1p-3Q0AAAAJ&hl=pt-PT",
      },
      {
        name: "SIC Noticias",
        url: "https://sicnoticias.pt/pais/2023-03-08-Investigadores-lancam-projeto-para-colmatar-lacunas-da-inteligencia-artificial-na-saude-00e2d758",
      },
      {
        name: "Story of Success",
        url: "https://www.zabala.eu/news/aisym4med-launch/",
      },
      {
        name: "NASA FDL - Astronaut Health",
        url: "https://www.youtube.com/watch?v=IBJ7e9cQHkc&t=5s",
      },
    ],
  },
  {
    id: "anna-lysek",
    name: "Anna Lysek, MsC",
    title: "CTO, RESEARCHER & PROJECT MANAGER",
    image:
      "https://safe-ai-4u.eu/wp-content/uploads/2024/01/Untitled-3-300x300.png",
    bio: "Anna Lysek is an enthusiastic learner and adept problem solver deeply involved in project management, research, and cloud operations. Serving as a Researcher and Project Manager at Safe AI [4U], Anna not only excels in team leadership but also contributes significantly to the field of Artificial Intelligence ethics with a keen interest in bias mitigation. With prior roles as a Cloud Ops + Migration Engineer at Outsystems and a Tech Lead in software development, Anna possesses a versatile skill set, including project management, analytical thinking, and mentoring. Holding a Master's in Mathematics Applied to Economics and Management, Anna seamlessly combines academic excellence with hands-on experience, making her a dynamic professional. Her commitment to bias mitigation adds an extra layer of expertise to their already impressive profile.",
    keyExperience: [
      {
        title: "👥 Project Management and Team Leadership",
        points: [
          "Successfully managed projects and teams as a Researcher and Project Manager at Safe AI [4U], demonstrating effective leadership in the field of Artificial Intelligence ethics",
        ],
      },
      {
        title: "☁️ Cloud Operations Expertise",
        points: [
          "As a Cloud Ops + Migration Engineer at Outsystems, played a pivotal role in migrating infrastructures to the Cloud (AWS) and efficiently managing cloud infrastructures, showcasing proficiency in cloud operations",
        ],
      },
      {
        title: "💻 Technical Leadership and Consulting",
        points: [
          "Served as a Tech Lead at Noesis, Babel, and Innotech, providing team and technical leadership on diverse projects in sectors like National Health, Logistics, and Banking",
          "Demonstrated excellence in software and app development",
        ],
      },
      {
        title: "🎓 Academic and Research Achievements",
        points: [
          "Holds a Master's Degree in Mathematics Applied to Economics and Management, with a focus on the optimization of kidney exchange with desensitization",
          "Actively engaged in research, particularly in the realm of bias mitigation in Artificial Intelligence",
        ],
      },
    ],
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/anna-lysek-55247968",
      },
      {
        name: "Medium",
        url: "https://medium.com/@annalysek",
      },
    ],
  },
];

// Closing Section
export const closingSection = {
  heading: "SAFE AI [4U]",
  subheading: "We make things happen",
};

