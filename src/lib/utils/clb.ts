export function calculateCLB(score: number, maxScore: number): number {
  const percentage = (score / maxScore) * 100

  if (percentage >= 95) return 10
  if (percentage >= 90) return 9
  if (percentage >= 85) return 8
  if (percentage >= 75) return 7
  if (percentage >= 60) return 6
  if (percentage >= 45) return 5
  if (percentage >= 30) return 4
  return 3 // Below CLB 4
}
