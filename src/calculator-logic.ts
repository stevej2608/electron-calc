// ============================================
// BUSINESS LOGIC MODULE
// ============================================
// This module contains all calculator business logic,
// completely separated from the GUI.
// It can be tested independently and reused in other contexts.

/**
 * Performs a calculation based on two operands and an operator
 * @param operand1 - First operand
 * @param operand2 - Second operand
 * @param operator - Operation to perform (+, -, ×, ÷)
 * @returns The calculation result
 * @throws {Error} If operator is invalid or division by zero
 */
export async function calculate(operand1: number, operand2: number, operator: string): Promise<number> {
  console.log(`[Business Logic] Received calculation request: ${operand1} ${operator} ${operand2}`);

  // Simulate potentially complex/time-consuming business logic
  // In a real app, this could be:
  // - Database queries
  // - Complex mathematical algorithms
  // - External API calls
  // - File system operations
  // - Heavy data processing
  await new Promise(resolve => setTimeout(resolve, 100));

  let result: number;

  switch (operator) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '×':
      result = operand1 * operand2;
      break;
    case '÷':
      if (operand2 === 0) {
        throw new Error("Division by zero");
      }
      result = operand1 / operand2;
      break;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }

  console.log(`[Business Logic] Calculation result: ${result}`);
  return result;
}
