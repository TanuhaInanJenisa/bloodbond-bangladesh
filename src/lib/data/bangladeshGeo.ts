export interface Division {
  id: string;
  name: string;
  bnName: string;
}

export interface District {
  id: string;
  divisionId: string;
  name: string;
  bnName: string;
}

export interface Upazila {
  id: string;
  districtId: string;
  name: string;
  bnName: string;
}

export const BANGLADESH_DIVISIONS: Division[] = [
  { id: "dhaka", name: "Dhaka", bnName: "ঢাকা" },
  { id: "chattogram", name: "Chattogram", bnName: "চট্টগ্রাম" },
  { id: "rajshahi", name: "Rajshahi", bnName: "রাজশাহী" },
  { id: "khulna", name: "Khulna", bnName: "খুলনা" },
  { id: "barishal", name: "Barishal", bnName: "বরিশাল" },
  { id: "sylhet", name: "Sylhet", bnName: "সিলেট" },
  { id: "rangpur", name: "Rangpur", bnName: "রংপুর" },
  { id: "mymensingh", name: "Mymensingh", bnName: "ময়মনসিংহ" },
];

export const BANGLADESH_DISTRICTS: District[] = [
  // Dhaka Division (13 districts)
  { id: "dhaka_dist", divisionId: "dhaka", name: "Dhaka", bnName: "ঢাকা" },
  { id: "gazipur", divisionId: "dhaka", name: "Gazipur", bnName: "গাজীপুর" },
  { id: "narayanganj", divisionId: "dhaka", name: "Narayanganj", bnName: "নারায়ণগঞ্জ" },
  { id: "tangail", divisionId: "dhaka", name: "Tangail", bnName: "টাঙ্গাইল" },
  { id: "faridpur", divisionId: "dhaka", name: "Faridpur", bnName: "ফরিদপুর" },
  { id: "gopalganj", divisionId: "dhaka", name: "Gopalganj", bnName: "গোপালগঞ্জ" },
  { id: "kishoreganj", divisionId: "dhaka", name: "Kishoreganj", bnName: "কিশোরগঞ্জ" },
  { id: "madaripur", divisionId: "dhaka", name: "Madaripur", bnName: "মাদারীপুর" },
  { id: "manikganj", divisionId: "dhaka", name: "Manikganj", bnName: "মানিকগঞ্জ" },
  { id: "munshiganj", divisionId: "dhaka", name: "Munshiganj", bnName: "মুন্সীগঞ্জ" },
  { id: "narsingdi", divisionId: "dhaka", name: "Narsingdi", bnName: "নরসিংদী" },
  { id: "rajbari", divisionId: "dhaka", name: "Rajbari", bnName: "রাজবাড়ী" },
  { id: "shariatpur", divisionId: "dhaka", name: "Shariatpur", bnName: "শরীয়তপুর" },

  // Chattogram Division (11 districts)
  { id: "chattogram_dist", divisionId: "chattogram", name: "Chattogram", bnName: "চট্টগ্রাম" },
  { id: "coxs_bazar", divisionId: "chattogram", name: "Cox's Bazar", bnName: "কক্সবাজার" },
  { id: "cumilla", divisionId: "chattogram", name: "Cumilla", bnName: "কুমিল্লা" },
  { id: "feni", divisionId: "chattogram", name: "Feni", bnName: "ফেনী" },
  { id: "brahmanbaria", divisionId: "chattogram", name: "Brahmanbaria", bnName: "ব্রাহ্মণবাড়িয়া" },
  { id: "chandpur", divisionId: "chattogram", name: "Chandpur", bnName: "চাঁদপুর" },
  { id: "lakshmipur", divisionId: "chattogram", name: "Lakshmipur", bnName: "লক্ষ্মীপুর" },
  { id: "noakhali", divisionId: "chattogram", name: "Noakhali", bnName: "নোয়াখালী" },
  { id: "bandarban", divisionId: "chattogram", name: "Bandarban", bnName: "বান্দরবান" },
  { id: "khagrachhari", divisionId: "chattogram", name: "Khagrachhari", bnName: "খাগড়াছড়ি" },
  { id: "rangamati", divisionId: "chattogram", name: "Rangamati", bnName: "রাঙ্গামাটি" },

  // Rajshahi Division (8 districts)
  { id: "rajshahi_dist", divisionId: "rajshahi", name: "Rajshahi", bnName: "রাজশাহী" },
  { id: "bogura", divisionId: "rajshahi", name: "Bogura", bnName: "বগুড়া" },
  { id: "joypurhat", divisionId: "rajshahi", name: "Joypurhat", bnName: "জয়পুরহাট" },
  { id: "naogaon", divisionId: "rajshahi", name: "Naogaon", bnName: "নওগাঁ" },
  { id: "natore", divisionId: "rajshahi", name: "Natore", bnName: "নাটোর" },
  { id: "chapai_nawabganj", divisionId: "rajshahi", name: "Chapai Nawabganj", bnName: "চাঁপাইনবাবগঞ্জ" },
  { id: "pabna", divisionId: "rajshahi", name: "Pabna", bnName: "পাবনা" },
  { id: "sirajganj", divisionId: "rajshahi", name: "Sirajganj", bnName: "সিরাজগঞ্জ" },

  // Khulna Division (10 districts)
  { id: "khulna_dist", divisionId: "khulna", name: "Khulna", bnName: "খুলনা" },
  { id: "bagerhat", divisionId: "khulna", name: "Bagerhat", bnName: "বাগেরহাট" },
  { id: "chuadanga", divisionId: "khulna", name: "Chuadanga", bnName: "চুয়াডাঙ্গা" },
  { id: "jashore", divisionId: "khulna", name: "Jashore", bnName: "যশোর" },
  { id: "jhenaidah", divisionId: "khulna", name: "Jhenaidah", bnName: "ঝিনাইদহ" },
  { id: "kushtia", divisionId: "khulna", name: "Kushtia", bnName: "কুষ্টিয়া" },
  { id: "magura", divisionId: "khulna", name: "Magura", bnName: "মাগুরা" },
  { id: "meherpur", divisionId: "khulna", name: "Meherpur", bnName: "মেহেরপুর" },
  { id: "narail", divisionId: "khulna", name: "Narail", bnName: "নড়াইল" },
  { id: "satkhira", divisionId: "khulna", name: "Satkhira", bnName: "সাতক্ষীরা" },

  // Barishal Division (6 districts)
  { id: "barishal_dist", divisionId: "barishal", name: "Barishal", bnName: "বরিশাল" },
  { id: "barguna", divisionId: "barishal", name: "Barguna", bnName: "বরগুনা" },
  { id: "bhola", divisionId: "barishal", name: "Bhola", bnName: "ভোলা" },
  { id: "jhalokati", divisionId: "barishal", name: "Jhalokati", bnName: "ঝালকাঠি" },
  { id: "patuakhali", divisionId: "barishal", name: "Patuakhali", bnName: "পটুয়াখালী" },
  { id: "pirojpur", divisionId: "barishal", name: "Pirojpur", bnName: "পিরোজপুর" },

  // Sylhet Division (4 districts)
  { id: "sylhet_dist", divisionId: "sylhet", name: "Sylhet", bnName: "সিলেট" },
  { id: "habiganj", divisionId: "sylhet", name: "Habiganj", bnName: "হবিগঞ্জ" },
  { id: "moulvibazar", divisionId: "sylhet", name: "Moulvibazar", bnName: "মৌলভীবাজার" },
  { id: "sunamganj", divisionId: "sylhet", name: "Sunamganj", bnName: "সুনামগঞ্জ" },

  // Rangpur Division (8 districts)
  { id: "rangpur_dist", divisionId: "rangpur", name: "Rangpur", bnName: "রংপুর" },
  { id: "dinajpur", divisionId: "rangpur", name: "Dinajpur", bnName: "দিনাজপুর" },
  { id: "gaibandha", divisionId: "rangpur", name: "Gaibandha", bnName: "গাইবান্ধা" },
  { id: "kurigram", divisionId: "rangpur", name: "Kurigram", bnName: "কুড়িগ্রাম" },
  { id: "lalmonirhat", divisionId: "rangpur", name: "Lalmonirhat", bnName: "লালমনিরহাট" },
  { id: "nilphamari", divisionId: "rangpur", name: "Nilphamari", bnName: "নীলফামারী" },
  { id: "panchagarh", divisionId: "rangpur", name: "Panchagarh", bnName: "পঞ্চগড়" },
  { id: "thakurgaon", divisionId: "rangpur", name: "Thakurgaon", bnName: "ঠাকুরগাঁও" },

  // Mymensingh Division (4 districts)
  { id: "mymensingh_dist", divisionId: "mymensingh", name: "Mymensingh", bnName: "ময়মনসিংহ" },
  { id: "jamalpur", divisionId: "mymensingh", name: "Jamalpur", bnName: "জামালপুর" },
  { id: "netrokona", divisionId: "mymensingh", name: "Netrokona", bnName: "নেত্রকোণা" },
  { id: "sherpur", divisionId: "mymensingh", name: "Sherpur", bnName: "শেরপুর" },
];

