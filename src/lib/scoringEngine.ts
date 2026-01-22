export interface ScoreBreakdown {
  openingStrength: number;
  businessImpact: number;
  clickIntentClarity: number;
  credibilitySpecificity: number;
  formatFit: number;
}

export interface ScoringResult {
  scores: ScoreBreakdown;
  totalScore: number;
  status: 'approved' | 'rewrite' | 'do-not-publish';
  feedback: string;
  lowestDimension: keyof ScoreBreakdown | null;
}

const dimensionLabels: Record<keyof ScoreBreakdown, string> = {
  openingStrength: 'Opening Strength',
  businessImpact: 'Business Impact Framing',
  clickIntentClarity: 'Click Intent Clarity',
  credibilitySpecificity: 'Credibility & Specificity',
  formatFit: 'Format Fit',
};

const improvementGuidance: Record<keyof ScoreBreakdown, string> = {
  openingStrength: `Your opening doesn't justify stopping the scroll. Try leading with an immediate decision, risk, or concrete scenario. If your first line wouldn't work as a headline, it needs reworking. Example: "A $7,500 wholesale order just dropped in your Shopify store…"`,
  businessImpact: `The problem isn't framed as a business consequence. Reframe around revenue, margin, or scaling risk—not just operational inconvenience. Frame accounting as risk management, not compliance.`,
  clickIntentClarity: `The value of clicking isn't obvious. Ask: "What will the reader get if they click?" Promise clarity, comparison, or decision support—not product features. Example CTA: "Read the full breakdown" beats "Learn more about us."`,
  credibilitySpecificity: `This reads generic or abstract. Add concrete details, specific numbers, or real operational scenarios. No concrete details = hard cap at 10. Use scenario-based storytelling.`,
  formatFit: `The format may be working against your message. Carousels dominate top CTR for comparisons and lists. Images only work with strong stats or bold claims. Video works best for opinionated, myth-busting content.`,
};

function scoreOpening(text: string): number {
  const firstLine = text.split('\n')[0].toLowerCase();
  const words = firstLine.split(/\s+/).length;
  
  // Check for decision/risk/scenario indicators
  const hasQuestion = firstLine.includes('?');
  const hasScenario = /\$[\d,]+|order|dropped|just|imagine|what if/i.test(firstLine);
  const hasRisk = /risk|fail|lose|break|wrong|mistake|cost/i.test(firstLine);
  const hasDecision = /choose|which|should|vs|versus|or\s/i.test(firstLine);
  const hasTension = /but|however|truth|reality|actually|problem/i.test(firstLine);
  const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(firstLine);
  
  // Brand-led or informational opening
  const isBrandLed = /we are|our company|myworks|announcing|excited to/i.test(firstLine);
  
  let score = 10; // baseline
  
  if (isBrandLed) return Math.min(score, 5);
  
  if (hasScenario) score += 6;
  if (hasDecision || hasQuestion) score += 4;
  if (hasRisk) score += 4;
  if (hasTension) score += 3;
  if (hasEmoji && words < 15) score += 1;
  if (words > 25) score -= 3;
  
  return Math.min(20, Math.max(0, score));
}

function scoreBusinessImpact(text: string): number {
  const lowerText = text.toLowerCase();
  
  // Revenue/margin/scaling risk (16-20)
  const hasRevenue = /revenue|profit|margin|sales|money|roi|\$[\d,]+k|\$[\d,]+m/i.test(lowerText);
  const hasScaling = /scale|scaling|growth|expand/i.test(lowerText);
  const hasRisk = /risk|lose|losing|cost|expensive|failed/i.test(lowerText);
  
  // Time/efficiency (11-15)
  const hasTime = /time|hours|manual|automat/i.test(lowerText);
  const hasEfficiency = /efficient|streamline|faster|slow|quick/i.test(lowerText);
  
  // Operational (6-10)
  const hasOperational = /sync|integrate|manage|workflow|process/i.test(lowerText);
  
  // Educational only (0-5)
  const isEducational = /learn|understand|know|tip|guide|how to/i.test(lowerText) && !hasRevenue && !hasRisk;
  
  let score = 8;
  
  if (hasRevenue && hasRisk) score = 18;
  else if (hasRevenue || (hasScaling && hasRisk)) score = 16;
  else if (hasTime && hasRisk) score = 14;
  else if (hasTime || hasEfficiency) score = 12;
  else if (hasOperational) score = 9;
  
  if (isEducational) score = Math.min(score, 5);
  
  return Math.min(20, Math.max(0, score));
}

