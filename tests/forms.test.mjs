import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeAttribution, captureAttribution, getLeadAttribution } from '../src/app/_lib/leadAttribution.js';
import { verifyTurnstileToken } from '../src/app/_lib/turnstile.js';
import config from '../next.config.mjs';

test('campaign attribution drops arbitrary data, query strings and external landing URLs', () => {
    assert.deepEqual(sanitizeAttribution({utm_source:'search\u0000',landingPage:'/services?email=private@example.com',email:'private@example.com'}), {utm_source:'search',landingPage:'/services'});
    assert.deepEqual(sanitizeAttribution({landingPage:'//other.example/path'}), {});
    assert.equal(sanitizeAttribution({utm_campaign:'x'.repeat(1000)}).utm_campaign.length, 120);
});

test('campaign source survives navigation, and unavailable session storage does not break forms', () => {
    const savedWindow = globalThis.window, savedStorage = globalThis.sessionStorage;
    const data = new Map();
    globalThis.sessionStorage = {getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
    globalThis.window = {location:{search:'?utm_source=search&utm_campaign=websites',pathname:'/services'}};
    try {
        captureAttribution();
        window.location={search:'',pathname:'/contact'};
        assert.deepEqual(getLeadAttribution(),{utm_source:'search',utm_campaign:'websites',landingPage:'/services'});
        globalThis.sessionStorage={getItem(){throw new Error('Blocked');}};
        assert.deepEqual(getLeadAttribution(),{});
    } finally {globalThis.window=savedWindow;globalThis.sessionStorage=savedStorage;}
});

test('production verification fails closed and checks the action and hostname', async () => {
    const oldEnv={...process.env}, oldFetch=globalThis.fetch;
    process.env.NODE_ENV='production';
    delete process.env.TURNSTILE_SECRET_KEY;
    try {
        assert.equal((await verifyTurnstileToken({token:'XXXX.DUMMY.TOKEN.XXXX'})).success,false);
        process.env.TURNSTILE_SECRET_KEY='test-only-secret';
        process.env.TURNSTILE_ALLOWED_HOSTNAMES='www.codestudioworks.com';
        const verify=()=>verifyTurnstileToken({token:'test-token',expectedAction:'contact'});
        globalThis.fetch=async()=>({ok:true,json:async()=>({success:true,action:'support',hostname:'www.codestudioworks.com'})});
        assert.deepEqual((await verify()).errorCodes,['action-mismatch']);
        globalThis.fetch=async()=>({ok:true,json:async()=>({success:true,action:'contact',hostname:'unexpected.example'})});
        assert.deepEqual((await verify()).errorCodes,['hostname-mismatch']);
        globalThis.fetch=async()=>({ok:true,json:async()=>({success:true,action:'contact',hostname:'www.codestudioworks.com'})});
        assert.equal((await verify()).success,true);
    } finally {process.env=oldEnv;globalThis.fetch=oldFetch;}
});

test('browser policy allows Turnstile scripts and frames without allowing arbitrary frames', async()=>{
    const headers=await config.headers();
    const csp=headers[0].headers.find(h=>h.key==='Content-Security-Policy').value;
    assert.match(csp,/script-src[^;]*https:\/\/challenges\.cloudflare\.com/);
    assert.match(csp,/frame-src https:\/\/challenges\.cloudflare\.com;/);
    assert.match(csp,/frame-ancestors 'none'/);
});