export const BANGLADESH_UPAZILAS: Upazila[] = [
  // Dhaka District Thanas & Upazilas
  { id: "dhanmondi", districtId: "dhaka_dist", name: "Dhanmondi", bnName: "ধানমন্ডি" },
  { id: "gulshan", districtId: "dhaka_dist", name: "Gulshan", bnName: "গুলশান" },
  { id: "banani", districtId: "dhaka_dist", name: "Banani", bnName: "বনানী" },
  { id: "mirpur", districtId: "dhaka_dist", name: "Mirpur", bnName: "মিরপুর" },
  { id: "uttara", districtId: "dhaka_dist", name: "Uttara", bnName: "উত্তরা" },
  { id: "mohammadpur", districtId: "dhaka_dist", name: "Mohammadpur", bnName: "মোহাম্মদপুর" },
  { id: "motijheel", districtId: "dhaka_dist", name: "Motijheel", bnName: "মতিঝিল" },
  { id: "khilgaon", districtId: "dhaka_dist", name: "Khilgaon", bnName: "খিলগাঁও" },
  { id: "badda", districtId: "dhaka_dist", name: "Badda", bnName: "বাড্ডা" },
  { id: "tejgaon", districtId: "dhaka_dist", name: "Tejgaon", bnName: "তেজগাঁও" },
  { id: "ramna", districtId: "dhaka_dist", name: "Ramna", bnName: "রমনা" },
  { id: "shahbagh", districtId: "dhaka_dist", name: "Shahbagh", bnName: "শাহবাগ" },
  { id: "paltan", districtId: "dhaka_dist", name: "Paltan", bnName: "পল্টন" },
  { id: "jatrabari", districtId: "dhaka_dist", name: "Jatrabari", bnName: "যাত্রাবাড়ী" },
  { id: "savar", districtId: "dhaka_dist", name: "Savar", bnName: "সাভার" },
  { id: "dhamrai", districtId: "dhaka_dist", name: "Dhamrai", bnName: "ধামরাই" },
  { id: "keraniganj", districtId: "dhaka_dist", name: "Keraniganj", bnName: "কেরানীগঞ্জ" },
  { id: "nawabganj_dh", districtId: "dhaka_dist", name: "Nawabganj", bnName: "নবাবগঞ্জ" },
  { id: "dohar", districtId: "dhaka_dist", name: "Dohar", bnName: "দোহার" },

  // Gazipur
  { id: "gazipur_sadar", districtId: "gazipur", name: "Gazipur Sadar", bnName: "গাজীপুর সদর" },
  { id: "tongi", districtId: "gazipur", name: "Tongi", bnName: "টঙ্গী" },
  { id: "kaliakair", districtId: "gazipur", name: "Kaliakair", bnName: "কালিয়াকৈর" },
  { id: "sreepur", districtId: "gazipur", name: "Sreepur", bnName: "শ্রীপুর" },
  { id: "kapasia", districtId: "gazipur", name: "Kapasia", bnName: "কাপাসিয়া" },
  { id: "kaliganj_gz", districtId: "gazipur", name: "Kaliganj", bnName: "কালীগঞ্জ" },

  // Narayanganj
  { id: "narayanganj_sadar", districtId: "narayanganj", name: "Narayanganj Sadar", bnName: "নারায়ণগঞ্জ সদর" },
  { id: "fatullah", districtId: "narayanganj", name: "Fatullah", bnName: "ফতুল্লা" },
  { id: "siddhirganj", districtId: "narayanganj", name: "Siddhirganj", bnName: "সিদ্ধিরগঞ্জ" },
  { id: "sonargaon", districtId: "narayanganj", name: "Sonargaon", bnName: "সোনারগাঁও" },
  { id: "rupganj", districtId: "narayanganj", name: "Rupganj", bnName: "রূপগঞ্জ" },
  { id: "araihazar", districtId: "narayanganj", name: "Araihazar", bnName: "আড়াইহাজার" },
  { id: "bandar_ng", districtId: "narayanganj", name: "Bandar", bnName: "বন্দর" },

  // Tangail
  { id: "tangail_sadar", districtId: "tangail", name: "Tangail Sadar", bnName: "টাঙ্গাইল সদর" },
  { id: "mirzapur", districtId: "tangail", name: "Mirzapur", bnName: "মির্জাপুর" },
  { id: "kalihati", districtId: "tangail", name: "Kalihati", bnName: "কালিহাতী" },
  { id: "madhupur", districtId: "tangail", name: "Madhupur", bnName: "মধুপুর" },
  { id: "sakhipur", districtId: "tangail", name: "Sakhipur", bnName: "সখিপুর" },
  { id: "ghatail", districtId: "tangail", name: "Ghatail", bnName: "ঘাটাইল" },
  { id: "gopalpur", districtId: "tangail", name: "Gopalpur", bnName: "গোপালপুর" },
  { id: "delduar", districtId: "tangail", name: "Delduar", bnName: "দেলদুয়ার" },
  { id: "bhuapur", districtId: "tangail", name: "Bhuapur", bnName: "ভূঞাপুর" },
  { id: "nagarpur", districtId: "tangail", name: "Nagarpur", bnName: "নাগরপুর" },

  // Faridpur
  { id: "faridpur_sadar", districtId: "faridpur", name: "Faridpur Sadar", bnName: "ফরিদপুর সদর" },
  { id: "bhanga", districtId: "faridpur", name: "Bhanga", bnName: "ভাঙ্গা" },
  { id: "boalmari", districtId: "faridpur", name: "Boalmari", bnName: "বোয়ালমারী" },
  { id: "madhukhali", districtId: "faridpur", name: "Madhukhali", bnName: "মধুখালী" },
  { id: "nagarkanda", districtId: "faridpur", name: "Nagarkanda", bnName: "নগরকান্দা" },
  { id: "alfadanga", districtId: "faridpur", name: "Alfadanga", bnName: "আলফাডাঙ্গা" },
  { id: "sadarpur", districtId: "faridpur", name: "Sadarpur", bnName: "সদরপুর" },

  // Gopalganj
  { id: "gopalganj_sadar", districtId: "gopalganj", name: "Gopalganj Sadar", bnName: "গোপালগঞ্জ সদর" },
  { id: "tungipara", districtId: "gopalganj", name: "Tungipara", bnName: "টুঙ্গিপাড়া" },
  { id: "kotalipara", districtId: "gopalganj", name: "Kotalipara", bnName: "কোটালীপাড়া" },
  { id: "kashiani", districtId: "gopalganj", name: "Kashiani", bnName: "কাশিয়ানী" },
  { id: "muksudpur", districtId: "gopalganj", name: "Muksudpur", bnName: "মুকসুদপুর" },

  // Kishoreganj
  { id: "kishoreganj_sadar", districtId: "kishoreganj", name: "Kishoreganj Sadar", bnName: "কিশোরগঞ্জ সদর" },
  { id: "bhairab", districtId: "kishoreganj", name: "Bhairab", bnName: "ভৈরব" },
  { id: "bajitpur", districtId: "kishoreganj", name: "Bajitpur", bnName: "বাজিতপুর" },
  { id: "karimganj", districtId: "kishoreganj", name: "Karimganj", bnName: "করিমগঞ্জ" },
  { id: "katiadi", districtId: "kishoreganj", name: "Katiadi", bnName: "কটিয়াদী" },
  { id: "kuliarchar", districtId: "kishoreganj", name: "Kuliarchar", bnName: "কুলিয়ারচর" },
  { id: "pakundia", districtId: "kishoreganj", name: "Pakundia", bnName: "পাকুন্দিয়া" },

  // Madaripur
  { id: "madaripur_sadar", districtId: "madaripur", name: "Madaripur Sadar", bnName: "মাদারীপুর সদর" },
  { id: "shibchar", districtId: "madaripur", name: "Shibchar", bnName: "শিবচর" },
  { id: "kalkini", districtId: "madaripur", name: "Kalkini", bnName: "কালকিনি" },
  { id: "rajoir", districtId: "madaripur", name: "Rajoir", bnName: "রাজৈর" },

  // Manikganj
  { id: "manikganj_sadar", districtId: "manikganj", name: "Manikganj Sadar", bnName: "মানিকগঞ্জ সদর" },
  { id: "singair", districtId: "manikganj", name: "Singair", bnName: "সিংগাইর" },
  { id: "saturia", districtId: "manikganj", name: "Saturia", bnName: "সাটুরিয়া" },
  { id: "shivalaya", districtId: "manikganj", name: "Shivalaya", bnName: "শিবালয়" },
  { id: "harirampur", districtId: "manikganj", name: "Harirampur", bnName: "হরিরামপুর" },

  // Munshiganj
  { id: "munshiganj_sadar", districtId: "munshiganj", name: "Munshiganj Sadar", bnName: "মুন্সীগঞ্জ সদর" },
  { id: "sreenagar", districtId: "munshiganj", name: "Sreenagar", bnName: "শ্রীনগর" },
  { id: "sirajdikhan", districtId: "munshiganj", name: "Sirajdikhan", bnName: "সিরাজদিখান" },
  { id: "louhajang", districtId: "munshiganj", name: "Louhajang", bnName: "লৌহজং" },
  { id: "tongibari", districtId: "munshiganj", name: "Tongibari", bnName: "টংগিবাড়ী" },
  { id: "gazaria", districtId: "munshiganj", name: "Gazaria", bnName: "গজারিয়া" },

  // Narsingdi
  { id: "narsingdi_sadar", districtId: "narsingdi", name: "Narsingdi Sadar", bnName: "নরসিংদী সদর" },
  { id: "shibpur", districtId: "narsingdi", name: "Shibpur", bnName: "শিবপুর" },
  { id: "raipura", districtId: "narsingdi", name: "Raipura", bnName: "রায়পুরা" },
  { id: "belabo", districtId: "narsingdi", name: "Belabo", bnName: "বেলাবো" },
  { id: "monohardi", districtId: "narsingdi", name: "Monohardi", bnName: "মনোহরদী" },
  { id: "palash", districtId: "narsingdi", name: "Palash", bnName: "পলাশ" },

  // Rajbari
  { id: "rajbari_sadar", districtId: "rajbari", name: "Rajbari Sadar", bnName: "রাজবাড়ী সদর" },
  { id: "goalanda", districtId: "rajbari", name: "Goalanda", bnName: "গোয়ালন্দ" },
  { id: "pangsha", districtId: "rajbari", name: "Pangsha", bnName: "পাংশা" },
  { id: "baliakandi", districtId: "rajbari", name: "Baliakandi", bnName: "বালিয়াকান্দি" },

  // Shariatpur
  { id: "shariatpur_sadar", districtId: "shariatpur", name: "Shariatpur Sadar", bnName: "শরীয়তপুর সদর" },
  { id: "naria", districtId: "shariatpur", name: "Naria", bnName: "নড়িয়া" },
  { id: "zajira", districtId: "shariatpur", name: "Zajira", bnName: "জাজিরা" },
  { id: "bhedarganj", districtId: "shariatpur", name: "Bhedarganj", bnName: "ভেদরগঞ্জ" },
  { id: "damudya", districtId: "shariatpur", name: "Damudya", bnName: "ডামুড্যা" },

  // Chattogram City & Upazilas
  { id: "panchlaish", districtId: "chattogram_dist", name: "Panchlaish", bnName: "পাঁচলাইশ" },
  { id: "kotwali_ctg", districtId: "chattogram_dist", name: "Kotwali", bnName: "কোতোয়ালী" },
  { id: "agrabad", districtId: "chattogram_dist", name: "Agrabad", bnName: "আগ্রাবাদ" },
  { id: "halishahar", districtId: "chattogram_dist", name: "Halishahar", bnName: "হালিশহর" },
  { id: "chandgaon", districtId: "chattogram_dist", name: "Chandgaon", bnName: "চাঁন্দগাঁও" },
  { id: "pahartali", districtId: "chattogram_dist", name: "Pahartali", bnName: "পাহাড়তলী" },
  { id: "khulshi", districtId: "chattogram_dist", name: "Khulshi", bnName: "খুলশী" },
  { id: "hathazari", districtId: "chattogram_dist", name: "Hathazari", bnName: "হাটহাজারী" },
  { id: "sitakunda", districtId: "chattogram_dist", name: "Sitakunda", bnName: "সীতাকুণ্ড" },
  { id: "mirsharai", districtId: "chattogram_dist", name: "Mirsharai", bnName: "মীরসরাই" },
  { id: "patiya", districtId: "chattogram_dist", name: "Patiya", bnName: "পটিয়া" },
  { id: "boalkhali", districtId: "chattogram_dist", name: "Boalkhali", bnName: "বোয়ালখালী" },
  { id: "anwara", districtId: "chattogram_dist", name: "Anwara", bnName: "আনোয়ারা" },
  { id: "raozan", districtId: "chattogram_dist", name: "Raozan", bnName: "রাউজান" },
  { id: "fatikchhari", districtId: "chattogram_dist", name: "Fatikchhari", bnName: "ফটিকছড়ি" },
  { id: "sandwip", districtId: "chattogram_dist", name: "Sandwip", bnName: "সন্দ্বীপ" },

  // Cox's Bazar
  { id: "coxs_bazar_sadar", districtId: "coxs_bazar", name: "Cox's Bazar Sadar", bnName: "কক্সবাজার সদর" },
  { id: "chakaria", districtId: "coxs_bazar", name: "Chakaria", bnName: "চকোরিয়া" },
  { id: "teknaf", districtId: "coxs_bazar", name: "Teknaf", bnName: "টেকনাফ" },
  { id: "ramu", districtId: "coxs_bazar", name: "Ramu", bnName: "রামু" },
  { id: "ukhiya", districtId: "coxs_bazar", name: "Ukhiya", bnName: "উখিয়া" },
  { id: "pekua", districtId: "coxs_bazar", name: "Pekua", bnName: "পেকুয়া" },
  { id: "kutubdia", districtId: "coxs_bazar", name: "Kutubdia", bnName: "কুতুবদিয়া" },
  { id: "moheshkhali", districtId: "coxs_bazar", name: "Moheshkhali", bnName: "মহেশখালী" },

  // Cumilla
  { id: "cumilla_adarsha_sadar", districtId: "cumilla", name: "Adarsha Sadar", bnName: "আদর্শ সদর" },
  { id: "cumilla_sadar_dakshin", districtId: "cumilla", name: "Sadar Dakshin", bnName: "সদর দক্ষিণ" },
  { id: "daudkandi", districtId: "cumilla", name: "Daudkandi", bnName: "দাউদকান্দি" },
  { id: "chandina", districtId: "cumilla", name: "Chandina", bnName: "চান্দিনা" },
  { id: "laksam", districtId: "cumilla", name: "Laksam", bnName: "লাকসাম" },
  { id: "debidwar", districtId: "cumilla", name: "Debidwar", bnName: "দেবিদ্বার" },
  { id: "burichang", districtId: "cumilla", name: "Burichang", bnName: "বুড়িচং" },
  { id: "brahmanpara", districtId: "cumilla", name: "Brahmanpara", bnName: "ব্রাহ্মণপাড়া" },
  { id: "chauddagram", districtId: "cumilla", name: "Chauddagram", bnName: "চৌদ্দগ্রাম" },
  { id: "muradnagar", districtId: "cumilla", name: "Muradnagar", bnName: "মুরাদনগর" },

  // Feni
  { id: "feni_sadar", districtId: "feni", name: "Feni Sadar", bnName: "ফেনী সদর" },
  { id: "daganbhuiyan", districtId: "feni", name: "Daganbhuiyan", bnName: "দাগনভূঞা" },
  { id: "chhagalnaiya", districtId: "feni", name: "Chhagalnaiya", bnName: "ছাগলনাইয়া" },
  { id: "sonagazi", districtId: "feni", name: "Sonagazi", bnName: "সোনাগাজী" },
  { id: "parshuram", districtId: "feni", name: "Parshuram", bnName: "পরশুরাম" },
  { id: "fulgazi", districtId: "feni", name: "Fulgazi", bnName: "ফুলগাজী" },

  // Brahmanbaria
  { id: "brahmanbaria_sadar", districtId: "brahmanbaria", name: "Brahmanbaria Sadar", bnName: "ব্রাহ্মণবাড়িয়া সদর" },
  { id: "ashuganj", districtId: "brahmanbaria", name: "Ashuganj", bnName: "আশুগঞ্জ" },
  { id: "kasba", districtId: "brahmanbaria", name: "Kasba", bnName: "কসবা" },
  { id: "akhaura", districtId: "brahmanbaria", name: "Akhaura", bnName: "আখাউড়া" },
  { id: "nabinagar", districtId: "brahmanbaria", name: "Nabinagar", bnName: "নবীনগর" },
  { id: "sarail", districtId: "brahmanbaria", name: "Sarail", bnName: "সরাইল" },

  // Chandpur
  { id: "chandpur_sadar", districtId: "chandpur", name: "Chandpur Sadar", bnName: "চাঁদপুর সদর" },
  { id: "hajiganj", districtId: "chandpur", name: "Hajiganj", bnName: "হাজীগঞ্জ" },
  { id: "faridganj", districtId: "chandpur", name: "Faridganj", bnName: "ফরিদগঞ্জ" },
  { id: "matlab_uttar", districtId: "chandpur", name: "Matlab Uttar", bnName: "মতলব উত্তর" },
  { id: "matlab_dakshin", districtId: "chandpur", name: "Matlab Dakshin", bnName: "মতলব দক্ষিণ" },
  { id: "shahrasti", districtId: "chandpur", name: "Shahrasti", bnName: "শাহরাস্তি" },
  { id: "kachua_cp", districtId: "chandpur", name: "Kachua", bnName: "কচুয়া" },

  // Lakshmipur
  { id: "lakshmipur_sadar", districtId: "lakshmipur", name: "Lakshmipur Sadar", bnName: "লক্ষ্মীপুর সদর" },
  { id: "raipur", districtId: "lakshmipur", name: "Raipur", bnName: "রায়পুর" },
  { id: "ramganj", districtId: "lakshmipur", name: "Ramganj", bnName: "রামগঞ্জ" },
  { id: "ramgati", districtId: "lakshmipur", name: "Ramgati", bnName: "রামগতি" },
  { id: "kamalnagar", districtId: "lakshmipur", name: "Kamalnagar", bnName: "কমলনগর" },

  // Noakhali
  { id: "noakhali_sadar", districtId: "noakhali", name: "Noakhali Sadar", bnName: "নোয়াখালী সদর" },
  { id: "begumganj", districtId: "noakhali", name: "Begumganj", bnName: "বেগমগঞ্জ" },
  { id: "senbagh", districtId: "noakhali", name: "Senbagh", bnName: "সেনবাগ" },
  { id: "chatkhil", districtId: "noakhali", name: "Chatkhil", bnName: "চাটখিল" },
  { id: "companiganj", districtId: "noakhali", name: "Companiganj", bnName: "কোম্পানীগঞ্জ" },
  { id: "hatiya", districtId: "noakhali", name: "Hatiya", bnName: "হাতিয়া" },
  { id: "subarnachar", districtId: "noakhali", name: "Subarnachar", bnName: "সুবর্ণচর" },

  // Bandarban
  { id: "bandarban_sadar", districtId: "bandarban", name: "Bandarban Sadar", bnName: "বান্দরবান সদর" },
  { id: "ruma", districtId: "bandarban", name: "Ruma", bnName: "রুমা" },
  { id: "thanchi", districtId: "bandarban", name: "Thanchi", bnName: "থানচি" },
  { id: "lama", districtId: "bandarban", name: "Lama", bnName: "লামা" },
  { id: "alikadam", districtId: "bandarban", name: "Alikadam", bnName: "আলীকদম" },

  // Khagrachhari
  { id: "khagrachhari_sadar", districtId: "khagrachhari", name: "Khagrachhari Sadar", bnName: "খাগড়াছড়ি সদর" },
  { id: "dighinala", districtId: "khagrachhari", name: "Dighinala", bnName: "দীঘিনালা" },
  { id: "panchhari", districtId: "khagrachhari", name: "Panchhari", bnName: "পানছড়ি" },
  { id: "matiranga", districtId: "khagrachhari", name: "Matiranga", bnName: "মাটিরাঙ্গা" },
  { id: "ramgarh", districtId: "khagrachhari", name: "Ramgarh", bnName: "রামগড়" },

  // Rangamati
  { id: "rangamati_sadar", districtId: "rangamati", name: "Rangamati Sadar", bnName: "রাঙ্গামাটি সদর" },
  { id: "kaptai", districtId: "rangamati", name: "Kaptai", bnName: "কাপ্তাই" },
  { id: "baghaichhari", districtId: "rangamati", name: "Baghaichhari", bnName: "বাঘাইছড়ি" },
  { id: "barkal", districtId: "rangamati", name: "Barkal", bnName: "বরকল" },
  { id: "langadu", districtId: "rangamati", name: "Langadu", bnName: "লংগদু" },

  // Rajshahi
  { id: "boalia", districtId: "rajshahi_dist", name: "Boalia", bnName: "বোয়ালিয়া" },
  { id: "motihar", districtId: "rajshahi_dist", name: "Motihar", bnName: "মতিহার" },
  { id: "rajpara", districtId: "rajshahi_dist", name: "Rajpara", bnName: "রাজপাড়া" },
  { id: "chandrima", districtId: "rajshahi_dist", name: "Chandrima", bnName: "চন্দ্রিমা" },
  { id: "paba", districtId: "rajshahi_dist", name: "Paba", bnName: "পবা" },
  { id: "godagari", districtId: "rajshahi_dist", name: "Godagari", bnName: "গোদাগাড়ী" },
  { id: "tanore", districtId: "rajshahi_dist", name: "Tanore", bnName: "তানোর" },
  { id: "bagmara", districtId: "rajshahi_dist", name: "Bagmara", bnName: "বাগমারা" },
  { id: "puthia", districtId: "rajshahi_dist", name: "Puthia", bnName: "পুঠিয়া" },

  // Bogura
  { id: "bogura_sadar", districtId: "bogura", name: "Bogura Sadar", bnName: "বগুড়া সদর" },
  { id: "shajahanpur", districtId: "bogura", name: "Shajahanpur", bnName: "শাজাহানপুর" },
  { id: "sherpur_bg", districtId: "bogura", name: "Sherpur", bnName: "শেরপুর" },
  { id: "shibganj_bg", districtId: "bogura", name: "Shibganj", bnName: "শিবগঞ্জ" },
  { id: "gabtali", districtId: "bogura", name: "Gabtali", bnName: "গাবতলী" },
  { id: "dhunat", districtId: "bogura", name: "Dhunat", bnName: "ধুনট" },
  { id: "kahaloo", districtId: "bogura", name: "Kahaloo", bnName: "কাহালু" },

  // Joypurhat
  { id: "joypurhat_sadar", districtId: "joypurhat", name: "Joypurhat Sadar", bnName: "জয়পুরহাট সদর" },
  { id: "panchbibi", districtId: "joypurhat", name: "Panchbibi", bnName: "পাঁচবিবি" },
  { id: "kalai", districtId: "joypurhat", name: "Kalai", bnName: "কালাই" },
  { id: "akkelpur", districtId: "joypurhat", name: "Akkelpur", bnName: "আক্কেলপুর" },

  // Naogaon
  { id: "naogaon_sadar", districtId: "naogaon", name: "Naogaon Sadar", bnName: "নওগাঁ সদর" },
  { id: "mohadevpur", districtId: "naogaon", name: "Mohadevpur", bnName: "মহাদেবপুর" },
  { id: "manda", districtId: "naogaon", name: "Manda", bnName: "মান্দা" },
  { id: "patnitala", districtId: "naogaon", name: "Patnitala", bnName: "পত্নীতলা" },
  { id: "badalgachhi", districtId: "naogaon", name: "Badalgachhi", bnName: "বদলগাছী" },

  // Natore
  { id: "natore_sadar", districtId: "natore", name: "Natore Sadar", bnName: "নাটোর সদর" },
  { id: "singra", districtId: "natore", name: "Singra", bnName: "সিংড়া" },
  { id: "baraigram", districtId: "natore", name: "Baraigram", bnName: "বড়াইগ্রাম" },
  { id: "gurudaspur", districtId: "natore", name: "Gurudaspur", bnName: "গুরুদাসপুর" },
  { id: "lalpur", districtId: "natore", name: "Lalpur", bnName: "লালপুর" },

  // Chapai Nawabganj
  { id: "nawabganj_sadar", districtId: "chapai_nawabganj", name: "Chapai Sadar", bnName: "চাঁপাইনবাবগঞ্জ সদর" },
  { id: "shibganj_cn", districtId: "chapai_nawabganj", name: "Shibganj", bnName: "শিবগঞ্জ" },
  { id: "gomastapur", districtId: "chapai_nawabganj", name: "Gomastapur", bnName: "গোমস্তাপুর" },
  { id: "nachole", districtId: "chapai_nawabganj", name: "Nachole", bnName: "নাচোল" },

  // Pabna
  { id: "pabna_sadar", districtId: "pabna", name: "Pabna Sadar", bnName: "পাবনা সদর" },
  { id: "ishwardi", districtId: "pabna", name: "Ishwardi", bnName: "ঈশ্বরদী" },
  { id: "santhia", districtId: "pabna", name: "Santhia", bnName: "সাঁথিয়া" },
  { id: "bera", districtId: "pabna", name: "Bera", bnName: "বেড়া" },
  { id: "sujanagar", districtId: "pabna", name: "Sujanagar", bnName: "সুজানগর" },
  { id: "chatmohar", districtId: "pabna", name: "Chatmohar", bnName: "চাটমোহর" },

  // Sirajganj
  { id: "sirajganj_sadar", districtId: "sirajganj", name: "Sirajganj Sadar", bnName: "সিরাজগঞ্জ সদর" },
  { id: "shahjadpur", districtId: "sirajganj", name: "Shahjadpur", bnName: "শাহজাদপুর" },
  { id: "ullapara", districtId: "sirajganj", name: "Ullapara", bnName: "উল্লাপাড়া" },
  { id: "belkuchi", districtId: "sirajganj", name: "Belkuchi", bnName: "বেলকুচি" },
  { id: "kazipur", districtId: "sirajganj", name: "Kazipur", bnName: "কাজীপুর" },

  // Khulna City & Upazilas
  { id: "khulna_sadar", districtId: "khulna_dist", name: "Khulna Sadar", bnName: "খুলনা সদর" },
  { id: "sonadanga", districtId: "khulna_dist", name: "Sonadanga", bnName: "সোনাডাঙ্গা" },
  { id: "khalishpur", districtId: "khulna_dist", name: "Khalishpur", bnName: "খালিশপুর" },
  { id: "daulatpur", districtId: "khulna_dist", name: "Daulatpur", bnName: "দৌলতপুর" },
  { id: "dumuria", districtId: "khulna_dist", name: "Dumuria", bnName: "ডুমুরিয়া" },
  { id: "batiaghata", districtId: "khulna_dist", name: "Batiaghata", bnName: "বটিয়াঘাটা" },
  { id: "rupsha", districtId: "khulna_dist", name: "Rupsha", bnName: "রূপসা" },
  { id: "paikgachha", districtId: "khulna_dist", name: "Paikgachha", bnName: "পাইকগাছা" },

  // Bagerhat
  { id: "bagerhat_sadar", districtId: "bagerhat", name: "Bagerhat Sadar", bnName: "বাগেরহাট সদর" },
  { id: "mongla", districtId: "bagerhat", name: "Mongla", bnName: "মোংলা" },
  { id: "morrelganj", districtId: "bagerhat", name: "Morrelganj", bnName: "মোরেলগঞ্জ" },
  { id: "sharankhola", districtId: "bagerhat", name: "Sharankhola", bnName: "শরণখোলা" },
  { id: "rampal", districtId: "bagerhat", name: "Rampal", bnName: "রামপাল" },

  // Chuadanga
  { id: "chuadanga_sadar", districtId: "chuadanga", name: "Chuadanga Sadar", bnName: "চুয়াডাঙ্গা সদর" },
  { id: "alamdanga", districtId: "chuadanga", name: "Alamdanga", bnName: "আলমডাঙ্গা" },
  { id: "damurhuda", districtId: "chuadanga", name: "Damurhuda", bnName: "দামুড়হুদা" },
  { id: "jibannagar", districtId: "chuadanga", name: "Jibannagar", bnName: "জীবননগর" },

  // Jashore
  { id: "jashore_sadar", districtId: "jashore", name: "Jashore Sadar", bnName: "যশোর সদর" },
  { id: "jhikargachha", districtId: "jashore", name: "Jhikargachha", bnName: "ঝিকরগাছা" },
  { id: "sharsha", districtId: "jashore", name: "Sharsha", bnName: "শার্শা" },
  { id: "manirampur", districtId: "jashore", name: "Manirampur", bnName: "মণিরামপুর" },
  { id: "abhaynagar", districtId: "jashore", name: "Abhaynagar", bnName: "অভয়নগর" },
  { id: "keshabpur", districtId: "jashore", name: "Keshabpur", bnName: "কেশবপুর" },

  // Jhenaidah
  { id: "jhenaidah_sadar", districtId: "jhenaidah", name: "Jhenaidah Sadar", bnName: "ঝিনাইদহ সদর" },
  { id: "kaliganj_jh", districtId: "jhenaidah", name: "Kaliganj", bnName: "কালীগঞ্জ" },
  { id: "kotchandpur", districtId: "jhenaidah", name: "Kotchandpur", bnName: "কোটচাঁদপুর" },
  { id: "maheshpur", districtId: "jhenaidah", name: "Maheshpur", bnName: "মহেশপুর" },
  { id: "shailkupa", districtId: "jhenaidah", name: "Shailkupa", bnName: "শৈলকুপা" },

  // Kushtia
  { id: "kushtia_sadar", districtId: "kushtia", name: "Kushtia Sadar", bnName: "কুষ্টিয়া সদর" },
  { id: "kumarkhali", districtId: "kushtia", name: "Kumarkhali", bnName: "কুমারখালী" },
  { id: "khoksa", districtId: "kushtia", name: "Khoksa", bnName: "খোকসা" },
  { id: "mirpur_ku", districtId: "kushtia", name: "Mirpur", bnName: "মিরপুর" },
  { id: "bheramara", districtId: "kushtia", name: "Bheramara", bnName: "ভেড়ামারা" },
  { id: "daulatpur_ku", districtId: "kushtia", name: "Daulatpur", bnName: "দৌলতপুর" },

  // Magura
  { id: "magura_sadar", districtId: "magura", name: "Magura Sadar", bnName: "মাগুরা সদর" },
  { id: "sreepur_mg", districtId: "magura", name: "Sreepur", bnName: "শ্রীপুর" },
  { id: "mohammadpur_mg", districtId: "magura", name: "Mohammadpur", bnName: "মোহাম্মদপুর" },
  { id: "shalikha", districtId: "magura", name: "Shalikha", bnName: "শালিখা" },

  // Meherpur
  { id: "meherpur_sadar", districtId: "meherpur", name: "Meherpur Sadar", bnName: "মেহেরপুর সদর" },
  { id: "gangni", districtId: "meherpur", name: "Gangni", bnName: "গাংনী" },
  { id: "mujibnagar", districtId: "meherpur", name: "Mujibnagar", bnName: "মুজিবনগর" },

  // Narail
  { id: "narail_sadar", districtId: "narail", name: "Narail Sadar", bnName: "নড়াইল সদর" },
  { id: "lohagara_nr", districtId: "narail", name: "Lohagara", bnName: "লোহাগড়া" },
  { id: "kalia", districtId: "narail", name: "Kalia", bnName: "কালিয়া" },

  // Satkhira
  { id: "satkhira_sadar", districtId: "satkhira", name: "Satkhira Sadar", bnName: "সাতক্ষীরা সদর" },
  { id: "kalaroa", districtId: "satkhira", name: "Kalaroa", bnName: "কলারোয়া" },
  { id: "tala", districtId: "satkhira", name: "Tala", bnName: "তালা" },
  { id: "kaliganj_sk", districtId: "satkhira", name: "Kaliganj", bnName: "কালীগঞ্জ" },
  { id: "shyamnagar", districtId: "satkhira", name: "Shyamnagar", bnName: "শ্যামনগর" },
  { id: "assasuni", districtId: "satkhira", name: "Assasuni", bnName: "আশাশুনি" },

  // Barishal
  { id: "barishal_sadar", districtId: "barishal_dist", name: "Barishal Sadar", bnName: "বরিশাল সদর" },
  { id: "bakerganj", districtId: "barishal_dist", name: "Bakerganj", bnName: "বাকেরগঞ্জ" },
  { id: "babuganj", districtId: "barishal_dist", name: "Babuganj", bnName: "বাবুগঞ্জ" },
  { id: "wazirpur", districtId: "barishal_dist", name: "Wazirpur", bnName: "উজিরপুর" },
  { id: "banaripara", districtId: "barishal_dist", name: "Banaripara", bnName: "বানারীপাড়া" },
  { id: "gournadi", districtId: "barishal_dist", name: "Gournadi", bnName: "গৌরনদী" },
  { id: "mehendiganj", districtId: "barishal_dist", name: "Mehendiganj", bnName: "মেহেন্দীগঞ্জ" },

  // Barguna
  { id: "barguna_sadar", districtId: "barguna", name: "Barguna Sadar", bnName: "বরগুনা সদর" },
  { id: "amtali", districtId: "barguna", name: "Amtali", bnName: "আমতলী" },
  { id: "patharghata", districtId: "barguna", name: "Patharghata", bnName: "পাথরঘাটা" },
  { id: "betagi", districtId: "barguna", name: "Betagi", bnName: "বেতাগী" },

  // Bhola
  { id: "bhola_sadar", districtId: "bhola", name: "Bhola Sadar", bnName: "ভোলা সদর" },
  { id: "borhanuddin", districtId: "bhola", name: "Borhanuddin", bnName: "বোরহানউদ্দিন" },
  { id: "char_fasson", districtId: "bhola", name: "Char Fasson", bnName: "চরফ্যাশন" },
  { id: "daulatkhan", districtId: "bhola", name: "Daulatkhan", bnName: "দৌলতখান" },
  { id: "lalmohan", districtId: "bhola", name: "Lalmohan", bnName: "লালমোহন" },

  // Jhalokati
  { id: "jhalokati_sadar", districtId: "jhalokati", name: "Jhalokati Sadar", bnName: "ঝালকাঠি সদর" },
  { id: "nalchity", districtId: "jhalokati", name: "Nalchity", bnName: "নলছিটি" },
  { id: "rajapur", districtId: "jhalokati", name: "Rajapur", bnName: "রাজাপুর" },
  { id: "kathalia", districtId: "jhalokati", name: "Kathalia", bnName: "কাঠালিয়া" },

  // Patuakhali
  { id: "patuakhali_sadar", districtId: "patuakhali", name: "Patuakhali Sadar", bnName: "পটুয়াখালী সদর" },
  { id: "galachipa", districtId: "patuakhali", name: "Galachipa", bnName: "গলাচিপা" },
  { id: "bauphal", districtId: "patuakhali", name: "Bauphal", bnName: "বাউফল" },
  { id: "kalapara", districtId: "patuakhali", name: "Kalapara", bnName: "কলাপাড়া" },
  { id: "mirzaganj", districtId: "patuakhali", name: "Mirzaganj", bnName: "মির্জাগঞ্জ" },

  // Pirojpur
  { id: "pirojpur_sadar", districtId: "pirojpur", name: "Pirojpur Sadar", bnName: "পিরোজপুর সদর" },
  { id: "mathbaria", districtId: "pirojpur", name: "Mathbaria", bnName: "মঠবাড়িয়া" },
  { id: "bhandaria", districtId: "pirojpur", name: "Bhandaria", bnName: "ভাণ্ডারিয়া" },
  { id: "nesarabad", districtId: "pirojpur", name: "Nesarabad", bnName: "নেছারাবাদ" },
  { id: "nazirpur", districtId: "pirojpur", name: "Nazirpur", bnName: "নাজিরপুর" },

  // Sylhet City & Upazilas
  { id: "sylhet_sadar", districtId: "sylhet_dist", name: "Sylhet Sadar", bnName: "সিলেট সদর" },
  { id: "south_surma", districtId: "sylhet_dist", name: "South Surma", bnName: "দক্ষিণ সুরমা" },
  { id: "beanibazar", districtId: "sylhet_dist", name: "Beanibazar", bnName: "বিয়ানীবাজার" },
  { id: "golapganj", districtId: "sylhet_dist", name: "Golapganj", bnName: "গোলাপগঞ্জ" },
  { id: "zakiganj", districtId: "sylhet_dist", name: "Zakiganj", bnName: "জকিগঞ্জ" },
  { id: "kanaighat", districtId: "sylhet_dist", name: "Kanaighat", bnName: "কানাইঘাট" },
  { id: "fenchuganj", districtId: "sylhet_dist", name: "Fenchuganj", bnName: "ফেঞ্চুগঞ্জ" },
  { id: "bishwanath", districtId: "sylhet_dist", name: "Bishwanath", bnName: "বিশ্বনাথ" },
  { id: "gowainghat", districtId: "sylhet_dist", name: "Gowainghat", bnName: "গোয়াইনঘাট" },

  // Habiganj
  { id: "habiganj_sadar", districtId: "habiganj", name: "Habiganj Sadar", bnName: "হবিগঞ্জ সদর" },
  { id: "madhabpur", districtId: "habiganj", name: "Madhabpur", bnName: "মাধবপুর" },
  { id: "chunarughat", districtId: "habiganj", name: "Chunarughat", bnName: "চুনারুঘাট" },
  { id: "bahubal", districtId: "habiganj", name: "Bahubal", bnName: "বাহুবল" },
  { id: "nabiganj", districtId: "habiganj", name: "Nabiganj", bnName: "নবীগঞ্জ" },
  { id: "baniachong", districtId: "habiganj", name: "Baniachong", bnName: "বানিয়াচং" },

  // Moulvibazar
  { id: "moulvibazar_sadar", districtId: "moulvibazar", name: "Moulvibazar Sadar", bnName: "মৌলভীবাজার সদর" },
  { id: "sreemangal", districtId: "moulvibazar", name: "Sreemangal", bnName: "শ্রীমঙ্গল" },
  { id: "kamalganj", districtId: "moulvibazar", name: "Kamalganj", bnName: "কমলগঞ্জ" },
  { id: "kulaura", districtId: "moulvibazar", name: "Kulaura", bnName: "কুলাউড়া" },
  { id: "barlekha", districtId: "moulvibazar", name: "Barlekha", bnName: "বড়লেখা" },
  { id: "rajnagar", districtId: "moulvibazar", name: "Rajnagar", bnName: "রাজনগর" },

  // Sunamganj
  { id: "sunamganj_sadar", districtId: "sunamganj", name: "Sunamganj Sadar", bnName: "সুনামগঞ্জ সদর" },
  { id: "chhatak", districtId: "sunamganj", name: "Chhatak", bnName: "ছাতক" },
  { id: "jagannathpur", districtId: "sunamganj", name: "Jagannathpur", bnName: "জগন্নাথপুর" },
  { id: "derai", districtId: "sunamganj", name: "Derai", bnName: "দিরাই" },
  { id: "tahirpur", districtId: "sunamganj", name: "Tahirpur", bnName: "তাহিরপুর" },
  { id: "doarabazar", districtId: "sunamganj", name: "Doarabazar", bnName: "দোয়ারাবাজার" },

  // Rangpur City & Upazilas
  { id: "rangpur_sadar", districtId: "rangpur_dist", name: "Rangpur Sadar", bnName: "রংপুর সদর" },
  { id: "badarganj", districtId: "rangpur_dist", name: "Badarganj", bnName: "বদরগঞ্জ" },
  { id: "pirganj_rp", districtId: "rangpur_dist", name: "Pirganj", bnName: "পীরগঞ্জ" },
  { id: "mithapukur", districtId: "rangpur_dist", name: "Mithapukur", bnName: "মিঠাপুকুর" },
  { id: "kaunia", districtId: "rangpur_dist", name: "Kaunia", bnName: "কাউনিয়া" },
  { id: "gangachhara", districtId: "rangpur_dist", name: "Gangachhara", bnName: "গংগাচড়া" },

  // Dinajpur
  { id: "dinajpur_sadar", districtId: "dinajpur", name: "Dinajpur Sadar", bnName: "দিনাজপুর সদর" },
  { id: "parbatipur", districtId: "dinajpur", name: "Parbatipur", bnName: "পার্বতীপুর" },
  { id: "birganj", districtId: "dinajpur", name: "Birganj", bnName: "বীরগঞ্জ" },
  { id: "chirirbandar", districtId: "dinajpur", name: "Chirirbandar", bnName: "চিরিরবন্দর" },
  { id: "phulbari_dj", districtId: "dinajpur", name: "Phulbari", bnName: "ফুলবাড়ী" },
  { id: "birampur", districtId: "dinajpur", name: "Birampur", bnName: "বিরামপুর" },

  // Gaibandha
  { id: "gaibandha_sadar", districtId: "gaibandha", name: "Gaibandha Sadar", bnName: "গাইবান্ধা সদর" },
  { id: "gobindaganj", districtId: "gaibandha", name: "Gobindaganj", bnName: "গোবিন্দগঞ্জ" },
  { id: "sundarganj", districtId: "gaibandha", name: "Sundarganj", bnName: "সুন্দরগঞ্জ" },
  { id: "palashbari", districtId: "gaibandha", name: "Palashbari", bnName: "পলাশবাড়ী" },

  // Kurigram
  { id: "kurigram_sadar", districtId: "kurigram", name: "Kurigram Sadar", bnName: "কুড়িগ্রাম সদর" },
  { id: "nageshwari", districtId: "kurigram", name: "Nageshwari", bnName: "নাগেশ্বরী" },
  { id: "bhurungamari", districtId: "kurigram", name: "Bhurungamari", bnName: "ভুরুঙ্গামারী" },
  { id: "ulipur", districtId: "kurigram", name: "Ulipur", bnName: "উলিপুর" },
  { id: "chilmari", districtId: "kurigram", name: "Chilmari", bnName: "চিলমারী" },

  // Lalmonirhat
  { id: "lalmonirhat_sadar", districtId: "lalmonirhat", name: "Lalmonirhat Sadar", bnName: "লালমনিরহাট সদর" },
  { id: "hatibandha", districtId: "lalmonirhat", name: "Hatibandha", bnName: "হাতীবান্ধা" },
  { id: "patgram", districtId: "lalmonirhat", name: "Patgram", bnName: "পাটগ্রাম" },
  { id: "kaliganj_lm", districtId: "lalmonirhat", name: "Kaliganj", bnName: "কালীগঞ্জ" },

  // Nilphamari
  { id: "nilphamari_sadar", districtId: "nilphamari", name: "Nilphamari Sadar", bnName: "নীলফামারী সদর" },
  { id: "saidpur", districtId: "nilphamari", name: "Saidpur", bnName: "সৈয়দপুর" },
  { id: "domar", districtId: "nilphamari", name: "Domar", bnName: "ডোমার" },
  { id: "dimla", districtId: "nilphamari", name: "Dimla", bnName: "ডিমলা" },
  { id: "jaldhaka", districtId: "nilphamari", name: "Jaldhaka", bnName: "জলঢাকা" },

  // Panchagarh
  { id: "panchagarh_sadar", districtId: "panchagarh", name: "Panchagarh Sadar", bnName: "পঞ্চগড় সদর" },
  { id: "tetulia", districtId: "panchagarh", name: "Tetulia", bnName: "তেঁতুলিয়া" },
  { id: "boda", districtId: "panchagarh", name: "Boda", bnName: "বোদা" },
  { id: "atwari", districtId: "panchagarh", name: "Atwari", bnName: "আটোয়ারী" },

  // Thakurgaon
  { id: "thakurgaon_sadar", districtId: "thakurgaon", name: "Thakurgaon Sadar", bnName: "ঠাকুরগাঁও সদর" },
  { id: "pirganj_tg", districtId: "thakurgaon", name: "Pirganj", bnName: "পীরগঞ্জ" },
  { id: "ranisankail", districtId: "thakurgaon", name: "Ranisankail", bnName: "রাণীশংকৈল" },
  { id: "baliadangi", districtId: "thakurgaon", name: "Baliadangi", bnName: "বালিয়াডাঙ্গী" },

  // Mymensingh City & Upazilas
  { id: "mymensingh_sadar", districtId: "mymensingh_dist", name: "Mymensingh Sadar", bnName: "ময়মনসিংহ সদর" },
  { id: "muktagachha", districtId: "mymensingh_dist", name: "Muktagachha", bnName: "মুক্তাগাছা" },
  { id: "trishal", districtId: "mymensingh_dist", name: "Trishal", bnName: "ত্রিশাল" },
  { id: "bhaluka", districtId: "mymensingh_dist", name: "Bhaluka", bnName: "ভালুকা" },
  { id: "fulbaria", districtId: "mymensingh_dist", name: "Fulbaria", bnName: "ফুলবাড়ীয়া" },
  { id: "gaffargaon", districtId: "mymensingh_dist", name: "Gaffargaon", bnName: "গফরগাঁও" },
  { id: "haluaghat", districtId: "mymensingh_dist", name: "Haluaghat", bnName: "হালুয়াঘাট" },
  { id: "ishwarganj", districtId: "mymensingh_dist", name: "Ishwarganj", bnName: "ঈশ্বরগঞ্জ" },

  // Jamalpur
  { id: "jamalpur_sadar", districtId: "jamalpur", name: "Jamalpur Sadar", bnName: "জামালপুর সদর" },
  { id: "sarishabari", districtId: "jamalpur", name: "Sarishabari", bnName: "সরিষাবাড়ী" },
  { id: "melandaha", districtId: "jamalpur", name: "Melandaha", bnName: "মেলান্দহ" },
  { id: "islampur", districtId: "jamalpur", name: "Islampur", bnName: "ইসলামপুর" },
  { id: "dewanganj", districtId: "jamalpur", name: "Dewanganj", bnName: "দেওয়ানগঞ্জ" },

  // Netrokona
  { id: "netrokona_sadar", districtId: "netrokona", name: "Netrokona Sadar", bnName: "নেত্রকোণা সদর" },
  { id: "kendua", districtId: "netrokona", name: "Kendua", bnName: "কেন্দুয়া" },
  { id: "mohanganj", districtId: "netrokona", name: "Mohanganj", bnName: "মোহনগঞ্জ" },
  { id: "durgapur_nk", districtId: "netrokona", name: "Durgapur", bnName: "দুর্গাপুর" },
  { id: "kalmakanda", districtId: "netrokona", name: "Kalmakanda", bnName: "কলমাকান্দা" },

  // Sherpur
  { id: "sherpur_sadar", districtId: "sherpur", name: "Sherpur Sadar", bnName: "শেরপুর সদর" },
  { id: "nakla", districtId: "sherpur", name: "Nakla", bnName: "নকলা" },
  { id: "nalitabari", districtId: "sherpur", name: "Nalitabari", bnName: "নালিতাবাড়ী" },
  { id: "sreebardi", districtId: "sherpur", name: "Sreebardi", bnName: "শ্রীবরদী" },
  { id: "jhenaigati", districtId: "sherpur", name: "Jhenaigati", bnName: "ঝিনাইগাতী" },
];

