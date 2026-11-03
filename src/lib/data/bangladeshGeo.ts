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
  // Dhaka Division
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

  // Chattogram Division
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

  // Rajshahi Division
  { id: "rajshahi_dist", divisionId: "rajshahi", name: "Rajshahi", bnName: "রাজশাহী" },
  { id: "bogura", divisionId: "rajshahi", name: "Bogura", bnName: "বগুড়া" },
  { id: "joypurhat", divisionId: "rajshahi", name: "Joypurhat", bnName: "জয়পুরহাট" },
  { id: "naogaon", divisionId: "rajshahi", name: "Naogaon", bnName: "নওগাঁ" },
  { id: "natore", divisionId: "rajshahi", name: "Natore", bnName: "নাটোর" },
  { id: "chapai_nawabganj", divisionId: "rajshahi", name: "Chapai Nawabganj", bnName: "চাঁপাইনবাবগঞ্জ" },
  { id: "pabna", divisionId: "rajshahi", name: "Pabna", bnName: "পাবনা" },
  { id: "sirajganj", divisionId: "rajshahi", name: "Sirajganj", bnName: "সিরাজগঞ্জ" },

  // Khulna Division
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

  // Barishal Division
  { id: "barishal_dist", divisionId: "barishal", name: "Barishal", bnName: "বরিশাল" },
  { id: "barguna", divisionId: "barishal", name: "Barguna", bnName: "বরগুনা" },
  { id: "bhola", divisionId: "barishal", name: "Bhola", bnName: "ভোলা" },
  { id: "jhalokati", divisionId: "barishal", name: "Jhalokati", bnName: "ঝালকাঠি" },
  { id: "patuakhali", divisionId: "barishal", name: "Patuakhali", bnName: "পটুয়াখালী" },
  { id: "pirojpur", divisionId: "barishal", name: "Pirojpur", bnName: "পিরোজপুর" },

  // Sylhet Division
  { id: "sylhet_dist", divisionId: "sylhet", name: "Sylhet", bnName: "সিলেট" },
  { id: "habiganj", divisionId: "sylhet", name: "Habiganj", bnName: "হবিগঞ্জ" },
  { id: "moulvibazar", divisionId: "sylhet", name: "Moulvibazar", bnName: "মৌলভীবাজার" },
  { id: "sunamganj", divisionId: "sylhet", name: "Sunamganj", bnName: "সুনামগঞ্জ" },

  // Rangpur Division
  { id: "rangpur_dist", divisionId: "rangpur", name: "Rangpur", bnName: "রংপুর" },
  { id: "dinajpur", divisionId: "rangpur", name: "Dinajpur", bnName: "দিনাজপুর" },
  { id: "gaibandha", divisionId: "rangpur", name: "Gaibandha", bnName: "গাইবান্ধা" },
  { id: "kurigram", divisionId: "rangpur", name: "Kurigram", bnName: "কুড়িগ্রাম" },
  { id: "lalmonirhat", divisionId: "rangpur", name: "Lalmonirhat", bnName: "লালমনিরহাট" },
  { id: "nilphamari", divisionId: "rangpur", name: "Nilphamari", bnName: "নীলফামারী" },
  { id: "panchagarh", divisionId: "rangpur", name: "Panchagarh", bnName: "পঞ্চগড়" },
  { id: "thakurgaon", divisionId: "rangpur", name: "Thakurgaon", bnName: "ঠাকুরগাঁও" },

  // Mymensingh Division
  { id: "mymensingh_dist", divisionId: "mymensingh", name: "Mymensingh", bnName: "ময়মনসিংহ" },
  { id: "jamalpur", divisionId: "mymensingh", name: "Jamalpur", bnName: "জামালপুর" },
  { id: "netrokona", divisionId: "mymensingh", name: "Netrokona", bnName: "নেত্রকোণা" },
  { id: "sherpur", divisionId: "mymensingh", name: "Sherpur", bnName: "শেরপুর" },
];

