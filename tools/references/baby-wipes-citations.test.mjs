import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createCite, PublicationFooter } from '../../app/articles/article-tools.tsx';
import { publications } from '../../app/site-data.ts';

const pageUrl = new URL('../../app/articles/contaminants-in-baby-wipes/page.tsx', import.meta.url);
const references = JSON.parse(fs.readFileSync(new URL('../../app/articles/contaminants-in-baby-wipes/references.json', import.meta.url), 'utf8'));
const source = ts.createSourceFile('page.tsx', fs.readFileSync(pageUrl, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const citations = [];
function visit(node) {
  if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === 'Cite') {
    const ids = node.attributes.properties.find(p => ts.isJsxAttribute(p) && p.name.getText(source) === 'ids');
    assert(ids?.initializer && ts.isJsxExpression(ids.initializer));
    const array = ids.initializer.expression;
    assert(array && ts.isArrayLiteralExpression(array));
    citations.push(array.elements.map(element => {
      assert(ts.isStringLiteral(element));
      return element.text;
    }));
  }
  ts.forEachChild(node, visit);
}
visit(source);

test('new citations are numbered consecutively in article reading order', () => {
  const firstUse = [...new Set(citations.flat())];
  assert.equal(firstUse.length, 51);
  assert.deepEqual(references.slice(0, firstUse.length).map(r => r.id), firstUse);
  assert.deepEqual(references.slice(firstUse.length).map(r => r.id), ['newton']);
  assert.equal(new Set(references.map(r => r.id)).size, references.length);
  const Cite = createCite(references);
  const encountered = new Set();
  for (const ids of citations) {
    const markup = renderToStaticMarkup(React.createElement(Cite, { ids }));
    const numbers = [...markup.matchAll(/href="#ref-(\d+)"/g)].map(m => Number(m[1]));
    assert.deepEqual(numbers, ids.map(id => references.findIndex(r => r.id === id) + 1).sort((a, b) => a - b));
    for (const number of numbers) {
      if (!encountered.has(number)) assert.equal(number, encountered.size + 1);
      encountered.add(number);
    }
  }
});

test('APA entries and visible reference labels follow citation order', () => {
  const record = publications.find(p => p.identifier === 'ICS-ER-2026-001');
  const output = renderToStaticMarkup(React.createElement(PublicationFooter, { record, references, referenceStyle: 'apa', referenceOrder: 'citation' }));
  const entries = [...output.matchAll(/<li[^>]*id="ref-(\d+)"[^>]*><span class="paper-reference-number">\[(\d+)\]<\/span>/g)];
  assert.equal(entries.length, 52);
  entries.forEach((entry, index) => {
    assert.equal(Number(entry[1]), index + 1);
    assert.equal(entry[1], entry[2]);
  });
  assert(output.includes('<i>Journal of Chromatography A, 1384</i>'));
});