function scoreClickIntent(text: string): number {
  const lowerText = text.toLowerCase();
  
  // Strong CTAs (16-20)
  const hasComparison = /compare|comparison|vs|versus|which.*better/i.test(lowerText);
  const hasResolution = /how to fix|solve|solution|resolve/i.test(lowerText);
  const hasDecision = /decide|decision|choose|choosing|pick/i.test(lowerText);
  
  // Clear learning (11-15)
  const hasBreakdown = /breakdown|full.*read|read.*full|check out|learn how/i.test(lowerText);
  const hasList = /top \d|best \d|\d things|\d ways|\d tips/i.test(lowerText);
  
  // Vague (6-10)
  const hasVague = /learn more|check.*out|click here|find out/i.test(lowerText);
  
  // Product-focused CTAs (cap at 10)
  const isProductFocused = /our feature|announcing|excited to|new release/i.test(lowerText);
  
  let score = 10;
  
  if (hasComparison || hasResolution) score = 18;
  else if (hasDecision) score = 16;
  else if (hasBreakdown || hasList) score = 14;
  else if (hasVague) score = 8;
  
  if (isProductFocused) score = Math.min(score, 10);
  
  return Math.min(20, Math.max(0, score));
}

function scoreCredibility(text: string): number {
  const lowerText = text.toLowerCase();
  
  // Strong operational realism (16-20)
  const hasSpecificNumbers = /\d+%|\$[\d,]+|\d+ (hours|days|weeks|orders|customers|clients)/i.test(lowerText);
  const hasSpecificTools = /quickbooks|shopify|xero|netsuite|woocommerce|stripe/i.test(lowerText);
  const hasScenario = /when you|if you|imagine|scenario|example:/i.test(lowerText);
  
  // Concrete signals (11-15)
  const hasConcreteTerms = /inventory|invoic|tax|accounting|sync|integration|order|payment/i.test(lowerText);
  const hasBulletPoints = (text.match(/[-•✅➡🔵💼]/g) || []).length >= 3;
  
  // Some specificity (6-10)
  const hasGenericAdvice = /should|could|might|consider|think about/i.test(lowerText);
  
  let score = 10;
  
  if (hasSpecificNumbers && hasSpecificTools) score = 18;
  else if (hasSpecificNumbers || hasScenario) score = 15;
  else if (hasConcreteTerms && hasBulletPoints) score = 13;
  else if (hasConcreteTerms) score = 11;
  else if (hasGenericAdvice) score = 7;
  
  // No concrete details = cap at 10
  if (!hasSpecificNumbers && !hasConcreteTerms && !hasSpecificTools) {
    score = Math.min(score, 10);
  }
  
  return Math.min(20, Math.max(0, score));
}

function scoreFormatFit(text: string): number {
  const lowerText = text.toLowerCase();
  const wordCount = text.split(/\s+/).length;
  const paragraphs = text.split(/\n\n+/).length;
  const hasList = (text.match(/[-•✅➡🔵💼💰🧾💡]/g) || []).length >= 2;
  const hasComparison = /vs|versus|compare|comparison/i.test(lowerText);
  
  // Assess message type
  const isComparison = hasComparison;
  const isList = hasList;
  const isOpinion = /we don't|we believe|myth|propaganda|actually|truth is/i.test(lowerText);
  
  let score = 12; // baseline good alignment
  
  // Lists and comparisons work best as carousels/documents
  if ((isComparison || isList) && wordCount > 100) {
    score = 17; // Good depth for carousel
  } else if (isOpinion && wordCount < 150) {
    score = 16; // Good for video/concise post
  } else if (wordCount > 300 && !isList) {
    score = 8; // Too long without structure
  } else if (wordCount < 50) {
    score = 10; // Might be too short
  }
  
  // Well-structured lists
  if (hasList && paragraphs >= 2) {
    score = Math.max(score, 15);
  }
  
  return Math.min(20, Math.max(0, score));
}

export function scoreContent(text: string): ScoringResult {
  if (!text.trim()) {
    return {
      scores: {
        openingStrength: 0,
        businessImpact: 0,
        clickIntentClarity: 0,
        credibilitySpecificity: 0,
        formatFit: 0,
      },
      totalScore: 0,
      status: 'do-not-publish',
      feedback: 'Paste your draft to begin scoring.',
      lowestDimension: null,
    };
  }

  const scores: ScoreBreakdown = {
    openingStrength: scoreOpening(text),
    businessImpact: scoreBusinessImpact(text),
    clickIntentClarity: scoreClickIntent(text),
    credibilitySpecificity: scoreCredibility(text),
    formatFit: scoreFormatFit(text),
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  let status: ScoringResult['status'];
  if (totalScore >= 80) {
    status = 'approved';
  } else if (totalScore >= 70) {
    status = 'rewrite';
  } else {
    status = 'do-not-publish';
  }

  // Find lowest dimension
  let lowestDimension: keyof ScoreBreakdown | null = null;
  let lowestScore = Infinity;
  
  for (const [key, value] of Object.entries(scores)) {
    if (value < lowestScore) {
      lowestScore = value;
      lowestDimension = key as keyof ScoreBreakdown;
    }
  }

  let feedback: string;
  if (status === 'approved') {
    feedback = "Nice work — this post is ready to publish.";
  } else if (lowestDimension) {
    feedback = `**${dimensionLabels[lowestDimension]}** needs improvement:\n\n${improvementGuidance[lowestDimension]}`;
  } else {
    feedback = "Review your draft and strengthen the key dimensions.";
  }

  return {
    scores,
    totalScore,
    status,
    feedback,
    lowestDimension,
  };
}