export const BANGLADESH_UPAZILAS: Upazila[] = [
  // Dhaka City Thanas
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
  { id: "savar", districtId: "dhaka_dist", name: "Savar", bnName: "সাভার" },
  { id: "dhamrai", districtId: "dhaka_dist", name: "Dhamrai", bnName: "ধামরাই" },
  { id: "keraniganj", districtId: "dhaka_dist", name: "Keraniganj", bnName: "কেরানীগঞ্জ" },

  // Gazipur
  { id: "gazipur_sadar", districtId: "gazipur", name: "Gazipur Sadar", bnName: "গাজীপুর সদর" },
  { id: "kaliakair", districtId: "gazipur", name: "Kaliakair", bnName: "কালিয়াকৈর" },
  { id: "tongisadr", districtId: "gazipur", name: "Tongi", bnName: "টঙ্গী" },
  { id: "sreepur", districtId: "gazipur", name: "Sreepur", bnName: "শ্রীপুর" },
  { id: "kapasia", districtId: "gazipur", name: "Kapasia", bnName: "কাপাসিয়া" },

  // Narayanganj
  { id: "narayanganj_sadar", districtId: "narayanganj", name: "Narayanganj Sadar", bnName: "নারায়ণগঞ্জ সদর" },
  { id: "fatullah", districtId: "narayanganj", name: "Fatullah", bnName: "ফতুল্লা" },
  { id: "sonargaon", districtId: "narayanganj", name: "Sonargaon", bnName: "সোনারগাঁও" },
  { id: "rupganj", districtId: "narayanganj", name: "Rupganj", bnName: "রূপগঞ্জ" },
  { id: "araihazar", districtId: "narayanganj", name: "Araihazar", bnName: "আড়াইহাজার" },

  // Chattogram City & Upazilas
  { id: "panchlaish", districtId: "chattogram_dist", name: "Panchlaish", bnName: "পাঁচলাইশ" },
  { id: "kotwali_ctg", districtId: "chattogram_dist", name: "Kotwali", bnName: "কোতোয়ালী" },
  { id: "agrabad", districtId: "chattogram_dist", name: "Agrabad", bnName: "আগ্রাবাদ" },
  { id: "halishahar", districtId: "chattogram_dist", name: "Halishahar", bnName: "হালিশহর" },
  { id: "chandgaon", districtId: "chattogram_dist", name: "Chandgaon", bnName: "চাঁন্দগাঁও" },
  { id: "hathazari", districtId: "chattogram_dist", name: "Hathazari", bnName: "হাটহাজারী" },
  { id: "sitakunda", districtId: "chattogram_dist", name: "Sitakunda", bnName: "সীতাকুণ্ড" },
  { id: "patiya", districtId: "chattogram_dist", name: "Patiya", bnName: "পটিয়া" },

  // Cox's Bazar
  { id: "coxs_bazar_sadar", districtId: "coxs_bazar", name: "Cox's Bazar Sadar", bnName: "কক্সবাজার সদর" },
  { id: "chakaria", districtId: "coxs_bazar", name: "Chakaria", bnName: "চকোরিয়া" },
  { id: "teknaf", districtId: "coxs_bazar", name: "Teknaf", bnName: "টেকনাফ" },

  // Cumilla
  { id: "cumilla_adarsha_sadar", districtId: "cumilla", name: "Adarsha Sadar", bnName: "আদর্শ সদর" },
  { id: "cumilla_sadar_dakshin", districtId: "cumilla", name: "Sadar Dakshin", bnName: "সদর দক্ষিণ" },
  { id: "daudkandi", districtId: "cumilla", name: "Daudkandi", bnName: "দাউদকান্দি" },
  { id: "chandina", districtId: "cumilla", name: "Chandina", bnName: "চান্দিনা" },

  // Sylhet
  { id: "sylhet_sadar", districtId: "sylhet_dist", name: "Sylhet Sadar", bnName: "সিলেট সদর" },
  { id: "beanibazar", districtId: "sylhet_dist", name: "Beanibazar", bnName: "বিয়ানীবাজার" },
  { id: "golapganj", districtId: "sylhet_dist", name: "Golapganj", bnName: "গোলাপগঞ্জ" },

  // Rajshahi
  { id: "boalia", districtId: "rajshahi_dist", name: "Boalia", bnName: "বোয়ালিয়া" },
  { id: "motihar", districtId: "rajshahi_dist", name: "Motihar", bnName: "মতিহার" },
  { id: "rajpara", districtId: "rajshahi_dist", name: "Rajpara", bnName: "রাজপাড়া" },
  { id: "paba", districtId: "rajshahi_dist", name: "Paba", bnName: "পবা" },

  // Bogura
  { id: "bogura_sadar", districtId: "bogura", name: "Bogura Sadar", bnName: "বগুড়া সদর" },
  { id: "shajahanpur", districtId: "bogura", name: "Shajahanpur", bnName: "শাজাহানপুর" },
  { id: "sariakandi", districtId: "bogura", name: "Sariakandi", bnName: "সারিয়াকান্দি" },

  // Khulna
  { id: "khulna_sadar", districtId: "khulna_dist", name: "Khulna Sadar", bnName: "খুলনা সদর" },
  { id: "khalishpur", districtId: "khulna_dist", name: "Khalishpur", bnName: "খালিশপুর" },
  { id: "daulatpur", districtId: "khulna_dist", name: "Daulatpur", bnName: "দৌলতপুর" },
  { id: "sonadanga", districtId: "khulna_dist", name: "Sonadanga", bnName: "সোনাডাঙ্গা" },

  // Barishal
  { id: "barishal_sadar", districtId: "barishal_dist", name: "Barishal Sadar", bnName: "বরিশাল সদর" },
  { id: "bakerganj", districtId: "barishal_dist", name: "Bakerganj", bnName: "বাকেরগঞ্জ" },
  { id: "babuganj", districtId: "barishal_dist", name: "Babuganj", bnName: "বাবুগঞ্জ" },

  // Rangpur
  { id: "rangpur_sadar", districtId: "rangpur_dist", name: "Rangpur Sadar", bnName: "রংপুর সদর" },
  { id: "badarganj", districtId: "rangpur_dist", name: "Badarganj", bnName: "বদরগঞ্জ" },
  { id: "pirganj", districtId: "rangpur_dist", name: "Pirganj", bnName: "পীরগঞ্জ" },

  // Mymensingh
  { id: "mymensingh_sadar", districtId: "mymensingh_dist", name: "Mymensingh Sadar", bnName: "ময়মনসিংহ সদর" },
  { id: "muktagachha", districtId: "mymensingh_dist", name: "Muktagachha", bnName: "মুক্তাগাছা" },
  { id: "trishal", districtId: "mymensingh_dist", name: "Trishal", bnName: "ত্রিশাল" },
];

