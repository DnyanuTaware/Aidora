import { Match } from "../models/MatchModel.js";
import { Scholarship } from "../models/scholarshipModel.js";
import { StudentProfile } from "../models/studentProfileModel.js";
import TryCatch from "../utils/TryCatch.js";

// 📘 Get all scholarships
export const getAllScholarships = TryCatch(async (req, res) => {
  const scholarships = await Scholarship.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, scholarships });
});

//score calculation
function calculateScore(student, scholarship) {
  let score = 0;
  let reason = [];

  const e = scholarship.eligibility;

  // 1️⃣ Marks Check
  if (student.marks >= e.minMarks) {
    score += 20;
    reason.push("Marks eligible");
  }

  // 2️⃣ Income Check
  if (student.annualIncome <= e.maxAnnualIncome) {
    score += 20;
    reason.push("Income eligible");
  }

  // 3️⃣ Category Check
  if (e.category.includes("All") || e.category.includes(student.category)) {
    score += 15;
    reason.push("Category matched");
  }

  // 4️⃣ Gender Check
  if (e.gender.includes("All") || e.gender.includes(student.gender)) {
    score += 10;
    reason.push("Gender matched");
  }

  // 5️⃣ State Check
  if (e.state.includes("All") || e.state.includes(student.state)) {
    score += 10;
    reason.push("State matched");
  }

  // 6️⃣ Education Level
  if (
    e.educationLevel.includes("All") ||
    e.educationLevel.includes(student.educationLevel)
  ) {
    score += 15;
    reason.push("Education level matched");
  }

  // 7️⃣ Religion
  if (e.religion.includes("All") || e.religion.includes(student.religion)) {
    score += 5;
    reason.push("Religion matched");
  }

  // 8️⃣ Disability
  if (
    e.disabilityStatus.includes("All") ||
    e.disabilityStatus.includes(student.disabilityStatus)
  ) {
    score += 5;
    reason.push("Disability criteria matched");
  }

  return {
    score,
    reason: reason.join(", "),
  };
}
// ✏️ Post a new scholarship
export const postScholarship = TryCatch(async (req, res) => {
  const organizationId = req.user._id; // from auth middleware
  const {
    title,
    provider,
    description,
    eligibility,
    applicationLink,
    lastDateToApply,
    documentsRequired,
    tags,
    verified,
  } = req.body;

  // ✅ Basic validation
  if (
    !title ||
    !provider ||
    !description ||
    !applicationLink ||
    !lastDateToApply
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }

  // ✅ Create scholarship entry
  const newScholarship = await Scholarship.create({
    organizationId,
    title,
    provider,
    description,
    eligibility,
    applicationLink,
    lastDateToApply,
    documentsRequired,
    tags,
    verified,
  });

  // 2. Get all students
  const students = await StudentProfile.find();

  // 3. Generate match entries
  const matchData = students.map((student) => {
    const { score, reason } = calculateScore(student, newScholarship);

    return {
      studentProfileId: student._id, // ✅ exact name
      scholarshipId: newScholarship._id, // ✅ exact name
      matchScore: score, // ✅ exact name
      matchReason: reason,
    };
  });

  // 4. Bulk insert
  await Match.insertMany(matchData);

  res.status(201).json({
    success: true,
    message: "Scholarship added successfully!",
    scholarship: newScholarship,
    matchedStudents: matchData,
  });
});

export const getSingleScholarship = TryCatch(async (req, res) => {
  const scholarship = await Scholarship.findById(req.params.id);
  if (!scholarship)
    return res.status(404).json({ message: "Scholarship not found" });

  res.status(200).json({ success: true, scholarship });
});

// Get all scholarships posted by the logged-in organization
export const getMyScholarships = TryCatch(async (req, res) => {
  const scholarships = await Scholarship.find({
    organizationId: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({ success: true, scholarships });
});

// Delete a scholarship by ID (only for logged-in organization)
export const deleteScholarship = TryCatch(async (req, res) => {
  const { id } = req.params;

  // Check if scholarship exists
  const scholarship = await Scholarship.findById(id);
  if (!scholarship) {
    return res
      .status(404)
      .json({ success: false, message: "Scholarship not found" });
  }

  // Ensure only the organization who created it can delete it
  if (scholarship.organizationId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this scholarship",
    });
  }

  // Delete the scholarship
  await Scholarship.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Scholarship deleted successfully",
  });
});
