#!/usr/bin/env python3
"""Pre-K through adult Culinary structural and interaction-contract audit.
Does not claim to execute browsers or verify remote websites."""
from pathlib import Path
from html.parser import HTMLParser
import re, sys
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'courses/culinary-independence'
class Tags(HTMLParser):
 def __init__(self):
  super().__init__();self.links=[];self.buttons=[];self.ids=set();self.images=[];self.scripts=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if d.get('id'):self.ids.add(d['id'])
  if tag=='a' and d.get('href'):self.links.append(d['href'])
  if tag=='script' and d.get('src'):self.scripts.append(d['src'])
  if tag=='img':self.images.append(d.get('alt'))
  if tag=='button':self.buttons.append(d)
def target(path,ref):
 ref=ref.split('#')[0].split('?')[0]
 if not ref or re.match(r'^(https?:|mailto:|tel:|data:|javascript:)',ref):return None
 q=(path.parent/ref).resolve()
 if not q.is_relative_to(ROOT):return ('outside',q)
 if q.is_dir():q=q/'index.html'
 return ('local',q)
errors=[];warnings=[];pages=list(BASE.rglob('index.html'))
for p in pages:
 s=p.read_text(encoding='utf-8');t=Tags();t.feed(s)
 for ref in t.links+t.scripts:
  result=target(p,ref)
  if result and result[0]=='local' and not result[1].exists():errors.append(f'{p.relative_to(ROOT)}: missing local target {ref}')
  if result and result[0]=='outside':warnings.append(f'{p.relative_to(ROOT)}: reference outside repo {ref}')
 if 'dietary-companion.js' not in t.scripts:errors.append(f'{p.relative_to(ROOT)}: dietary companion not linked')
 if not t.buttons and '/week-' in str(p):warnings.append(f'{p.relative_to(ROOT)}: no interactive buttons')
 for b in t.buttons:
  if not b.get('id') and not any(k.startswith('data-') for k in b) and not b.get('onclick'):
   warnings.append(f'{p.relative_to(ROOT)}: button lacks static interaction identifier')
 if '/week-' in str(p):
  if len(s)<5000:warnings.append(f'{p.relative_to(ROOT)}: unusually short weekly lesson')
  if not re.search(r'lesson|activity|guided|research',s,re.I):warnings.append(f'{p.relative_to(ROOT)}: instructional terms not found')
 if '<img' in s and any(a is None for a in t.images):errors.append(f'{p.relative_to(ROOT)}: image missing alt attribute')
print(f'Culinary audit: {len(pages)} HTML pages; {len(errors)} local-link/integration errors; {len(warnings)} advisory warnings')
for e in errors:print('ERROR',e)
for w in warnings[:50]:print('WARN',w)
if len(warnings)>50:print('Additional warnings:',len(warnings)-50)
sys.exit(1 if errors else 0)
