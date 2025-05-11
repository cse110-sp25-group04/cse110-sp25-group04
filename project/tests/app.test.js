'use strict';

const fs   = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlFile = path.resolve(__dirname, '../index.html');
const html     = fs.readFileSync(htmlFile, 'utf8');

let dom;
let window;
let gameCore;          // will hold imported module

beforeAll(async () => {
  dom    = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  window = dom.window;

  // wait for <script type="module" src="gameCore.js"> to load
  await new Promise(res => {
    window.document.addEventListener('DOMContentLoaded', res);
  });

  // import the real module inside jsdom context
  gameCore = await import(path.resolve(__dirname, '../gameCore.js'));
});

afterAll(() => {
  window.close();
});

describe('Basic board integrity', () => {
  test('grid exists and has 25 cells', () => {
    const cells = gameCore.getGridCells();
    expect(cells.length).toBe(25);
  });

  test('can highlight a valid cell', () => {
    expect(gameCore.highlightCell(12)).toBe(true);
    const mid = window.document.querySelector('[data-idx="12"]');
    expect(mid.style.outline).toContain('limegreen');
  });

  test('highlightCell returns false for invalid index', () => {
    expect(gameCore.highlightCell(99)).toBe(false);
  });
});
