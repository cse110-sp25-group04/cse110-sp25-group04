'use strict';

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTML_FILE_PATH = path.resolve(__dirname, '../index.html');
const HTML_CONTENT = fs.readFileSync(HTML_FILE_PATH, 'utf8');

let dom;
let window;
let gameCore; // will hold imported module

beforeAll(async () => {
    dom = new JSDOM(HTML_CONTENT, { runScripts: 'dangerously', resources: 'usable' });
    window = dom.window;

    // Wait for <script type="module" src="gameCore.js"> to load
    await new Promise(resolve => {
        window.document.addEventListener('DOMContentLoaded', resolve);
    });

    // Import the real module inside jsdom context
    // Construct the absolute path or URL for the module
    const gameCorePath = path.resolve(__dirname, '../gameCore.js');
    // For ES modules, import() typically needs a URL or an absolute path.
    // If gameCore.js is meant to be resolved relative to index.html by JSDOM,
    // this direct import might need adjustment based on how JSDOM handles module resolution.
    // However, providing an absolute path often works.
    gameCore = await import(`file://${gameCorePath}`);
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
