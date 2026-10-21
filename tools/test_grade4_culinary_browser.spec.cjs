// Browser acceptance test: the real Grade 4 Culinary three-week learner journey.
// Runs only in GitHub Actions; the student-facing pages remain dependency-free.
const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const base = 'http://127.0.0.1:8765/courses/culinary-independence/elementary/grade-4/';
const weekUrl = n => base + 'week-' + String(n).padStart(2,'0') + '/';
function answersFor(week) {
  const source = fs.readFileSync(path.join(root,'courses/culinary-independence/elementary/grade-4/week-'+String(week).padStart(2,'0'),'index.html'),'utf8');
  const match = source.match(/\bbank=(\[.*?\])(?=,priorBank=|;let state=)/);
  if (!match) throw new Error('Missing question bank for week '+week);
  return new Map(JSON.parse(match[1]).map(([question,choices]) => [question, choices[0]]));
}
async function openLearner(page, code) {
  await page.locator('#learner').fill(code);
  await page.locator('#open').click();
}
async function passWeek(page, week, code) {
  await page.goto(weekUrl(week));
  await openLearner(page, code);
  await expect(page.locator('#work')).toBeVisible();
  for (let i=0;i<5;i++) {
    await page.locator('#done'+i).check();
    await page.locator('#note'+i).fill('Evidence for day '+(i+1)+': I calculated serving costs, compared fraction models, documented revisions, and explained a safe plan with my caregiver.');
  }
  const answers = answersFor(week);
  const items = page.locator('#quiz fieldset');
  await expect(items).toHaveCount(5);
  for (let i=0;i<5;i++) {
    const fieldset = items.nth(i);
    const prompt = (await fieldset.locator('legend').innerText()).replace(/^\d+\.\s*/, '');
    const correct = answers.get(prompt);
    if (!correct) throw new Error('Unknown question: '+prompt);
    await fieldset.getByRole('radio',{name:correct,exact:true}).check();
  }
  await page.locator('#check').click();
  await expect(page.locator('#result')).toContainText('100%');
  await page.locator('#adult').fill('Caregiver');
  await page.locator('#review').check();
  await expect(page.locator('#progress')).toContainText('Mastery earned!');
  await page.reload();
  await openLearner(page,code);
  await expect(page.locator('#done0')).toBeChecked();
  await expect(page.locator('#note0')).toHaveValue(/Evidence for day 1/);
  await expect(page.locator('#progress')).toContainText('Mastery earned!');
}
test('real browser: Week 1 → Week 2 → Week 3 mastery, persistence and learner isolation',async({page})=>{
  const code='culinary-test-a';
  await page.goto(weekUrl(2));
  await openLearner(page,code);
  await expect(page.locator('#work')).toBeHidden();
  await expect(page.locator('#message')).toContainText('locked');
  await passWeek(page,1,code);
  await page.goto(weekUrl(2));
  await openLearner(page,'culinary-test-b');
  await expect(page.locator('#work')).toBeHidden();
  await passWeek(page,2,code);
  await passWeek(page,3,code);
  await page.goto(weekUrl(1));
  await openLearner(page,'culinary-test-b');
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.locator('#done0')).not.toBeChecked();
  await expect(page.locator('#progress')).not.toContainText('Mastery earned!');
});
test('real browser: incomplete quiz never awards mastery',async({page})=>{
  await page.goto(weekUrl(1));
  await openLearner(page,'culinary-test-c');
  await page.locator('#check').click();
  await expect(page.locator('#result')).toContainText('Answer all five');
  await expect(page.locator('#progress')).not.toContainText('Mastery earned!');
});


