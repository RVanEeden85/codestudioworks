import test from 'node:test';
import assert from 'node:assert/strict';
import { validMeasurementId, analyticsConsentGranted, trackLead, ANALYTICS_CONSENT_KEY } from '../src/app/_lib/analytics.js';

test('analytics requires an explicitly granted consent and a valid measurement ID', () => {
    assert.equal(validMeasurementId('G-ABC123'), 'G-ABC123');
    for (const id of ['', 'UA-123', 'G-<script>', undefined]) assert.equal(validMeasurementId(id), '');
    for (const value of [null, 'denied', 'unknown']) assert.equal(analyticsConsentGranted({ getItem: () => value }), false);
    assert.equal(analyticsConsentGranted({ getItem: key => key === ANALYTICS_CONSENT_KEY ? 'granted' : null }), true);
    assert.equal(analyticsConsentGranted({ getItem() { throw Error('blocked'); } }), false);
});

test('successful lead measurement never includes personal information and respects withdrawal', () => {
    const original = globalThis.window;
    const calls = [];
    let consent = 'denied';
    globalThis.window = { __cswAnalyticsReady: true, localStorage: { getItem: () => consent }, gtag: (...args) => calls.push(args) };
    try {
        trackLead('contact'); assert.equal(calls.length, 0);
        consent = 'granted'; trackLead('contact');
        assert.deepEqual(calls, [['event', 'generate_lead', { form_type: 'contact' }]]);
        trackLead('private@example.com'); assert.equal(calls.length, 1);
        consent = 'denied'; trackLead('consultation'); assert.equal(calls.length, 1);
    } finally { globalThis.window = original; }
});
