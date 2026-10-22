import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createCite, PublicationFooter } from '../../app/articles/article-tools.tsx';
import { publications } from '../../app/site-data.ts';

const articles = new URL('../../app/articles/', import.meta.url);
// Discover pages, not bibliography files: a new page cannot evade the gate by
// omitting its references.json. No fixed article count to update or bypass.
const slugs = fs.readdirSync(articles).filter(slug => fs.existsSync(new URL(`${slug}/page.tsx`, articles)));
assert.deepEqual([...slugs].sort(), publications.map(p => p.slug).sort(), 'Every article must be registered and checked');
for (const slug of slugs) {
  test(`${slug}: sequential citations, complete APA entries, and matching reference labels`, () => {
    const references = JSON.parse(fs.readFileSync(new URL(`${slug}/references.json`, articles), 'utf8'));
    const source = ts.createSourceFile('page.tsx', fs.readFileSync(new URL(`${slug}/page.tsx`, articles), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const calls = [];
    let formatted = false;
    const sharedComponents = new Set();
    const classes = new Set();
    function visit(node) {
      if (ts.isImportDeclaration(node) && node.moduleSpecifier.text === '../article-tools') {
        for (const element of node.importClause?.namedBindings?.elements ?? []) sharedComponents.add(element.name.text);
      }
      if (ts.isJsxAttribute(node) && node.name.getText(source) === 'className' && node.initializer && ts.isStringLiteral(node.initializer)) {
        for (const name of node.initializer.text.split(/\s+/)) classes.add(name);
      }
      if (ts.isJsxAttribute(node) && node.name.getText(source) === 'href' && node.initializer && ts.isStringLiteral(node.initializer)) {
        assert(!node.initializer.text.startsWith('#ref-'), 'Use createCite for reference links; never hard-code citation numbers');
      }
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === 'Cite') {
        const ids = node.attributes.properties.find(p => ts.isJsxAttribute(p) && p.name.getText(source) === 'ids');
        assert(ids?.initializer && ts.isJsxExpression(ids.initializer));
        const array = ids.initializer.expression;
        assert(array && ts.isArrayLiteralExpression(array));
        calls.push(array.elements.map(element => {
          assert(ts.isStringLiteral(element));
          return element.text;
        }));
      }
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === 'PublicationFooter') {
        const attr = name => node.attributes.properties.find(p => ts.isJsxAttribute(p) && p.name.getText(source) === name)?.initializer;
        assert.equal(attr('referenceStyle'), undefined, 'Use the shared reference default');
        assert.equal(attr('referenceOrder'), undefined, 'Use the shared citation-order default');
        formatted = true;
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
    assert(formatted);
    for (const component of ['ArticleSection', 'PublicationHeader', 'PublicationFooter', 'createCite']) assert(sharedComponents.has(component), `Use shared ${component}`);
    for (const name of ['paper-body', 'paper-abstract']) assert(classes.has(name), `Use shared ${name} typography`);
    const firstUse = [...new Set(calls.flat())];
    assert.deepEqual(references.slice(0, firstUse.length).map(r => r.id), firstUse);
    assert.deepEqual(references.slice(firstUse.length).map(r => r.id), slug === 'contaminants-in-baby-wipes' ? ['newton'] : []);
    assert.equal(new Set(references.map(r => r.id)).size, references.length);
    const Cite = createCite(references);
    const seen = new Set();
    for (const ids of calls) {
      const markup = renderToStaticMarkup(React.createElement(Cite, { ids }));
      const numbers = [...markup.matchAll(/href="#ref-(\d+)"/g)].map(m => Number(m[1]));
      assert.deepEqual(numbers, ids.map(id => references.findIndex(r => r.id === id) + 1).sort((a, b) => a - b));
      for (const n of numbers) {
        if (!seen.has(n)) assert.equal(n, seen.size + 1);
        seen.add(n);
      }
    }
    for (const reference of references) {
      assert(reference.apa?.title && reference.apa?.date);
      assert(!/\bet al\./.test(reference.apa.authors), 'Use full APA author lists');
      assert(reference.href.startsWith('https://'));
    }
    const record = publications.find(p => p.slug === slug);
    assert(record, `Registered publication ${slug}`);
    const markup = renderToStaticMarkup(React.createElement(PublicationFooter, { record, references }));
    const entries = [...markup.matchAll(/<li[^>]*id="ref-(\d+)"[^>]*><span class="paper-reference-number">\[(\d+)\]<\/span>/g)];
    assert.equal(entries.length, references.length);
    assert(markup.includes('paper-references--apa'), 'Default renderer uses the approved light APA reference layout');
    entries.forEach((entry, index) => {
      assert.equal(Number(entry[1]), index + 1);
      assert.equal(entry[1], entry[2]);
    });
  });
}

test('shared defaults reject missing APA fields and invalid citation identities', () => {
  const record = publications[0];
  const reference = JSON.parse(fs.readFileSync(new URL(`${record.slug}/references.json`, articles), 'utf8'))[0];
  assert.throws(() => renderToStaticMarkup(React.createElement(PublicationFooter, {
    record, references: [{ ...reference, apa: undefined }],
  })), /Missing APA bibliographic fields/);
  assert.throws(() => createCite([{ ...reference, id: '' }]), /stable id/);
  assert.throws(() => createCite([reference, reference]), /Duplicate reference id/);
  const Cite = createCite([reference]);
  assert.throws(() => renderToStaticMarkup(React.createElement(Cite, { ids: ['missing-source'] })), /Unknown reference id/);
});
