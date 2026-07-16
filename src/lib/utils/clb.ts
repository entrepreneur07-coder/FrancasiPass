/**
 * Calculates the Canadian Language Benchmark (CLB) level based on test scores.
 * These thresholds are approximations based on TEF/TCF Canada scoring rubrics
 * adapted for weighted percentage scoring.
 */
export function calculateCLB(score: number, maxScore: number): number {
  if (maxScore === 0) return 3
  const percentage = (score / maxScore) * 100

  if (percentage >= 92) return 10
  if (percentage >= 88) return 9
  if (percentage >= 80) return 8
  if (percentage >= 68) return 7
  if (percentage >= 50) return 6
  if (percentage >= 35) return 5
  if (percentage >= 20) return 4
  
  return 3 // Below CLB 4
}

/**
 * Maps CLB levels to CRS (Comprehensive Ranking System) points for Express Entry.
 * This is for single applicants.
 */
export function getCRSPoints(clb: number, module: string): number {
  if (clb < 4) return 0
  
  // Simplified CRS point mapping for French as a second language
  const mapping: Record<number, number> = {
    4: 3,
    5: 6,
    6: 9,
    7: 17, // Significant jump at CLB 7
    8: 23,
    9: 31,
    10: 34
  }
  
  return mapping[clb] || (clb > 10 ? 34 : 0)
}
