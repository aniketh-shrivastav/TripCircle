export const initialUsers = [
  {
    id: "user-1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    preferredBudget: "₹10,000 - ₹20,000",
    interests: ["Beaches", "Nightlife", "Photography", "Cafes", "Budget Travel"],
    preferredTripTypes: ["Weekend Getaways", "Road Trips", "Friends Reunion"],
  },
  {
    id: "user-2",
    name: "Priya Sharma",
    email: "priya.s@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    preferredBudget: "₹15,000 - ₹25,000",
    interests: ["Culture", "Food & Dining", "Yoga & Wellness"],
    preferredTripTypes: ["Relaxation", "Heritage Trails"],
  },
  {
    id: "user-3",
    name: "Rohan Mehta",
    email: "rohan.m@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    preferredBudget: "₹8,000 - ₹15,000",
    interests: ["Adventure", "Trekking", "Street Food", "Live Music"],
    preferredTripTypes: ["Backpacking", "Spontaneous Trips"],
  },
  {
    id: "user-4",
    name: "Zoya Khan",
    email: "zoya.k@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    preferredBudget: "₹12,000 - ₹22,000",
    interests: ["Water Sports", "Parties", "Sunset Chasing", "Scuba"],
    preferredTripTypes: ["Coastal Trips", "Luxury Glamping"],
  },
  {
    id: "user-5",
    name: "Kabir Sen",
    email: "kabir.sen@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    preferredBudget: "₹10,000 - ₹18,000",
    interests: ["Road Trips", "History", "Coffee", "Local Markets"],
    preferredTripTypes: ["Self-drive", "Architecture Walks"],
  }
];

export const initialTrips = [
  {
    id: "trip-1",
    name: "Goa Beach & Sunsets",
    destination: "North & South Goa, India",
    startDate: "2026-11-14",
    endDate: "2026-11-18",
    durationDays: 4,
    budgetPerPerson: 12000,
    memberIds: ["user-1", "user-2", "user-3", "user-4", "user-5"],
    travelStyle: "Beaches & Nightlife",
    status: "Planning",
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    description: "Annual college crew getaway! Sunsets at Vagator, water sports at Baga, cafe hopping in Assagao, and late-night talks by the sea.",
    startingLocation: "Mumbai / Pune"
  },
  {
    id: "trip-2",
    name: "Manali High Altitude Chill",
    destination: "Manali & Solang Valley",
    startDate: "2026-12-22",
    endDate: "2026-12-27",
    durationDays: 5,
    budgetPerPerson: 18500,
    memberIds: ["user-1", "user-2", "user-4"],
    travelStyle: "Adventure & Mountains",
    status: "Confirmed",
    coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    description: "Winter snowy retreat. Riverside cafes in Old Manali, paragliding in Solang, bonfire evenings and hot spring baths in Vashisht.",
    startingLocation: "Delhi / Chandigarh"
  },
  {
    id: "trip-3",
    name: "Jaipur Royal Heritage Trail",
    destination: "Jaipur, Rajasthan",
    startDate: "2026-10-02",
    endDate: "2026-10-05",
    durationDays: 3,
    budgetPerPerson: 9500,
    memberIds: ["user-1", "user-3", "user-5"],
    travelStyle: "Culture & Food",
    status: "Completed",
    coverImage: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80",
    description: "Exploring Amber Fort, Nahargarh sunset point, tasting authentic Pyaaz Kachori, and hunting block-printed textiles in Johari Bazaar.",
    startingLocation: "Delhi NCR"
  }
];

