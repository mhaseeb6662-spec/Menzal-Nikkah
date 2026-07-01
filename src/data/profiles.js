export const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Multan",
  "Faisalabad",
  "Rawalpindi",
  "Peshawar",
  "London",
  "Dubai",
  "Toronto",
];

export const castes = [
  "Rajput",
  "Sheikh",
  "Syed",
  "Malik",
  "Arain",
  "Jutt",
  "Awan",
  "Mughal",
  "Butt",
  "Other",
];

export const educationLevels = [
  "Bachelors",
  "Masters",
  "MBBS",
  "PhD",
  "Intermediate",
  "Diploma",
];

const maleNames = [
  "Ahmed Raza", "Bilal Hussain", "Usman Tariq", "Hamza Sheikh", "Ali Hassan",
  "Faizan Malik", "Zeeshan Ahmed", "Owais Khan", "Sami Ullah", "Kamran Butt",
  "Adeel Anwar", "Waqas Javed",
];
const femaleNames = [
  "Ayesha Siddiqui", "Fatima Noor", "Sana Malik", "Hina Aslam", "Mahnoor Khan",
  "Zainab Rizvi", "Iqra Farooq", "Amna Sheikh", "Komal Butt", "Sadia Iqbal",
  "Rabia Aziz", "Nimra Yousaf",
];

const maleImgs = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=60",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=60",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=60",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=60",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=60",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&q=60",
];
const femaleImgs = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=60",
  "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&q=60",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=60",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=60",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=60",
];

const professions = ["Software Engineer", "Doctor", "Teacher", "Business Owner", "Architect", "Accountant", "Civil Engineer", "Pharmacist"];
const educations = ["BS Computer Science", "MBBS", "MBA", "BSc Engineering", "MSc Economics", "BS Accounting & Finance", "PharmD", "BArch"];

function buildProfile(i, gender) {
  const isMale = gender === "male";
  const name = isMale ? maleNames[i % maleNames.length] : femaleNames[i % femaleNames.length];
  const photo = isMale ? maleImgs[i % maleImgs.length] : femaleImgs[i % femaleImgs.length];
  const city = cities[i % cities.length];
  const caste = castes[i % castes.length];
  const education = educations[i % educations.length];
  const profession = professions[i % professions.length];
  const age = isMale ? 26 + (i % 10) : 22 + (i % 9);

  return {
    id: `MAT-${10001 + i}`,
    name,
    gender,
    age,
    city,
    country: city === "London" || city === "Dubai" || city === "Toronto" ? city : "Pakistan",
    caste,
    sect: "Sunni",
    religion: "Islam",
    education,
    profession,
    income: isMale ? `PKR ${80 + (i % 6) * 20},000 - ${140 + (i % 6) * 20},000` : "Prefer not to say",
    height: isMale ? `5'${8 + (i % 4)}"` : `5'${2 + (i % 4)}"`,
    maritalStatus: "Never Married",
    photo,
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=60",
    gallery: [photo, isMale ? maleImgs[(i + 1) % maleImgs.length] : femaleImgs[(i + 1) % femaleImgs.length]],
    hiddenPhotos: 2,
    verified: i % 4 !== 3,
    about: `${name.split(" ")[0]} is a ${age}-year-old ${profession.toLowerCase()} based in ${city}, from a respected ${caste} family. Known for a calm, family-oriented nature and a strong sense of values, currently looking for a serious, marriage-minded proposal through the family.`,
    expectations: "Looking for a well-mannered, family-oriented partner from a respectable background, someone caring, understanding and committed to building a peaceful home together.",
    fatherOccupation: ["Retired Government Officer", "Businessman", "Retired Army Officer", "Farmer / Landowner"][i % 4],
    motherOccupation: "Homemaker",
    siblings: { brothers: 1 + (i % 3), sisters: 1 + ((i + 1) % 3) },
  };
}

export const profiles = [
  ...Array.from({ length: 12 }).map((_, i) => buildProfile(i, "male")),
  ...Array.from({ length: 12 }).map((_, i) => buildProfile(i + 12, "female")),
];

export function getProfileById(id) {
  return profiles.find((p) => p.id === id);
}
