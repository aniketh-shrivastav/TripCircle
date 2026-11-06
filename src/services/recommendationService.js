import { destinationRecommendationsCatalog } from '../data/mockData';

export const quickPrompts = [
  {
    label: "Under ₹6,000 Weekend",
    query: "Find a budget-friendly weekend trip under ₹6,000 per person for our group.",
    criteria: { maxBudget: 6000, durationDays: 3, styles: ["Budget-Friendly", "Beaches"] }
  },
  {
    label: "Food & Heritage Trail",
    query: "Suggest places focused on royal history, architectural wonders, and amazing culinary experiences.",
    criteria: { maxBudget: 12000, durationDays: 3, styles: ["Food", "Culture", "Heritage"] }
  },
  {
    label: "Mountain & Adventure Escape",
    query: "Plan an adrenaline-packed trip with river rafting, trekking, and riverside camping.",
    criteria: { maxBudget: 15000, durationDays: 4, styles: ["Adventure", "Nature", "Trekking"] }
  },
  {
    label: "Chill Beach Getaway",
    query: "Find relaxed coastal locations with clean beaches, cafes, and sunset spots.",
    criteria: { maxBudget: 10000, durationDays: 4, styles: ["Beaches", "Relaxation"] }
  }
];

export const getRecommendations = (filters = {}) => {
  const {
    startLocation = "",
    preferredRegion = "",
    budget = 15000,
    duration = "3-4 Days",
    groupSize = 4,
    interests = []
  } = filters;

  // Score recommendations based on user selections
  const scored = destinationRecommendationsCatalog.map(dest => {
    let score = 50;

    // Budget match
    if (dest.estimatedCostPerPerson <= Number(budget)) {
      score += 25;
    } else {
      score -= Math.min(20, Math.floor((dest.estimatedCostPerPerson - Number(budget)) / 500));
    }

    // Interests match
    if (interests.length > 0) {
      const matchingInterests = dest.vibe.filter(v =>
        interests.some(i => i.toLowerCase().includes(v.toLowerCase()) || v.toLowerCase().includes(i.toLowerCase()))
      );
      score += matchingInterests.length * 15;
    }

    // Region match
    if (preferredRegion && dest.region.toLowerCase().includes(preferredRegion.toLowerCase())) {
      score += 20;
    }

    // Match percentage capped between 70% and 98%
    const matchPercentage = Math.min(98, Math.max(72, score));

    return {
      ...dest,
      matchPercentage,
      calculatedGroupTotal: dest.estimatedCostPerPerson * Number(groupSize),
      personalizedNote: `Tailored for ${groupSize} travelers from ${startLocation || 'your city'} with a per-person budget of approx ₹${dest.estimatedCostPerPerson.toLocaleString('en-IN')}.`
    };
  });

  // Sort by match score descending and take top 3
  scored.sort((a, b) => b.matchPercentage - a.matchPercentage);
  return scored.slice(0, 3);
};