export const initialPolls = [
  {
    id: "poll-1",
    tripId: "trip-1",
    question: "Which base location should we book our main villa in?",
    category: "Stay",
    status: "Open",
    createdAt: "2026-10-18T10:30:00Z",
    winningOptionId: null,
    options: [
      {
        id: "opt-1",
        text: "Anjuna & Vagator (Close to beach clubs & sunset shacks)",
        voterIds: ["user-1", "user-4"]
      },
      {
        id: "opt-2",
        text: "Assagao & Siolim (Quiet heritage villas & boutique cafes)",
        voterIds: ["user-2", "user-5"]
      },
      {
        id: "opt-3",
        text: "Palolem, South Goa (Serene, kayaking, laid-back vibe)",
        voterIds: ["user-3"]
      }
    ]
  },
  {
    id: "poll-2",
    tripId: "trip-1",
    question: "Saturday Night Special Event: Which activity do you prefer?",
    category: "Activities",
    status: "Open",
    createdAt: "2026-10-19T14:15:00Z",
    winningOptionId: null,
    options: [
      {
        id: "opt-4",
        text: "Sunset Cruise with live music on Chapora River",
        voterIds: ["user-1", "user-2", "user-3"]
      },
      {
        id: "opt-5",
        text: "Dinner reservation at Thalassa Cliffside",
        voterIds: ["user-4"]
      },
      {
        id: "opt-6",
        text: "Live acoustic beach bonfire barbecue",
        voterIds: ["user-5"]
      }
    ]
  },
  {
    id: "poll-3",
    tripId: "trip-1",
    question: "Group Rental Transport Choice",
    category: "Transport",
    status: "Closed",
    createdAt: "2026-10-15T09:00:00Z",
    winningOptionId: "opt-7",
    options: [
      {
        id: "opt-7",
        text: "Self-drive 7-seater SUV (AC, fits all luggage together)",
        voterIds: ["user-1", "user-2", "user-3", "user-5"]
      },
      {
        id: "opt-8",
        text: "Individual Scooters / Activas (More flexible for beach lanes)",
        voterIds: ["user-4"]
      }
    ]
  }
];

export const initialItinerary = [
  {
    id: "act-1",
    tripId: "trip-1",
    day: 1,
    time: "11:30 AM",
    title: "Airport Arrival & Villa Check-in",
    description: "Assemble at MOPA Airport, pick up rental SUV, and check into our 4-BHK private pool villa in Anjuna.",
    estimatedCost: 1200,
    category: "Transport",
    location: "MOPA Airport to Anjuna",
    completed: true
  },
  {
    id: "act-2",
    tripId: "trip-1",
    day: 1,
    time: "04:30 PM",
    title: "Vagator Hilltop Sunset & Beach Walk",
    description: "Hike up the red cliffs overlooking Ozran beach, grab fresh tender coconut, and watch the sun dip into the Arabian Sea.",
    estimatedCost: 350,
    category: "Sightseeing",
    location: "Vagator Clifftop",
    completed: true
  },
  {
    id: "act-3",
    tripId: "trip-1",
    day: 1,
    time: "08:30 PM",
    title: "Welcome Seafood Dinner at Curlies Shack",
    description: "Kick off the trip with butter garlic squid, grilled kingfish, Goan poee, and chill beachfront music.",
    estimatedCost: 1500,
    category: "Food",
    location: "Anjuna Beachfront",
    completed: false
  },
  {
    id: "act-4",
    tripId: "trip-1",
    day: 2,
    time: "07:30 AM",
    title: "Baga & Calangute Watersports Package",
    description: "Parasailing over the bay, jet ski tandem ride, and banana boat ride with safety certified instructors.",
    estimatedCost: 2200,
    category: "Adventure",
    location: "Baga Beach Watersports Hub",
    completed: false
  },
  {
    id: "act-5",
    tripId: "trip-1",
    day: 2,
    time: "01:30 PM",
    title: "Lunch & Heritage Walk in Fontainhas Latin Quarter",
    description: "Stroll through the pastel Portuguese villas of Panjim, click colorful photos, and dine at Viva Panjim cafe.",
    estimatedCost: 850,
    category: "Culture",
    location: "Fontainhas, Panaji",
    completed: false
  },
  {
    id: "act-6",
    tripId: "trip-1",
    day: 2,
    time: "07:00 PM",
    title: "Sunset Catamaran Cruise",
    description: "1.5 hour leisure catamaran sail along Chapora river with music and snacks (winner of group poll!).",
    estimatedCost: 1600,
    category: "Leisure",
    location: "Chapora Jetty",
    completed: false
  },
  {
    id: "act-7",
    tripId: "trip-1",
    day: 3,
    time: "09:00 AM",
    title: "Coastal Road Trip to Palolem & Cabo de Rama",
    description: "Scenic 2-hour coastal drive down south. Explore the old Portuguese fort ruins with panoramic ocean views.",
    estimatedCost: 600,
    category: "Sightseeing",
    location: "Cabo de Rama, South Goa",
    completed: false
  },
  {
    id: "act-8",
    tripId: "trip-1",
    day: 3,
    time: "03:30 PM",
    title: "Sea Kayaking to Butterfly Island",
    description: "Rent tandem kayaks from Palolem crescent beach, paddle through calm turquoise water to the secluded cove.",
    estimatedCost: 800,
    category: "Adventure",
    location: "Palolem Beach",
    completed: false
  },
  {
    id: "act-9",
    tripId: "trip-1",
    day: 4,
    time: "10:00 AM",
    title: "Anjuna Flea Market Souvenirs & Cafe Brunch",
    description: "Shop for spices, handicrafts, and boho beachwear, followed by artisan coffee and smoothie bowls at Artjuna.",
    estimatedCost: 950,
    category: "Food",
    location: "Anjuna Market Lane",
    completed: false
  },
  {
    id: "act-10",
    tripId: "trip-1",
    day: 4,
    time: "03:00 PM",
    title: "Villa Check-out & Airport Farewell",
    description: "Pack bags, return the rental vehicle, settle remaining group accounts in TripCircle, and head to departures.",
    estimatedCost: 500,
    category: "Transport",
    location: "Dabolim / MOPA Airport",
    completed: false
  }
];

