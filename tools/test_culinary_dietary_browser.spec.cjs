const {test,expect}=require('@playwright/test');
const base='http://127.0.0.1:8765/courses/culinary-independence/';
const paths=['','preschool/','preschool/week-01/','preschool/week-02/','preschool/week-03/','elementary/grade-1/week-01/','middle/grade-6/week-01/','high/grade-9/week-01/','higher/cula-101/week-01/'];
for(const route of paths){
 test('dietary selector, persistence, reset and lesson safety at '+(route||'home'),async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+route);
  await expect(page.locator('#culinary-dietary-companion')).toBeVisible();
  await page.locator('#culinary-dietary-companion summary').click();
  const vegan=page.locator('#culinary-diet-options input[value="vegan"]');
  const dairy=page.locator('#culinary-diet-options input[value="no-dairy"]');
  await vegan.check();await dairy.check();
  await expect(page.locator('#culinary-diet-summary')).toContainText('Vegan');
  await page.locator('#culinary-diet-ingredients').fill('Cheese, tomato, pasta');
  await page.locator('#culinary-diet-check').click();
  await expect(page.locator('#culinary-diet-results')).toContainText('cheese');
  await page.reload();
  await expect(page.locator('#culinary-diet-summary')).toContainText('Vegan');
  await page.locator('#culinary-dietary-companion summary').click();
  await expect(page.locator('#culinary-diet-options input[value="no-dairy"]')).toBeChecked();
  await page.locator('#culinary-diet-clear').click();
  await expect(page.locator('#culinary-diet-summary')).toContainText('No dietary exclusions');
  await expect(page.locator('#culinary-diet-options input[value="vegan"]')).not.toBeChecked();
  expect(errors).toEqual([]);
 });
}
test('dietary preference travels between classes without affecting lesson state',async({page})=>{
 await page.goto(base+'preschool/');
 await page.locator('#culinary-dietary-companion summary').click();
 await page.locator('#culinary-diet-options input[value="no-pork"]').check();
 await page.goto(base+'higher/cula-101/week-01/');
 await expect(page.locator('#culinary-diet-summary')).toContainText('No pork');
 await expect(page.locator('#learner')).toBeVisible();
});