export function getDistricts(divisionId?: string): District[] {
  if (!divisionId) return BANGLADESH_DISTRICTS;
  return BANGLADESH_DISTRICTS.filter((d) => d.divisionId === divisionId);
}

export function getUpazilas(districtId?: string, divisionId?: string): Upazila[] {
  // If a district is specified
  if (districtId) {
    const list = BANGLADESH_UPAZILAS.filter((u) => u.districtId === districtId);
    if (list.length > 0) return list;

    // If not in explicit list, provide standard administrative Upazilas for this district
    const dist = BANGLADESH_DISTRICTS.find((d) => d.id === districtId);
    if (dist) {
      return [
        { id: `${districtId}_sadar`, districtId, name: `${dist.name} Sadar`, bnName: `${dist.bnName} সদর` },
        { id: `${districtId}_model`, districtId, name: `${dist.name} Thana`, bnName: `${dist.bnName} থানা` },
        { id: `${districtId}_pourashava`, districtId, name: `${dist.name} Pourashava`, bnName: `${dist.bnName} পৌরসভা` },
      ];
    }
  }

  // If a division is specified (but no district yet)
  if (divisionId) {
    const distIds = BANGLADESH_DISTRICTS.filter((d) => d.divisionId === divisionId).map((d) => d.id);
    const list = BANGLADESH_UPAZILAS.filter((u) => distIds.includes(u.districtId));
    if (list.length > 0) return list;
  }

  // Default: return all defined upazilas / thanas
  return BANGLADESH_UPAZILAS;
}