export const initialExpenses = [
  {
    id: "exp-1",
    tripId: "trip-1",
    description: "4-BHK Private Pool Villa Booking (4 Nights)",
    amount: 25000,
    paidBy: "user-1", // Alex paid
    participantIds: ["user-1", "user-2", "user-3", "user-4", "user-5"],
    splitType: "equal",
    category: "Stay",
    createdAt: "2026-10-16T11:20:00Z"
  },
  {
    id: "exp-2",
    tripId: "trip-1",
    description: "7-Seater Self-Drive SUV Rental + Fuel Advance",
    amount: 7500,
    paidBy: "user-2", // Priya paid
    participantIds: ["user-1", "user-2", "user-3", "user-4", "user-5"],
    splitType: "equal",
    category: "Transport",
    createdAt: "2026-10-17T15:45:00Z"
  },
  {
    id: "exp-3",
    tripId: "trip-1",
    description: "Beach Shack Seafood Platter & Sundowner Drinks",
    amount: 5500,
    paidBy: "user-3", // Rohan paid
    participantIds: ["user-1", "user-2", "user-3", "user-4", "user-5"],
    splitType: "equal",
    category: "Food",
    createdAt: "2026-10-18T20:10:00Z"
  },
  {
    id: "exp-4",
    tripId: "trip-1",
    description: "Watersports Pre-booking Deposit",
    amount: 4500,
    paidBy: "user-4", // Zoya paid
    participantIds: ["user-1", "user-2", "user-4"], // Only Alex, Priya, Zoya participating
    splitType: "equal",
    category: "Activities",
    createdAt: "2026-10-19T09:30:00Z"
  }
];

export const initialSettlements = [
  {
    id: "set-demo-1",
    tripId: "trip-1",
    fromUserId: "user-5",
    toUserId: "user-1",
    amount: 1500,
    status: "paid",
    paidAt: "2026-10-19T16:00:00Z"
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    tripId: "trip-1",
    title: "New Poll Active",
    message: "Rohan created a poll: 'Saturday Night Special Event: Which activity do you prefer?'",
    type: "poll",
    timestamp: "2 hours ago",
    read: false
  },
  {
    id: "notif-2",
    tripId: "trip-1",
    title: "Vote Recorded",
    message: "Priya voted for 'Assagao & Siolim' in villa location poll.",
    type: "vote",
    timestamp: "5 hours ago",
    read: false
  },
  {
    id: "notif-3",
    tripId: "trip-1",
    title: "Expense Added",
    message: "Zoya added 'Watersports Pre-booking Deposit' (₹4,500). Your share is ₹1,500.",
    type: "expense",
    timestamp: "1 day ago",
    read: true
  },
  {
    id: "notif-4",
    tripId: "trip-1",
    title: "Settlement Paid",
    message: "Kabir paid Alex ₹1,500 towards Villa advance payment.",
    type: "settlement",
    timestamp: "2 days ago",
    read: true
  },
  {
    id: "notif-5",
    tripId: "trip-1",
    title: "Itinerary Updated",
    message: "Alex added 'Vagator Hilltop Sunset & Beach Walk' for Day 1.",
    type: "itinerary",
    timestamp: "3 days ago",
    read: true
  }
];