/**
 * Returns districts.
 * If divisionId is provided, returns ONLY the districts of that division.
 * If no divisionId is provided, returns ALL 64 districts.
 */
export function getDistricts(divisionId?: string): District[] {
  if (divisionId) {
    return BANGLADESH_DISTRICTS.filter((d) => d.divisionId === divisionId);
  }
  return BANGLADESH_DISTRICTS;
}

/**
 * Returns upazilas/thanas.
 * If districtId is provided, returns ONLY the upazilas of that district.
 * If divisionId is provided (without district), returns upazilas belonging to that division.
 * Otherwise returns empty array.
 */
export function getUpazilas(districtId?: string, divisionId?: string): Upazila[] {
  if (districtId) {
    const list = BANGLADESH_UPAZILAS.filter((u) => u.districtId === districtId);
    if (list.length > 0) return list;

    // Fallback if an upazila isn't explicitly listed
    const dist = BANGLADESH_DISTRICTS.find((d) => d.id === districtId);
    if (dist) {
      return [
        { id: `${districtId}_sadar`, districtId, name: `${dist.name} Sadar`, bnName: `${dist.bnName} সদর` },
        { id: `${districtId}_thana`, districtId, name: `${dist.name} Thana`, bnName: `${dist.bnName} থানা` },
        { id: `${districtId}_pourashava`, districtId, name: `${dist.name} Pourashava`, bnName: `${dist.bnName} পৌরসভা` },
      ];
    }
  }

  if (divisionId) {
    const distIds = BANGLADESH_DISTRICTS.filter((d) => d.divisionId === divisionId).map((d) => d.id);
    return BANGLADESH_UPAZILAS.filter((u) => distIds.includes(u.districtId));
  }

  return [];
}
