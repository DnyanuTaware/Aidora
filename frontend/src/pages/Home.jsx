import React, { useEffect, useState } from "react";

const Home = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      {
        title: "Merit Scholarship 2025",
        provider: "National Education Fund",
        deadline: "2025-12-31",
        link: "https://example.com/apply/merit-scholarship",
      },
      {
        title: "Need-Based Scholarship",
        provider: "Global Aid Foundation",
        deadline: "2025-11-15",
        link: "https://example.com/apply/need-based",
      },
      {
        title: "Tech Excellence Award",
        provider: "TechCorp International",
        deadline: "2025-10-20",
        link: "https://example.com/apply/tech-excellence",
      },
      {
        title: "Women in STEM Scholarship",
        provider: "STEM Women Network",
        deadline: "2025-09-30",
        link: "https://example.com/apply/women-stem",
      },
      {
        title: "Arts & Culture Scholarship",
        provider: "Creative Minds Foundation",
        deadline: "2025-12-15",
        link: "https://example.com/apply/arts-culture",
      },
      {
        title: "Leadership Award",
        provider: "Young Leaders Organization",
        deadline: "2025-11-05",
        link: "https://example.com/apply/leadership",
      },
      {
        title: "Global Science Scholarship",
        provider: "International Science Fund",
        deadline: "2025-10-31",
        link: "https://example.com/apply/global-science",
      },
      {
        title: "Sports Excellence Grant",
        provider: "Athletes Support Group",
        deadline: "2025-09-25",
        link: "https://example.com/apply/sports-excellence",
      },
      {
        title: "Community Service Scholarship",
        provider: "Helping Hands Foundation",
        deadline: "2025-12-01",
        link: "https://example.com/apply/community-service",
      },
      {
        title: "Entrepreneurship Grant",
        provider: "Startup Leaders Fund",
        deadline: "2025-11-20",
        link: "https://example.com/apply/entrepreneurship",
      },
      {
        title: "Environmental Scholarship",
        provider: "Green Future Initiative",
        deadline: "2025-10-10",
        link: "https://example.com/apply/environmental",
      },
      {
        title: "AI Research Scholarship",
        provider: "Tech Innovators Lab",
        deadline: "2025-09-15",
        link: "https://example.com/apply/ai-research",
      },
      {
        title: "Medical Science Scholarship",
        provider: "HealthCare Foundation",
        deadline: "2025-12-05",
        link: "https://example.com/apply/medical-science",
      },
      {
        title: "Coding Bootcamp Scholarship",
        provider: "DevSchool",
        deadline: "2025-11-12",
        link: "https://example.com/apply/coding-bootcamp",
      },
      {
        title: "Global Literature Award",
        provider: "Writers Guild International",
        deadline: "2025-10-28",
        link: "https://example.com/apply/literature",
      },
      {
        title: "Math Excellence Scholarship",
        provider: "Math Society",
        deadline: "2025-09-30",
        link: "https://example.com/apply/math-excellence",
      },
      {
        title: "Cultural Exchange Grant",
        provider: "World Students Network",
        deadline: "2025-12-10",
        link: "https://example.com/apply/cultural-exchange",
      },
      {
        title: "Innovation in Technology Scholarship",
        provider: "TechFuture Fund",
        deadline: "2025-11-25",
        link: "https://example.com/apply/innovation-tech",
      },
      {
        title: "Scholarship for Rural Students",
        provider: "Rural Education Trust",
        deadline: "2025-10-15",
        link: "https://example.com/apply/rural-students",
      },
      {
        title: "Women Leadership Grant",
        provider: "Empower Women Foundation",
        deadline: "2025-09-20",
        link: "https://example.com/apply/women-leadership",
      },
    ];

    setTimeout(() => {
      setScholarships(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading scholarships...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">
        Available Scholarships
      </h1>
      {scholarships.length === 0 ? (
        <p className="text-center text-gray-500">
          No scholarships available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {scholarship.title}
              </h2>
              <p className="text-gray-600 mb-2 font-medium">
                {scholarship.provider}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Deadline:{" "}
                <span className="font-semibold">{scholarship.deadline}</span>
              </p>
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#2CA6A4] via-[#47C1BF] to-[#5FD6D3] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