test('real browser: portfolio restore previews, protects identity and resets quiz mastery',async({page})=>{
  const code='culinary-restore-a';
  await passWeek(page,1,code);
  const exported=await page.evaluate(code=>{
    const record=JSON.parse(localStorage.getItem('khae-culinary-grade4-week01-'+code));
    return JSON.stringify({course:'Grade 4 Culinary Arts Week 01',learnerCode:code,record});
  },code);
  await page.locator('#done0').uncheck();
  await expect(page.locator('#done0')).not.toBeChecked();
  await page.locator('#restore-file').setInputFiles({name:'portfolio.json',mimeType:'application/json',buffer:Buffer.from(exported)});
  await page.locator('#restore').click();
  await expect(page.locator('#restore-status')).toContainText('PREVIEW');
  await expect(page.locator('#done0')).not.toBeChecked();
  page.on('dialog',dialog=>dialog.accept());
  await page.locator('#restore').click();
  await expect(page.locator('#restore-status')).toContainText('Portfolio restored');
  await expect(page.locator('#done0')).toBeChecked();
  await expect(page.locator('#progress')).not.toContainText('Mastery earned!');
  const wrong=JSON.stringify({course:'Grade 4 Culinary Arts Week 01',learnerCode:'another-learner',record:JSON.parse(exported).record});
  await page.locator('#restore-file').setInputFiles({name:'wrong.json',mimeType:'application/json',buffer:Buffer.from(wrong)});
  await page.locator('#restore').click();
  await expect(page.locator('#restore-status')).toContainText('Wrong learner or course');
  await expect(page.locator('#done0')).toBeChecked();
});
test('real browser: printable academic evidence contains learner and week metadata',async({page})=>{
  await page.goto(weekUrl(1));
  await openLearner(page,'culinary-print-a');
  await page.locator('#note0').fill('Observed safe counting and explained the plan.');
  await page.emulateMedia({media:'print'});
  await expect(page.locator('#print-head')).toBeVisible();
  await expect(page.locator('#print-head')).toContainText('Khaemenes Academy');
  await expect(page.locator('#print-head')).toContainText('Grade 4');
  await expect(page.locator('#print-head')).toContainText('Week 01');
  await expect(page.locator('#print-learner')).toContainText('culinary-print-a');
  await expect(page.locator('#quiz')).toBeHidden();
  await expect(page.locator('#note0')).toHaveValue('Observed safe counting and explained the plan.');
});


test('Grade 4 exhibition requires five substantive written records',async({page})=>{
  const code='grade4-expo-evidence';
  await passWeek(page,1,code);
  await passWeek(page,2,code);
  await passWeek(page,3,code);
  await page.locator('#note0').fill('Done');
  await expect(page.locator('#progress')).not.toContainText('Mastery earned!');
  await expect(page.locator('#progress')).toContainText('4/5 written evidence records');
  await page.locator('#note0').fill('I compared fraction models, calculated costs per serving, and documented a safer revised menu plan.');
  await expect(page.locator('#progress')).toContainText('Mastery earned!');
});

test('Grade 4 exhibition includes printable caregiver assessment criteria',async({page})=>{
  await page.goto(weekUrl(3));
  await expect(page.locator('.rubric')).toContainText('Fractions and scaling accuracy');
  await expect(page.locator('.rubric')).toContainText('Budget and cost-per-serving reasoning');
  await expect(page.locator('.rubric')).toContainText('Safety and allergen decisions');
  await page.emulateMedia({media:'print'});
  await expect(page.locator('.rubric')).toBeVisible();
});
test('Grade 4 evidence stays separated between learner codes',async({page})=>{
  await page.goto(weekUrl(1));
  await openLearner(page,'grade4-learner-one');
  await page.locator('#note0').fill('Learner one recorded an original hazard assessment and a prevention strategy.');
  await page.locator('#done0').check();
  await page.reload();
  await openLearner(page,'grade4-learner-two');
  await expect(page.locator('#done0')).not.toBeChecked();
  await expect(page.locator('#note0')).toHaveValue('');
});

test('Grade 4 caregiver rubric persists, exports and isolates records',async({page})=>{
  const code='grade4-rubric-one';
  await passWeek(page,1,code);
  await passWeek(page,2,code);
  await page.goto(weekUrl(3));
  await openLearner(page,code);
  await page.locator('#rubric-score0').selectOption('3');
  await page.locator('#rubric-note0').fill('Caregiver observed an accurate allergen hazard assessment and a clear safety revision.');
  await page.locator('#rubric-summary').fill('Next step: verify the serving math and explain the cost per person.');
  await expect(page.locator('#rubric-status')).toContainText('1/5 criteria scored');
  await page.reload();
  await openLearner(page,code);
  await expect(page.locator('#rubric-score0')).toHaveValue('3');
  await expect(page.locator('#rubric-note0')).toHaveValue(/accurate allergen hazard assessment/);
  const saved=await page.evaluate(code=>JSON.parse(localStorage.getItem('khae-culinary-grade4-week03-'+code)),code);
  expect(saved.rubric.scores[0]).toBe('3');
  expect(saved.rubric.summary).toContain('cost per person');
  await page.goto(weekUrl(1));
  await openLearner(page,'grade4-rubric-two');
  await expect(page.locator('#note0')).toHaveValue('');
});
