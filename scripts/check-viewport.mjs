import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.argv[2] ?? "http://127.0.0.1:3000";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connect(port) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const pages = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
      const page = pages.find((item) => item.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await delay(150);
  }
  throw new Error("Chrome DevTools bağlantısı kurulamadı.");
}

async function inspect(name, width, height, port) {
  const profile = mkdtempSync(join(tmpdir(), `terapi-odasi-${name}-`));
  const browser = spawn(chrome, [
    "--headless=new", "--no-first-run", "--disable-gpu",
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`, baseUrl,
  ], { stdio: "ignore" });

  try {
    const socketUrl = await connect(port);
    const socket = new WebSocket(socketUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });

    let id = 0;
    const pending = new Map();
    socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (!message.id || !pending.has(message.id)) return;
      pending.get(message.id)(message);
      pending.delete(message.id);
    });
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const messageId = ++id;
      pending.set(messageId, (message) => message.error ? reject(new Error(message.error.message)) : resolve(message.result));
      socket.send(JSON.stringify({ id: messageId, method, params }));
    });

    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await send("Page.reload", { ignoreCache: true });
    await delay(1200);
    await send("Runtime.evaluate", { expression: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Ofise başla'))?.click()` });
    await delay(800);
    const evaluated = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `JSON.stringify({
        viewport: { width: innerWidth, height: innerHeight },
        document: { width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.clientHeight, scrollHeight: document.documentElement.scrollHeight },
        body: { width: document.body.clientWidth, scrollWidth: document.body.scrollWidth, height: document.body.clientHeight, scrollHeight: document.body.scrollHeight },
        officeVisible: Boolean(document.querySelector('.office-game-screen')),
        hotspotCount: document.querySelectorAll('.office-hotspot').length,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })`,
    });
    const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
    const screenshotPath = join(tmpdir(), `terapi-odasi-${name}.png`);
    writeFileSync(screenshotPath, Buffer.from(screenshot.data, "base64"));

    for (let attempt = 0; attempt < 4; attempt += 1) {
      await send("Runtime.evaluate", { expression: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Seansı başlat') && !button.disabled)?.click()` });
      await delay(180);
      const sessionCheck = await send("Runtime.evaluate", { returnByValue: true, expression: `Boolean(document.querySelector('.vn-choice'))` });
      if (sessionCheck.result.value) break;
    }
    const session = await send("Runtime.evaluate", { returnByValue: true, expression: `Boolean(document.querySelector('.vn-choice'))` });
    await send("Runtime.evaluate", { expression: `document.querySelector('.vn-choice')?.click()` });
    await delay(180);
    const feedback = await send("Runtime.evaluate", { returnByValue: true, expression: `Boolean(document.querySelector('.feedback-dialog'))` });
    await send("Runtime.evaluate", { expression: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Seans sonucunu gör'))?.click()` });
    await delay(180);
    const final = await send("Runtime.evaluate", { returnByValue: true, expression: `Boolean(document.querySelector('.session-final-card'))` });
    await send("Runtime.evaluate", { expression: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Ofise dön'))?.click()` });
    await delay(350);
    const persisted = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => { const snapshot = JSON.parse(localStorage.getItem('terapi-odasi-office-state') || '{}'); const value = snapshot.state || snapshot; return { officeReturned: Boolean(document.querySelector('.office-game-screen')), money: value.money, energy: value.energy, totalSessions: value.totalSessions, storageVersion: snapshot.version, queueBeforeReload: (snapshot.dailyQueue || []).map((client) => client.caseId + ':' + client.status).join('|') }; })()`,
    });
    await send("Page.reload", { ignoreCache: true });
    await delay(900);
    await send("Runtime.evaluate", { expression: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Ofise başla'))?.click()` });
    await delay(350);
    const restoredQueue = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => { const office = document.querySelector('.office-game-screen'); return { queueAfterReload: office?.dataset.queueSignature || '', queueDayAfterReload: Number(office?.dataset.queueDay || 0) }; })()`,
    });
    socket.close();
    return { name, ...JSON.parse(evaluated.result.value), flow: { session: session.result.value, feedback: feedback.result.value, final: final.result.value, ...persisted.result.value, ...restoredQueue.result.value }, screenshotPath };
  } finally {
    browser.kill();
  }
}

const results = [];
results.push(await inspect("desktop", 1440, 900, 9331));
results.push(await inspect("mobile", 390, 844, 9332));
console.log(JSON.stringify(results, null, 2));

if (results.some((result) => result.horizontalOverflow || !result.officeVisible || result.hotspotCount !== 6 || !result.flow.session || !result.flow.feedback || !result.flow.final || !result.flow.officeReturned || result.flow.totalSessions !== 1 || result.flow.storageVersion !== 2 || result.flow.queueBeforeReload !== result.flow.queueAfterReload || result.flow.queueDayAfterReload !== 1)) {
  process.exitCode = 1;
}
