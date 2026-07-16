#!/usr/bin/env node

/**
 * Generate SQL seed data from RFI reading passages JSON
 * Creates INSERT statements for mock_tests and test_questions tables
 * 
 * Usage: node generate-rfi-seed.js
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function uuid() {
  return crypto.randomUUID();
}

function escapeSql(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "number") return String(val);
  if (typeof val === "boolean") return val ? "true" : "false";
  const safe = String(val).replace(/'/g, "''");
  return `'${safe}'`;
}

function toJsonb(val) {
  return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
}

function main() {
  const jsonPath = path.join(__dirname, "..", "seed", "rfi-reading-passages.json");
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const passages = data.passages;

  const testRows = [];
  const questionRows = [];

  for (const passage of passages) {
    const testId = uuid();
    const examType = passage.metadata?.examType?.[0]?.toLowerCase().includes("tef") ? "tef" : "tcf";
    const isPremium = true;

    testRows.push({
      id: testId,
      title: `RFI — ${passage.title.substring(0, 90)}`,
      description: passage.passage, // Store passage in description field
      exam_type: examType,
      module: "reading",
      difficulty: "advanced",
      duration_minutes: 45,
      is_premium: isPremium,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Add questions where the passage is prepended to question_text
    const passageHeader = `📖 Texte :\n\n${passage.passage}\n\n---\n\n`;
    
    for (const q of passage.questions) {
      const qId = uuid();
      questionRows.push({
        id: qId,
        test_id: testId,
        question_text: `${passageHeader}Question : ${q.question}`,
        audio_url: null,
        image_url: null,
        options: JSON.stringify(q.options),
        correct_answer: q.options[q.correctAnswer],
        explanation: q.explanation || "",
        points: 1,
        order_index: q.id - 1,
        created_at: new Date().toISOString(),
      });
    }
  }

  // Generate SQL
  let sql = `-- RFI Reading Comprehension Passages Seed Data\n`;
  sql += `-- Generated at ${new Date().toISOString()}\n`;
  sql += `-- Total: ${testRows.length} tests, ${questionRows.length} questions\n\n`;
  sql += `BEGIN;\n\n`;

  // Insert mock_tests
  const testCols = Object.keys(testRows[0]);
  sql += `INSERT INTO public.mock_tests (${testCols.join(", ")})\nVALUES\n`;
  const testVals = testRows.map((row) => {
    const vals = testCols.map((col) => {
      const v = row[col];
      if (col === "is_premium") return v ? "true" : "false";
      if (v === null) return "NULL";
      return escapeSql(v);
    });
    return `(${vals.join(", ")})`;
  });
  sql += testVals.join(",\n");
  sql += ";\n\n";

  // Insert test_questions
  const qCols = Object.keys(questionRows[0]);
  sql += `INSERT INTO public.test_questions (${qCols.join(", ")})\nVALUES\n`;
  const qVals = questionRows.map((row) => {
    const vals = qCols.map((col) => {
      const v = row[col];
      if (col === "options") return toJsonb(v);
      if (v === null) return "NULL";
      return escapeSql(v);
    });
    return `(${vals.join(", ")})`;
  });
  sql += qVals.join(",\n");
  sql += ";\n\n";

  sql += `COMMIT;\n\n`;
  sql += `-- ${testRows.length} reading passages inserted\n`;
  sql += `-- ${questionRows.length} comprehension questions inserted\n`;

  const outputPath = path.join(__dirname, "..", "seed", "rfi-reading-passages.sql");
  fs.writeFileSync(outputPath, sql, "utf-8");
  console.log(`✅ SQL seed written to: ${outputPath}`);
  console.log(`   ${testRows.length} tests, ${questionRows.length} questions`);
}

main();