export const destinationRecommendationsCatalog = [
  {
    id: "rec-gokarna",
    destination: "Gokarna, Karnataka",
    region: "South India Coastal",
    estimatedCostPerPerson: 7500,
    duration: "3 - 4 Days",
    vibe: ["Beaches", "Trekking", "Budget-Friendly", "Relaxation"],
    groupSuitability: "Best for chill groups looking for clean beaches without commercial crowds.",
    coverImage: "https://images.unsplash.com/photo-1600100397608-f010e421d014?auto=format&fit=crop&w=800&q=80",
    highlights: ["Om Beach to Half-Moon Beach Trek", "Kudle Beach shacks", "Mahabaleshwar temple visit", "Bioluminescence night sightings"],
    whyItFits: "Matches your budget of under ₹10,000, offers tranquil beaches for photography, and affordable sea-view cottages for 4-6 friends."
  },
  {
    id: "rec-rishikesh",
    destination: "Rishikesh, Uttarakhand",
    region: "Himalayan Foothills",
    estimatedCostPerPerson: 9200,
    duration: "3 - 4 Days",
    vibe: ["Adventure", "River Rafting", "Cafes", "Nature"],
    groupSuitability: "Ideal for friends who crave adrenaline coupled with bohemian riverside cafes.",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    highlights: ["Grade 3+ Ganges river rafting", "Cliff jumping at Shivpuri", "The Beatles Ashram tour", "Evening Ganga Aarti at Triveni Ghat"],
    whyItFits: "Perfect balance of adrenaline sports and budget backpacker hostels, offering group tent camping with bonfires."
  },
  {
    id: "rec-meghalaya",
    destination: "Shillong & Cherrapunji, Meghalaya",
    region: "Northeast India",
    estimatedCostPerPerson: 16500,
    duration: "5 - 6 Days",
    vibe: ["Nature", "Waterfalls", "Hiking", "Culture"],
    groupSuitability: "Unforgettable scenic expedition for tight-knit groups passionate about nature and road trips.",
    coverImage: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Double Decker Living Root Bridges", "Crystal clear boating at Dawki Umngot river", "Wei Sawdong tiered waterfalls", "Live music rock culture in Shillong"],
    whyItFits: "A once-in-a-lifetime road trip for friends who enjoy hiking, cool mountain weather, and distinct indigenous cuisine."
  },
  {
    id: "rec-udaipur",
    destination: "Udaipur & Kumbhalgarh, Rajasthan",
    region: "West India Heritage",
    estimatedCostPerPerson: 11000,
    duration: "3 - 4 Days",
    vibe: ["Culture", "Lakes", "Food", "Heritage"],
    groupSuitability: "Great for leisurely strolls, rooftop lake-view dinners, and heritage palace photography.",
    coverImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80",
    highlights: ["Lake Pichola sunset boat ride", "City Palace royal museum walk", "Rooftop dining with palace lights", "Day trip to the Great Wall of Kumbhalgarh"],
    whyItFits: "High luxury feel at very reasonable group sharing prices. Excellent food and romantic lakeside ambiance."
  },
  {
    id: "rec-coorg",
    destination: "Coorg (Kodagu), Karnataka",
    region: "Western Ghats",
    estimatedCostPerPerson: 8500,
    duration: "3 Days",
    vibe: ["Nature", "Coffee Plantations", "Relaxation", "Road Trips"],
    groupSuitability: "Best weekend drive for friends who want to unwind among lush mist and private estate homestays.",
    coverImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    highlights: ["Coffee plantation heritage homestay", "Abbey & Iruppu waterfalls", "Namdroling Golden Temple", "Traditional Pandi Curry feast"],
    whyItFits: "Cozy estate stays with private campfires, easily accessible for road trips, and very easy on per-person split budgets."
  },
  {
    id: "rec-kasol",
    destination: "Kasol & Tosh, Parvati Valley",
    region: "Himachal Pradesh",
    estimatedCostPerPerson: 9800,
    duration: "4 - 5 Days",
    vibe: ["Adventure", "Trekking", "Cafes", "Riverside"],
    groupSuitability: "Famous bohemian backpacker trail with riverside chill vibes and alpine hiking trails.",
    coverImage: "https://images.unsplash.com/photo-1586351012965-861624544334?auto=format&fit=crop&w=800&q=80",
    highlights: ["Kheerganga hot spring trek", "Israeli food and cinnamon rolls in Kasol", "Scenic riverside camps in Chalal", "Wooden architecture in Tosh village"],
    whyItFits: "Highly social and budget-friendly with scenic valley views that young friend groups love."
  }
];
